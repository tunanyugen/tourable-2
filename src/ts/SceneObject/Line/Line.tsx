import { MeshBuilder } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface LineSchema extends SceneObjectSchema {

}

export default class Line extends SceneObject {
    type: "line" = "line";
    public id: number;
    constructor(tourable:Tourable, sceneID:number, schema:LineSchema){
        super(tourable, sceneID, schema)
    }
    createMesh = (tourable:Tourable, sceneID:number) => {
        
    }
    export = (): LineSchema => {
        return {
            id: this.id,
            type: this.type,
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            },
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
        }
    };
}