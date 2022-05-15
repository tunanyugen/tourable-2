import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import SceneObject from "../../SceneObject/SceneObject";
import Tourable from "../../Tourable/Tourable";
import SceneObjectManagerPickResult from "./SceneObjectManagerPickResult";

export default class SceneObjectManager{
    protected _observableManager:ObservableManager = new ObservableManager();
    //#region target
    private _target:SceneObject;
    public get target(){
        return this._target;
    }
    public set target(value: SceneObject){
        this._target = value;
    }
    //#endregion
    //#region lastHoverSceneObject
    private _lastHoverSceneObject:SceneObject;
    public get lastHoverSceneObject(){ return this._lastHoverSceneObject }
    //#endregion
    //#region hoverSceneObject
    private _hoverSceneObject:SceneObject;
    get hoverSceneObject(){ return this._hoverSceneObject }
    //#endregion
    constructor(tourable:Tourable){
        tourable.onLoadObservable.Add(this._observableManager, () => {
            // pick hovering scene object
            tourable.eventManager.onMouseMoveObservable.Add(this._observableManager, () => {
                let result = this.pick(tourable);
                this._lastHoverSceneObject = this._hoverSceneObject;
                this._hoverSceneObject = result ? result.sceneObject : null;
            }, false)
        }, true)
    }
    pick = (tourable:Tourable):SceneObjectManagerPickResult => {
        if (tourable.sceneManager.sceneToRender){
            let possibleResults:SceneObjectManagerPickResult[] = this.multiPick(tourable);
            // return null of there is no possible results
            if (possibleResults.length <= 0) { return null; }
            // pick first possible result
            return possibleResults[0];
        } else {
            return null;
        }
    }
    multiPick = (tourable:Tourable):SceneObjectManagerPickResult[] => {
        if (tourable.sceneManager.sceneToRender){
            let results = tourable.sceneManager.sceneToRender.multiPick(tourable.sceneManager.sceneToRender.pointerX, tourable.sceneManager.sceneToRender.pointerY);
            let possibleResults:SceneObjectManagerPickResult[] = [];
    
            for (let r = 0; r < results.length; r++){
                let object = tourable.sceneObjects.get(parseInt(results[r].pickedMesh.name));
                if (object){
                    possibleResults.push( { sceneObject: object, pickingInfo:results[r] } );
                }
            }
            return possibleResults;
        } else {
            return null;
        }
    }
}