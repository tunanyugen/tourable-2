import { Mesh } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";


export interface PolySchema extends SceneObjectSchema {
    pivotIDs:number[];
}

export default class Poly extends SceneObject implements PolySchema{
    type: "poly" = "poly";
    public id: number;
    pivotIDs: number[] = [];
    constructor(tourable:Tourable, sceneID:number, schema:PolySchema){
        super(tourable, sceneID, schema)

    }
    createMesh = (tourable:Tourable, sceneID:number) => {
        this.mesh = new Mesh(this.id.toString(), tourable.sceneManager.scenes.get(sceneID));
    }
    export = ():PolySchema => {
        return {
            id: this.id,
            type: this.type,
            pivotIDs: this.pivotIDs,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        }
    }
}