import { Color3, MeshBuilder, StandardMaterial, Texture, ActionManager, ExecuteCodeAction, Scalar, Vector3 } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface FloorHotspotSchema extends SceneObjectSchema {
    texture:string;
}

export default class FloorHotspot extends SceneObject implements FloorHotspotSchema {
    sceneID:number = -1;
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

    constructor(tourable:Tourable, sceneID:number){
        super(tourable, sceneID)
        let scene = tourable.sceneManager.scenes.get(sceneID);
        tourable.sceneManager.scenes.get(sceneID).sceneObjects.set(this.id, this);
        this.createMesh(tourable, sceneID);
        // action manager
        this.mesh.actionManager = new ActionManager(scene);
        // change cursor icon
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (e) => {
            document.body.style.cursor = "pointer"
            this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
        }))
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (e) => {
            document.body.style.cursor = null
            this.scale(this.mesh.scaling, new Vector3(1, 1, 1), 150);
        }))
        // switch scene on click
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, (e) => {
            if (this.sceneID < 0){ return }
            tourable.sceneManager.switchScene(this.sceneID);
        }))
        // show floor hotspot contextmenu
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
        console.log(this.mesh);
    }
}