import { Mesh, Vector3 } from "babylonjs";
import { Vector2 } from "babylonjs";
import { Scalar } from "babylonjs/Legacy/legacy";
import Tourable from "../Tourable/Tourable";
import Mathematics from "../Utilities/Mathematics/Mathematics";

export interface SceneObjectSchema {
    id:number;
}

export default class SceneObject implements SceneObjectSchema{
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
        if (this._scaleInterval){ clearInterval(this._scaleInterval) }
        let totalIterations = Math.round(duration / 16);
        let iteration = 0;
        this._scaleInterval = setInterval(() => {
            if (iteration >= totalIterations){ clearInterval(this._scaleInterval) }
            this.mesh.scaling = Vector3.Lerp(start, end, iteration / totalIterations);
            iteration++;
        }, 16)
    }
}