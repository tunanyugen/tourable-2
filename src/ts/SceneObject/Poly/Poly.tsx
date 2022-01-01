import SceneObject, { SceneObjectSchema } from "../SceneObject";


export interface PolySchema extends SceneObjectSchema {

}

export default class Poly extends SceneObject {
    type: "poly" = "poly";
    public id: number;
    export = ():PolySchema => {
        return {
            id: this.id,
            type: this.type,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        }
    }
}