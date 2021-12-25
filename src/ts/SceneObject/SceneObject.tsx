import { Mesh } from "babylonjs";
import { Vector2 } from "babylonjs";
import Tourable from "../Tourable/Tourable";
import Mathematics from "../Utilities/Mathematics/Mathematics";

export interface SceneObjectSchema {
    id:number;
}

export default class SceneObject implements SceneObjectSchema{
    public id: number;
    public mesh:Mesh;

    constructor(tourable:Tourable, sceneID:number, map:Map<number, SceneObject>){
        let scene = tourable.sceneManager.scenes.get(sceneID);
        // get id
        this.id = scene.uidGenerator.uid;
        // register to map
        scene.sceneObjects.set(this.id, this);
    }
    grab = (tourable:Tourable, pointerX:number, pointerY:number, xAxis:boolean, yAxis:boolean, zAxis:boolean) => {
        this.mesh.position = Mathematics.TransformPoint(tourable, this.mesh.position, new Vector2(pointerX, pointerY), xAxis, yAxis, zAxis);
    }
}