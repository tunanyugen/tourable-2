import { Mesh, SceneSerializer, Vector3 } from "babylonjs";
import { Vector2 } from "babylonjs";
import Tourable from "../Tourable/Tourable";
import Mathematics from "../Utilities/Mathematics/Mathematics";

export interface SceneObjectSchema {
    type:string;
    id:number;
    mesh: {
        position: {x:number, y:number, z:number},
        rotation: {x:number, y:number, z:number},
        scaling: {x:number, y:number, z:number},
    } | Mesh;
}

export default abstract class SceneObject implements SceneObjectSchema{
    abstract type:string;
    public id: number;
    public mesh:Mesh;

    constructor(tourable:Tourable, sceneID:number){
        let scene = tourable.sceneManager.scenes.get(sceneID);
        // get id
        this.id = scene.uidGenerator.uid;
        // register to map
        scene.sceneObjects.set(this.id, this);
    }
    grab = (tourable:Tourable, pointerX:number, pointerY:number, xAxis:boolean, yAxis:boolean, zAxis:boolean) => {
        this.mesh.position = Mathematics.TransformPoint(tourable, this.mesh.position, new Vector2(pointerX, pointerY), xAxis, yAxis, zAxis);
    }
    dispose = (tourable:Tourable) => {
        tourable.sceneManager.sceneToRender.sceneObjects.delete(this.id);
        this.mesh.dispose();
    }
    private _scaleInterval:NodeJS.Timeout;
    scale = (start:Vector3, end:Vector3, duration:number) => {
        return new Promise((resolve) => {
            if (this._scaleInterval){ clearInterval(this._scaleInterval) }
            let totalIterations = Math.round(duration / 16);
            let iteration = 0;
            this._scaleInterval = setInterval(() => {
                if (iteration >= totalIterations){
                    clearInterval(this._scaleInterval);
                    resolve(null);
                }
                this.mesh.scaling = Vector3.Lerp(start, end, iteration / totalIterations);
                iteration++;
            }, 16)
            return this._scaleInterval;
        })
    }
    abstract export: () => SceneObjectSchema;
}