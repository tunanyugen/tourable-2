import Observable from "@tunanyugen/observable";
import { Mesh, Vector3 } from "babylonjs";
import { Vector2 } from "babylonjs";
import Scene from "../Scene/Scene";
import Tourable from "../Tourable/Tourable";
import Mathematics from "../Utilities/Mathematics/Mathematics";

export interface SceneObjectSchema {
    type:string;
    id:number;
    originalScaling: {x:number, y:number, z:number},
    mesh: {
        position: {x:number, y:number, z:number},
        rotation: {x:number, y:number, z:number},
        scaling: {x:number, y:number, z:number},
    } | Mesh;
}

export default abstract class SceneObject implements SceneObjectSchema{
    abstract type:"floorHotspot"|"floatingHotspot"|"infoHotspot"|"poly"|"pivot";
    public originalScaling: Vector3 = new Vector3(1, 1, 1);
    public id: number;
    public mesh:Mesh;
    public grabbing:boolean = false;

    constructor(tourable:Tourable, sceneID:number, schema:SceneObjectSchema){
        let scene = tourable.sceneManager.scenes.get(sceneID);
        if (schema){
            // load schema
            scene.uidGenerator.uid = schema.id;
            this.originalScaling = new Vector3(schema.originalScaling.x, schema.originalScaling.y, schema.originalScaling.z);
        } else {
            // get id
            this.id = scene.uidGenerator.uid;
        }
        // register to map
        scene.sceneObjects.set(this.id, this);
        // init events
        this.defaultEvents(tourable);
    }
    grab = (tourable:Tourable, pointerX:number, pointerY:number, xAxis:boolean, yAxis:boolean, zAxis:boolean) => {
        this.mesh.position = Mathematics.TransformPoint(tourable, this.mesh.position, new Vector2(pointerX, pointerY), xAxis, yAxis, zAxis);
    }
    sphericalGrab = (tourable:Tourable, pointerX:number, pointerY:number, lookAtCamera:boolean = false) => {
        this.mesh.position = Mathematics.ScreenToWorldPoint(tourable, new Vector2(pointerX, pointerY), 1);
        if (lookAtCamera){
            this.mesh.lookAt(tourable.sceneManager.sceneToRender.activeCamera.getDirection(Vector3.Forward()).negate());
        }
    }
    dispose = () => {
        (this.mesh.getScene() as Scene).sceneObjects.delete(this.id);
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
    gDownObservable:Observable;
    gUpObservable:Observable;
    onClickObservable:Observable<PointerEvent>;
    onRightClickObservable:Observable<PointerEvent>;
    pointerEnterObservable:Observable<PointerEvent>;
    pointerLeaveObservable:Observable<PointerEvent>;
    private defaultEvents = (tourable:Tourable) => {
        let eventDiscardCondition = () => { return tourable.sceneManager.sceneToRender != this.mesh.getScene() }
        this.gDownObservable = new Observable(null, false, eventDiscardCondition);
        this.gUpObservable = new Observable(null, false, eventDiscardCondition);
        this.onClickObservable = new Observable(null, false, eventDiscardCondition);
        this.onRightClickObservable = new Observable(null, false, eventDiscardCondition);
        this.pointerEnterObservable = new Observable(null, false, () => { return !(tourable.sceneObjectManager.lastHoverSceneObject != this && tourable.sceneObjectManager.hoverSceneObject == this) })
        this.pointerLeaveObservable = new Observable(null, false, () => { return !(tourable.sceneObjectManager.lastHoverSceneObject == this && tourable.sceneObjectManager.hoverSceneObject != this) })
        // g key down
        this.gDownObservable.Add(() => {
            // set grabbing state
            if (tourable.sceneObjectManager.hoverSceneObject == this){ this.grabbing = true }
        }, false);
        tourable.eventManager.g.onKeyDownObservable.AddObservable(this.gDownObservable);
        // g key up
        this.gUpObservable.Add(() => {
            // unset grabbing state
            if (this.grabbing){ this.grabbing = false }
        }, false)
        tourable.eventManager.g.onKeyUpObservable.AddObservable(this.gUpObservable);
        // on click
        tourable.eventManager.mouse0.onButtonDownObservable.AddObservable(this.onClickObservable);
        // right click
        tourable.eventManager.mouse2.onButtonDownObservable.AddObservable(this.onRightClickObservable);
        // pointer move observable
        tourable.eventManager.onMouseMoveObservable.AddObservable(this.pointerEnterObservable);
        tourable.eventManager.onMouseMoveObservable.AddObservable(this.pointerLeaveObservable);
        tourable.eventManager.onMouseMoveObservable.Add((e) => {
            // grab object
            if (this.grabbing){ this.grab(tourable, e.clientX, e.clientY, true, false, true) }
        }, false, eventDiscardCondition);
    }
    abstract export: () => SceneObjectSchema;
}