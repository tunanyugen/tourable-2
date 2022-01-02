import { Space, Vector2, Vector3 } from "babylonjs";
import FloatingHotspot from "../../SceneObject/Hotspot/FloatingHotspot";
import FloorHotspot from "../../SceneObject/Hotspot/FloorHotspot";
import SceneObject from "../../SceneObject/SceneObject";
import Tourable from "../../Tourable/Tourable";
import Mathematics from "../../Utilities/Mathematics/Mathematics";
import SceneObjectManagerPickResult from "./SceneObjectManagerPickResult";

export default class SceneObjectManager{
    target:SceneObject;
    private _lastHoverSceneObject:SceneObject;
    get lastHoverSceneObject(){ return this._lastHoverSceneObject }
    private _hoverSceneObject:SceneObject;
    get hoverSceneObject(){ return this._hoverSceneObject }
    constructor(tourable:Tourable){
        tourable.onLoadObservabl.Add(() => {
            // pick hovering scene object
            tourable.eventManager.onMouseMoveObservable.Add(() => {
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
                let object = tourable.sceneManager.sceneToRender.sceneObjects.get(parseInt(results[r].pickedMesh.name));
                if (object){
                    possibleResults.push( { sceneObject: object, pickingInfo:results[r] } );
                }
            }
            return possibleResults;
        } else {
            return null;
        }
    }
    private _pickTarget = (tourable:Tourable) => {
        let result = this.pick(tourable);
        if (!result){ return }
        this.target = result.sceneObject;
    }
}