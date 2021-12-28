import { Color3, MeshBuilder, StandardMaterial, Texture, ActionManager, ExecuteCodeAction, Scalar, Vector3, SceneSerializer } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import Mathematics from "../../Utilities/Mathematics/Mathematics";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface FloorHotspotSchema extends SceneObjectSchema {
    texture:string;
    targetSceneID:number;
    title:string;
    backFloorHotspotID:number;
}

export default class FloorHotspot extends SceneObject implements FloorHotspotSchema {
    type: string = "floorHotspot";
    private _targetSceneID:number = -1;
    get targetSceneID(){ return this._targetSceneID }
    setTargetSceneID = (tourable:Tourable, value:number) => {
        let lastScene = tourable.sceneManager.scenes.get(this.targetSceneID);
        let currentScene = tourable.sceneManager.scenes.get(value);
        this._targetSceneID = value;
        if ((lastScene && this.title == lastScene.panorama.name) || this.title.length <= 0){
            this.title = currentScene.panorama.name;
        }
    }
    backFloorHotspotID: number = -1;
    title: string = "";
    private _texture:string = "";
    get texture(){ return this._texture }
    set texture(val:string){
        this._texture = val;
         // creating material
         let newMaterial = new StandardMaterial(this.id.toString(), this.mesh.getScene());
         newMaterial.backFaceCulling = false;
         newMaterial.emissiveColor = new Color3(1, 1, 1);
         newMaterial.diffuseTexture = new Texture(this._texture, this.mesh.getScene());
         newMaterial.diffuseTexture.hasAlpha = true;
         newMaterial.useAlphaFromDiffuseTexture = true;
         // dispose old material
         if (this.mesh.material){ this.mesh.material.dispose() }
         // set new material
         this.mesh.material = newMaterial;
    }

    constructor(
        tourable:Tourable,
        sceneID:number,
        schema:FloorHotspotSchema = null,
    ){
        super(tourable, sceneID, schema)
        let scene = tourable.sceneManager.scenes.get(sceneID);
        // set default values
        if (schema){
            this._texture = schema.texture;
            this._targetSceneID = schema.targetSceneID;
            this.title = schema.title;
            this.backFloorHotspotID = schema.backFloorHotspotID;
        }
        // constructor
        tourable.sceneManager.scenes.get(sceneID).sceneObjects.set(this.id, this);
        this.createMesh(tourable, sceneID);
        // set default values
        if (schema){
            this.mesh.position = new Vector3(schema.mesh.position.x, schema.mesh.position.y, schema.mesh.position.z)
            this.mesh.rotation = new Vector3(schema.mesh.rotation.x, schema.mesh.rotation.y, schema.mesh.rotation.z)
            this.mesh.scaling = new Vector3(schema.mesh.scaling.x, schema.mesh.scaling.y, schema.mesh.scaling.z)
        }
        // action manager
        this.mesh.actionManager = new ActionManager(scene);
        // change cursor icon and show title
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (e) => {
            document.body.style.cursor = "pointer"
            this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
            let titlePos = Mathematics.WorldToScreenPoint(tourable, this.mesh.position.add(new Vector3(0, tourable.config.floorHotspotSize, 0)));
            tourable.gui.current.text.current.display(titlePos.x, titlePos.y, this.title);
        }))
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (e) => {
            document.body.style.cursor = null
            this.scale(this.mesh.scaling, new Vector3(1, 1, 1), 150);
            tourable.gui.current.text.current.hide();
        }))
        // switch scene on click
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, (e) => {
            if (this._targetSceneID < 0){ return }
            tourable.sceneManager.switchScene(tourable, this._targetSceneID, this.id);
        }))
        // show floor hotspot config
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnRightPickTrigger, (e) => {
            tourable.gui.current.floorHotspotConfig.current.setTarget(this);
        }))
    }
    createMesh = (tourable:Tourable, sceneID:number) => {
        let scene = tourable.sceneManager.scenes.get(sceneID);
        // create plane using mesh builder
        this.mesh = MeshBuilder.CreatePlane(this.id.toString(), {
            size: tourable.config.floorHotspotSize,
            updatable: true,
        }, scene);
        this.mesh.renderingGroupId = 1;
        this.mesh.position.y = -1;
        this.mesh.rotation.x = Math.PI / 2;
        // set texture
        this.texture = tourable.config.assets.floorHotspot[0];
    }
    createBackHotspot = (tourable:Tourable) => {
        // dispose old back hotspot
        let backFloorHotspotScene = tourable.sceneManager.scenes.get(this._targetSceneID);
        if (backFloorHotspotScene){
            let hotspot = backFloorHotspotScene.sceneObjects.get(this.backFloorHotspotID);
            if (hotspot){ hotspot.dispose() }
        }
        // create new one
        let backHotspot = new FloorHotspot(tourable, this._targetSceneID);
        this.backFloorHotspotID = backHotspot.id;
        backHotspot.texture = this.texture;
        backHotspot._targetSceneID = tourable.sceneManager.sceneToRender.id;
        backHotspot.title = tourable.sceneManager.sceneToRender.panorama.name;
        let position = this.mesh.position.clone().negate();
        position.y = this.mesh.position.y;
        backHotspot.mesh.position = position;
        backHotspot.mesh.rotation.y = this.mesh.rotation.clone().y + Math.PI;
    }
    export = () => {
        return {
            type: this.type,
            id: this.id,
            backFloorHotspotID: this.backFloorHotspotID,
            targetSceneID: this.targetSceneID,
            texture: this.texture,
            title: this.title,
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        } as FloorHotspotSchema
    }
}