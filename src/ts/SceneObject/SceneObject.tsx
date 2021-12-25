import { Mesh } from "babylonjs";
import Tourable from "../Tourable/Tourable";

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
}