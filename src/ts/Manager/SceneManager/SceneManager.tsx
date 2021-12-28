import Observable from "@tunanyugen/observable";
import { FreeCamera, Vector3 } from "babylonjs";
import Scene from "../../Scene/Scene";
import Tourable from "../../Tourable/Tourable";

export default class SceneManager {
    scenes:Map<number, Scene> = new Map();
    private _sceneToRender:Scene;
    get sceneToRender(){ return this._sceneToRender }
    setScene = (tourable:Tourable, scene:Scene, delay:number = 500) => {
        // show load screen
        tourable.gui.current.loadScreen.current.show();
        // sync camera
        if (this.sceneToRender){
            scene.activeCamera.detachControl();
            (scene.activeCamera as FreeCamera).rotation = (this.sceneToRender.activeCamera as FreeCamera).rotation;
            scene.activeCamera.attachControl();
        }
        setTimeout(() => {
            // load dome and switch scene
            if (!scene.photoDome){
                let startedLoadingAt = Date.now();
                scene.createPhotoDome(() => {
                    let lastScene = this._sceneToRender;
                    // switch scene
                    this._sceneToRender = scene;
                    this.disableOtherSceneObjects();
                    // resolve subscriptions
                    this.onSwitchSceneObservable.Resolve({lastScene, scene});
                    // reset old scene camera
                    if (lastScene){ lastScene.resetCamera(true, false) }
                    // delayed hide load screen
                    let timeout = 500 - (Date.now() - startedLoadingAt);
                    timeout = timeout < 0 ? 0 : timeout;
                    setTimeout(() => {
                        // hide load screen
                        tourable.gui.current.loadScreen.current.hide();
                    }, timeout);
                })
            } else {
                let lastScene = this._sceneToRender;
                // switch scene
                this._sceneToRender = scene;
                this.disableOtherSceneObjects();
                // resolve subscriptions
                this.onSwitchSceneObservable.Resolve({lastScene, scene});
                // reset old scene camera
                if (lastScene){ lastScene.resetCamera(true, false) }
                // hide load screen
                tourable.gui.current.loadScreen.current.hide();
            }
        }, delay);
    }
    onSwitchSceneObservable:Observable<{lastScene:Scene, scene:Scene}> = new Observable(null, false);

    constructor(tourable:Tourable){}
    switchScene = (tourable:Tourable, sceneID:number, hotspotID:number = -1) => {
        // get scene to check if scene exists
        let newScene = this.scenes.get(sceneID);
        if (!newScene){ console.error(`Scene ${sceneID} not found.`); return }
        // get hotspot to know which direction to move toward
        let hotspot = this.sceneToRender ? this.sceneToRender.sceneObjects.get(hotspotID) : null;
        // wait for dome to be created or switch to scene if dome has already been created
        // get move direction
        if (hotspot){
            let moveDirection = hotspot.mesh.position.clone();
            moveDirection.y = this.sceneToRender.activeCamera.position.y;
            moveDirection.normalize();
            let moveDistance = 0.15;
            // show load screen
            tourable.gui.current.loadScreen.current.show();
            // camera move out of scene effect
            this.sceneToRender.moveCamera(this.sceneToRender.activeCamera.position.clone(), moveDirection.multiplyByFloats(moveDistance, moveDistance, moveDistance), 750).then(() => {
                // subscribe
                this.onSwitchSceneObservable.Add((res) => {
                    // camera move into scene effect
                    res.scene.moveCamera(moveDirection.multiplyByFloats(moveDistance, moveDistance, moveDistance).negate(), Vector3.Zero(), 750);
                }, true)
                // switch scene
                this.setScene(tourable, newScene, 0);
            })
        } else {
            // switch scene
            this.setScene(tourable, newScene);
        }
    }
    disableOtherSceneObjects = () => {
        this.scenes.forEach((scene) => {
            if (scene != this.sceneToRender){
                scene.sceneObjects.forEach((sceneObject) => {
                    sceneObject.mesh.setEnabled(false);
                })
            } else {
                scene.sceneObjects.forEach((sceneObject) => {
                    sceneObject.mesh.setEnabled(true);
                })
            }
        })
    }
}