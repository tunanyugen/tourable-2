import Scene from "../../Scene/Scene";
import Tourable from "../../Tourable/Tourable";

export default class SceneManager {
    scenes:Map<number, Scene> = new Map();
    sceneToRender:Scene;
    constructor(tourable:Tourable){}
    switchScene = (sceneID:number) => {
        let newScene = this.scenes.get(sceneID);
        if (!newScene){ console.error(`Scene ${sceneID} not found.`); return }
        if (!newScene.photoDome){
            newScene.createPhotoDome(() => {
                this.sceneToRender = newScene;
            })
        }
    }
}