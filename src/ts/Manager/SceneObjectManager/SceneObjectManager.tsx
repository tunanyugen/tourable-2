import Tourable from "../../Tourable/Tourable";
import SceneObjectManagerPickResult from "./SceneObjectManagerPickResult";

export default class SceneObjectManager{
    constructor(tourable:Tourable){
    }
    Pick = (tourable:Tourable):SceneObjectManagerPickResult => {
        if (tourable.sceneManager.sceneToRender){
            let possibleResults:SceneObjectManagerPickResult[] = this.MultiPick(tourable);
            // return null of there is no possible results
            if (possibleResults.length <= 0) { return null; }
            // pick first possible result
            return possibleResults[0];
        } else {
            return null;
        }
    }
    MultiPick = (tourable:Tourable):SceneObjectManagerPickResult[] => {
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
}