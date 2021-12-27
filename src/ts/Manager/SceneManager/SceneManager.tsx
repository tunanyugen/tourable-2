import Scene from "../../Scene/Scene";
import Tourable from "../../Tourable/Tourable";

export default class SceneManager {
    scenes:Map<number, Scene> = new Map();
    sceneToRender:Scene;
    constructor(tourable:Tourable){}
    switchScene = (sceneID:number, hotspotID:number = -1) => {
        // get hotspot to know which direction to move toward
        let hotspot = this.sceneToRender.sceneObjects.get(hotspotID);
        console.log(hotspot);
        // get scene to check if scene exists
        let newScene = this.scenes.get(sceneID);
        if (!newScene){ console.error(`Scene ${sceneID} not found.`); return }
        // wait for dome to be created or switch to scene if dome has already been created
        if (!newScene.photoDome){
            newScene.createPhotoDome(() => {
                this.sceneToRender = newScene;
            })
        } else {
            this.sceneToRender = newScene;
        }
    }
}