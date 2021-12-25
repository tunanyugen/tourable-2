import { Color3, MeshBuilder, StandardMaterial, Texture, ActionManager, ExecuteCodeAction } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface FloorHotspotSchema extends SceneObjectSchema {

}

export default class FloorHotspot extends SceneObject implements FloorHotspotSchema {
    sceneID:number = -1;
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
        }))
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (e) => {
            document.body.style.cursor = null
        }))
        // switch scene on click
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, (e) => {
            if (this.sceneID < 0){ return }
            tourable.sceneManager.switchScene(this.sceneID);
        }))
        // show floor hotspot contextmenu
        this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnRightPickTrigger, (e) => {
        //    tourable.gui.current.floor 
        }))
    }
    createMesh = (tourable:Tourable, sceneID:number) => {
        let scene = tourable.sceneManager.scenes.get(sceneID);
        // create plane using mesh builder
        this.mesh = MeshBuilder.CreatePlane(this.id.toString(), {
            size: tourable.config.floorHotspotSize,
            updatable: true,
        }, scene);
        this.mesh.position.y = -1;
        this.mesh.rotation.x = Math.PI / 2;
        // creating material
        let material = new StandardMaterial(this.id.toString(), scene);
        material.backFaceCulling = false;
        material.emissiveColor = new Color3(1, 1, 1);
        material.diffuseTexture = new Texture(tourable.config.assets.floorHotspot, scene);
        material.useAlphaFromDiffuseTexture = true;
        // applying material
        this.mesh.material = material;
        this.mesh.renderingGroupId = 1;
    }
}