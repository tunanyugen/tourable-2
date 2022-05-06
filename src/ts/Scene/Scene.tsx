import { Scene as BABYLONScene, PhotoDome, FreeCamera, Vector3, Scalar, Texture } from "babylonjs";
import UIDGenerator from "../Generator/UIDGenerator";
import Panorama, { PanoramaSchema } from "../Panorama/Panorama";
import Tourable from "../Tourable/Tourable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import Schema from "../Interfaces/Schema";
import HasSchema from "../Interfaces/HasSchema";

export interface SceneSchema extends Schema {
    id: number;
    panoramaId: number;
    sceneObjectIds: number[];
}

export default class Scene extends BABYLONScene implements HasSchema, SceneSchema {
    protected _observableManager: ObservableManager = new ObservableManager();
    public uidGenerator: UIDGenerator = new UIDGenerator();
    public photoDome: PhotoDome;
    public camera: FreeCamera;
    //#region id
    private _id: number;
    public get id() {
        return this._id;
    }
    //#endregion
    //#region panoramaId
    private _panoramaId: number = -1;
    public get panoramaId() {
        return this._panoramaId;
    }
    public set panoramaId(value: number){
        this._panoramaId = value;
    }
    //#endregion
    public sceneObjectIds: number[] = [];
    constructor(tourable: Tourable, schema: SceneSchema = null) {
        super(tourable.engine);
        // load schema
        if (schema) {
            this.loadSchema(tourable, schema);
        } else {
            // get id
            this._id = tourable.uidGenerator.uid;
        }
        // register to sceneManager
        tourable.scenes.set(this.id, this);
        // create camera
        this.camera = new FreeCamera("camera1", new Vector3(0, 0, 0), this);
        this.camera.angularSensibility *= -1;
        this.camera.minZ = 0.001;
        this.camera.fov = (tourable.config.fov * Math.PI) / 180;
        // Target the camera to scene origin
        this.camera.setTarget(new Vector3(0, 0, 1));
        // Attach the camera to the canvas
        this.camera.attachControl();

        this.onDisposeObservable.addOnce(() => {
            tourable.panoramas.get(this.panoramaId).dispose();
        });
    }
    createPhotoDome = (tourable:Tourable, onLoad: Function = () => { }) => {
        let panorama = tourable.panoramas.get(this.panoramaId);
        this.photoDome = new PhotoDome(
            panorama.name,
            panorama.src,
            {
                resolution: 16,
                size: 2,
            },
            this
        );
        this.photoDome.mesh.isPickable = false;
        panorama.srcObservable.Add(
            this._observableManager,
            (src) => {
                this.photoDome.material.diffuseTexture = new Texture(src, this, {
                    invertY: false,
                });
            },
            false
        );
        this.photoDome.onLoadObservable.addOnce(() => {
            onLoad();
        });
    };
    private _moveInterval: NodeJS.Timeout;
    moveCamera = (start: Vector3, end: Vector3, duration: number) => {
        return new Promise((resolve) => {
            if (this._moveInterval) {
                clearInterval(this._moveInterval);
            }
            let totalIterations = Math.round(duration / 16);
            let iteration = 0;
            this._moveInterval = setInterval(() => {
                if (iteration >= totalIterations) {
                    clearInterval(this._moveInterval);
                    resolve(null);
                }
                this.camera.position = Vector3.Lerp(start, end, iteration / totalIterations);
                iteration++;
            }, 16);
            return this._moveInterval;
        });
    };
    private _changeFOVInterval: NodeJS.Timeout;
    changeFOV = (start: number, end: number, duration: number) => {
        return new Promise((resolve) => {
            if (this._changeFOVInterval) {
                clearInterval(this._changeFOVInterval);
            }
            let totalIterations = Math.round(duration / 16);
            let iteration = 0;
            this._changeFOVInterval = setInterval(() => {
                if (iteration >= totalIterations) {
                    clearInterval(this._changeFOVInterval);
                    resolve(null);
                }
                this.camera.fov = Scalar.Lerp(start, end, iteration / totalIterations);
                iteration++;
            }, 16);
            return this._changeFOVInterval;
        });
    };
    delete = (tourable: Tourable) => {
        tourable.scenes.delete(this.id);
        tourable.sceneManager.onSwitchSceneObservable.Add(
            this._observableManager,
            () => {
                this.dispose();
            },
            true
        );
        if (tourable.scenes.size <= 0) {
            // create default scene
            tourable.sceneManager.createDefaultScene(tourable);
        }
        tourable.sceneManager.switchScene(tourable, tourable.scenes.entries().next().value[1].id);
    };
    resetCamera = (position: boolean = true, rotation: boolean = true) => {
        if (!this.camera) {
            return;
        }
        if (position) {
            this.camera.position = Vector3.Zero();
        }
        if (rotation) {
            (this.camera as FreeCamera).rotation = Vector3.Zero();
        }
    };
    loadSchema = (tourable: Tourable, schema: SceneSchema) => {
        this._id = schema.id;
        tourable.uidGenerator.uid = this.id + 1;
        this.panoramaId = schema.panoramaId;
        this.sceneObjectIds = schema.sceneObjectIds;
    };
    export = (): SceneSchema => {
        return {
            id: this.id,
            sceneObjectIds: this.sceneObjectIds,
            panoramaId: this.panoramaId,
        };
    };
}
