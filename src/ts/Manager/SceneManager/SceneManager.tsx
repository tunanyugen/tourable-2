import Observable from "@tunanyugen/observable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import Scene from "../../Scene/Scene";
import Panorama from "../../Panorama/Panorama";
import Tourable from "../../Tourable/Tourable";
import Hotspot from "../../SceneObject/Hotspot/Hotspot";
import { Vector3 } from "babylonjs";
import SceneGroup from "../../Scene/SceneGroup";

export default class SceneManager {
    protected _observableManager: ObservableManager = new ObservableManager();
    public createDefaultSceneObservable: Observable<Scene> = new Observable(this._observableManager);
    public changeSceneGroupObservable: Observable<SceneGroup> = new Observable(this._observableManager);
    public sceneGroups: SceneGroup[] = [];
    private _sceneToRender: Scene;
    get sceneToRender() {
        return this._sceneToRender;
    }
    private _currentSceneGroup: SceneGroup;
    get currentSceneGroup() {
        return this._currentSceneGroup;
    }
    public onSwitchSceneObservable: Observable<{ lastScene: Scene; scene: Scene }> = new Observable(this._observableManager, null, false);
    switchSceneGroup = (tourable: Tourable, sceneGroup: SceneGroup) => {
        if (this.currentSceneGroup == sceneGroup) {
            return;
        }
        this._currentSceneGroup = sceneGroup;
        if (this.currentSceneGroup.sceneIds.length <= 0) {
            this.createDefaultScene(tourable);
        }
        this.switchScene(tourable, this.currentSceneGroup.sceneIds[0]);
        this.changeSceneGroupObservable.Resolve(this.currentSceneGroup);
    };
    setScene = (tourable: Tourable, scene: Scene, delay: number = 500, callback = () => {}) => {
        // show load screen
        tourable.uncontrolledGUI.current.loadScreen.current.show();
        setTimeout(() => {
            // load dome and switch scene
            if (!scene.photoDome) {
                let startedLoadingAt = Date.now();
                scene.createPhotoDome(tourable, () => {
                    let lastScene = this._sceneToRender;
                    // switch scene
                    this._sceneToRender = scene;
                    // resolve subscriptions
                    this.onSwitchSceneObservable.Resolve({ lastScene, scene });
                    // reset old scene camera
                    if (lastScene) {
                        lastScene.resetCamera(true, false);
                    }
                    // delayed hide load screen
                    let timeout = 500 - (Date.now() - startedLoadingAt);
                    timeout = timeout < 0 ? 0 : timeout;
                    setTimeout(() => {
                        // hide load screen
                        tourable.uncontrolledGUI.current.loadScreen.current.hide();
                        callback();
                    }, timeout);
                });
            } else {
                let lastScene = this._sceneToRender;
                // switch scene
                this._sceneToRender = scene;
                // resolve subscriptions
                this.onSwitchSceneObservable.Resolve({ lastScene, scene });
                // reset old scene camera
                if (lastScene) {
                    lastScene.resetCamera(true, false);
                }
                // hide load screen
                tourable.uncontrolledGUI.current.loadScreen.current.hide();
                callback();
            }
        }, delay);
    };

    constructor(tourable: Tourable) {}
    createSceneGroup = (tourable: Tourable) => {
        let newSceneGroup = new SceneGroup(tourable);
        this.switchSceneGroup(tourable, newSceneGroup);
    };
    createDefaultScene = (tourable: Tourable): Scene => {
        let newPanorama = new Panorama(tourable, {
            id: tourable.uidGenerator.uid,
            name: "New scene",
            src: tourable.config.defaultPanorama,
            info: "",
            googleMap: "",
            thumbnail: tourable.config.defaultPanorama,
            overview: "",
        });
        let scene = new Scene(tourable, {
            id: tourable.uidGenerator.uid,
            panoramaId: newPanorama.id,
        });
        this.currentSceneGroup.addScene(scene);
        this.createDefaultSceneObservable.Resolve(scene);
        return scene;
    };
    switchScene = (tourable: Tourable, sceneID: number, hotspotID: number = -1) => {
        // get scene to check if scene exists
        let newScene = tourable.scenes.get(sceneID);
        if (!newScene) {
            console.error(`Scene ${sceneID} not found.`);
            return;
        }
        // get hotspot to know which direction to move toward to
        let hotspot = this.sceneToRender ? (tourable.sceneObjects.get(hotspotID) as Hotspot) : null;
        // wait for dome to be created or switch to scene if dome has already been created
        // get move direction
        if (hotspot) {
            let moveDirection = hotspot.mesh.position.clone();
            moveDirection.y = this.sceneToRender.camera.position.y;
            moveDirection.normalize();
            let moveDistance = 0.15;
            // show load screen
            tourable.uncontrolledGUI.current.loadScreen.current.show();
            // camera move out of scene effect
            this.sceneToRender
                .moveCamera(
                    this.sceneToRender.camera.position.clone(),
                    moveDirection.multiplyByFloats(moveDistance, moveDistance, moveDistance),
                    750
                )
                .then(() => {
                    // switch scene
                    this.setScene(tourable, newScene, 0, () => {
                        this.sceneToRender.camera.detachControl();
                        this.sceneToRender.camera.rotation = hotspot.enteringAngle;
                        this.sceneToRender.camera.attachControl();
                        // camera move into scene effect
                        this.sceneToRender.moveCamera(
                            this.sceneToRender.camera
                                .getDirection(Vector3.Forward())
                                .multiplyByFloats(moveDistance, moveDistance, moveDistance)
                                .negate(),
                            this.sceneToRender.camera.position.clone(),
                            750
                        );
                    });
                });
        } else {
            // switch scene
            this.setScene(tourable, newScene, 500, () => {
                if (hotspot) {
                    this.sceneToRender.camera.detachControl();
                    this.sceneToRender.camera.rotation = hotspot.enteringAngle;
                    this.sceneToRender.camera.attachControl();
                }
            });
        }
    };
}
