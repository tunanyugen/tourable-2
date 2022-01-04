import { Color3, Material, MeshBuilder, StandardMaterial, Texture } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface PivotSchema extends SceneObjectSchema {
    texture:string;
}

export default class Pivot extends SceneObject implements PivotSchema {
    type: "pivot" = "pivot";
    protected _texture:string = "";
    get texture(){ return this._texture }
    set texture(val:string){
        this._texture = val;
         // creating material
         let newMaterial = new StandardMaterial(this.id.toString(), this.mesh.getScene());
         newMaterial.backFaceCulling = false;
         newMaterial.emissiveColor = new Color3(1, 1, 1);
         newMaterial.diffuseTexture = new Texture(this.texture, this.mesh.getScene());
         newMaterial.diffuseTexture.hasAlpha = true;
         newMaterial.useAlphaFromDiffuseTexture = true;
         newMaterial.alpha = 0.7;
         // dispose old material
         if (this.mesh.material){ this.mesh.material.dispose() }
         // set new material
         this.mesh.material = newMaterial;
    }

    constructor(tourable:Tourable, sceneID:number, schema:PivotSchema = null){
        super(tourable, sceneID, schema)
        // load schema
        if (schema){
            this.texture = schema.texture;
        }
        this.createMesh(tourable, sceneID);
        this.hookEvents(tourable);
        // look at camera
        this.moveObservable.Add(this._observableManager, () => {
            this.mesh.lookAt(this.mesh.getScene().activeCamera.position);
        }, false)
    }

    createMesh = (tourable:Tourable, sceneID:number) => {
        let scene = tourable.sceneManager.scenes.get(sceneID);
        // create plane using mesh builder
        this.mesh = MeshBuilder.CreatePlane(this.id.toString(), {
            size: tourable.config.pivotSize,
            updatable: true,
        }, scene);
        // set texture
        this.texture = tourable.config.assets.pivot[0];
        // set rendering group
        this.mesh.renderingGroupId = 1;
    }
    hookEvents = (tourable:Tourable) => {
        this.pointerEnterObservable.Add(this._observableManager, () => {
            // change cursor icon
            document.body.style.cursor = "pointer"
        }, false)
        this.pointerLeaveObservable.Add(this._observableManager, () => {
            // set cursor icon to default
            document.body.style.cursor = null;
        }, false)
        // on right click
        this.onRightClickObservable.Add(this._observableManager, () => {
            if (tourable.sceneObjectManager.hoverSceneObject == this){
                tourable.gui.current.pivotConfig.current.setTarget(this)
            }
        }, false)
        // on mouse move
        this.pointerMoveObservable.Add(this._observableManager, (e) => {
            if (this.grabbing){
                this.grab(tourable, e.clientX, e.clientY, true, false, true)
            }
        }, false)
    }
    export = (): PivotSchema => {
        return {
            id: this.id,
            sceneID: this.sceneID,
            type: this.type,
            texture: this.texture,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        }
    }
}