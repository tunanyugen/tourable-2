import { Color3, MeshBuilder, StandardMaterial, Texture } from "babylonjs";
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
        this.mesh.refreshBoundingInfo();
    }
}