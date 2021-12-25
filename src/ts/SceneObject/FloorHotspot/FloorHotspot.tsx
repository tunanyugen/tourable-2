import { MeshBuilder } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface FloorHotspotSchema extends SceneObjectSchema {

}

export default class FloorHotspot extends SceneObject implements FloorHotspotSchema {

    constructor(tourable:Tourable, sceneID:number){
        super(tourable, sceneID, tourable.sceneManager.scenes.get(sceneID).sceneObjects)
        tourable.sceneManager.scenes.get(sceneID).sceneObjects.set(this.id, this);
        this.createMesh(tourable, sceneID);
    }
    createMesh = (tourable:Tourable, sceneID:number) => {
        let scene = tourable.sceneManager.scenes.get(sceneID);

        this.mesh = MeshBuilder.CreatePlane(this.id.toString(), {
            size: 1,
            updatable: true,
        }, scene)
    }
}