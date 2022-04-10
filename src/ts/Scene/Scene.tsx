import { Scene as BABYLONScene, PhotoDome, FreeCamera, Vector3, Scalar, Texture } from "babylonjs";
import UIDGenerator from "../Generator/UIDGenerator";
import Panorama, { PanoramaSchema } from "../Panorama/Panorama";
import Tourable from "../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject/SceneObject";
import FloorHotspot, { FloorHotspotSchema } from "../SceneObject/Hotspot/FloorHotspot";
import FloatingHotspot from "../SceneObject/Hotspot/FloatingHotspot";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import InfoHotspot from "../SceneObject/Hotspot/InfoHotspot";
import Pivot from "../SceneObject/Pivot/Pivot";
import Poly from "../SceneObject/Poly/Poly";

export interface SceneSchema {
    id:number;
    panorama:Panorama|PanoramaSchema;
    sceneObjects:Map<number, SceneObject>|SceneObjectSchema[]|FloorHotspotSchema[];
}

export default class Scene extends BABYLONScene implements SceneSchema {
    protected _observableManager:ObservableManager = new ObservableManager();
    public uidGenerator:UIDGenerator = new UIDGenerator();
    public id:number;
    public sceneObjects:Map<number, SceneObject> = new Map();
    public photoDome:PhotoDome;
    public panorama:Panorama;
    public camera:FreeCamera;
    constructor(
        tourable:Tourable,
        panorama:Panorama,
        schema:SceneSchema = null
    ){
        super(tourable.engine);
        // load schema
        if (schema){
            this.id = schema.id;
            tourable.uidGenerator.uid = this.id + 1;
            this.panorama = new Panorama(schema.panorama.name, schema.panorama.src, schema.panorama.thumbnail);
            tourable.onLoadObservable.Add(this._observableManager, () => {
                (schema.sceneObjects as any).forEach((schema) => {
                    switch(schema.type){
                        case "floorHotspot": new FloorHotspot(tourable, this.id, schema); break;
                        case "floatingHotspot": new FloatingHotspot(tourable, this.id, schema); break;
                        case "infoHotspot": new InfoHotspot(tourable, this.id, schema); break;
                        case "poly": new Poly(tourable, this.id, schema); break;
                        case "pivot": new Pivot(tourable, this.id, schema); break;
                    }
                })
            }, true)
        } else {
            // get id
            this.id = tourable.uidGenerator.uid;
            this.panorama = panorama;
        }
        // register to sceneManager
        tourable.sceneManager.scenes.set(this.id, this);
        // create camera
        this.camera = new FreeCamera('camera1', new Vector3(0, 0, 0), this);
        this.camera.angularSensibility *= -1;
        this.camera.minZ = 0.001;
        this.camera.fov = tourable.config.fov * Math.PI / 180;
        // Target the camera to scene origin
        this.camera.setTarget(new Vector3(0, 0, 1));
        // Attach the camera to the canvas
        this.camera.attachControl();

        this.onDisposeObservable.addOnce(() => {
            this.panorama.dispose();
        })
    }
    createPhotoDome = (onLoad:Function = () => {}) => {
        this.photoDome = new PhotoDome(
            this.panorama.name,
            this.panorama.src,
            {
                resolution: 16,
                size: 2,
            },
            this
        );
        this.photoDome.mesh.isPickable = false;
        this.panorama.srcObservable.Add(this._observableManager, (src) => {
            this.photoDome.material.diffuseTexture = new Texture(src, this, {
                invertY: false
            });
        }, false)
        this.photoDome.onLoadObservable.addOnce(() => {
            onLoad();
        })
    }
    private _moveInterval:NodeJS.Timeout;
    moveCamera = (start:Vector3, end:Vector3, duration:number) => {
        return new Promise((resolve) => {
            if (this._moveInterval){ clearInterval(this._moveInterval) }
            let totalIterations = Math.round(duration / 16);
            let iteration = 0;
            this._moveInterval = setInterval(() => {
                if (iteration >= totalIterations){
                    clearInterval(this._moveInterval);
                    resolve(null);
                }
                this.camera.position = Vector3.Lerp(start, end, iteration / totalIterations);
                iteration++;
            }, 16);
            return this._moveInterval;
        })
    }
    private _changeFOVInterval:NodeJS.Timeout;
    changeFOV = (start:number, end:number, duration:number) => {
        return new Promise((resolve) => {
            if (this._changeFOVInterval){ clearInterval(this._changeFOVInterval) }
            let totalIterations = Math.round(duration / 16);
            let iteration = 0;
            this._changeFOVInterval = setInterval(() => {
                if (iteration >= totalIterations){
                    clearInterval(this._changeFOVInterval);
                    resolve(null);
                }
                this.camera.fov = Scalar.Lerp(start, end, iteration / totalIterations);
                iteration++;
            }, 16);
            return this._changeFOVInterval;
        })
    }
    delete = (tourable:Tourable) => {
        tourable.sceneManager.scenes.delete(this.id);
        tourable.sceneManager.onSwitchSceneObservable.Add(this._observableManager, () => {
            this.dispose();
        }, true)
        if (tourable.sceneManager.scenes.size <= 0){
            // create default scene
            tourable.sceneManager.createDefaultScene(tourable);
        }
        tourable.sceneManager.switchScene(tourable, tourable.sceneManager.scenes.entries().next().value[1].id)
    }
    resetCamera = (position:boolean = true, rotation:boolean = true) => {
        if (!this.camera){ return }
        if (position){ this.camera.position = Vector3.Zero() }
        if (rotation){ (this.camera as FreeCamera).rotation = Vector3.Zero() }
    }
    export = ():SceneSchema => {
        return {
            id: this.id,
            panorama: {
                name: this.panorama.name,
                src: this.panorama.src,
                thumbnail: this.panorama.thumbnail
            },
            sceneObjects: Array.from(this.sceneObjects).map(([id, sceneObject]) => { return sceneObject.export() }),
        }
    }
}