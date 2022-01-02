import { Scene as BABYLONScene, PhotoDome, FreeCamera, Vector3, Scalar } from "babylonjs";
import UIDGenerator from "../Generator/UIDGenerator";
import { PanoramaSchema } from "../Panorama/Panorama";
import Tourable from "../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject/SceneObject";
import FloorHotspot, { FloorHotspotSchema } from "../SceneObject/Hotspot/FloorHotspot";
import FloatingHotspot, { FloatingHotspotSchema } from "../SceneObject/Hotspot/FloatingHotspot";

export interface SceneSchema {
    id:number;
    panorama:PanoramaSchema;
    sceneObjects:Map<number, SceneObject>|SceneObjectSchema[]|FloorHotspotSchema[];
}

export default class Scene extends BABYLONScene implements SceneSchema {
    public uidGenerator:UIDGenerator = new UIDGenerator();
    public id:number;
    public sceneObjects:Map<number, SceneObject> = new Map();
    public photoDome:PhotoDome;
    constructor(
        tourable:Tourable,
        public panorama:PanoramaSchema,
        schema:SceneSchema = null
    ){
        super(tourable.engine);
        // load schema
        if (schema){
            this.id = schema.id;
            tourable.uidGenerator.uid = this.id + 1;
            this.panorama = schema.panorama;
            tourable.onLoadObservabl.Add(() => {
                (schema.sceneObjects as FloorHotspotSchema[]|FloatingHotspotSchema[]).forEach((sceneObject) => {
                    switch(sceneObject.type){
                        case "floorHotspot": new FloorHotspot(tourable, this.id, sceneObject); break;
                        case "floatingHotspot": new FloatingHotspot(tourable, this.id, sceneObject); break;
                    }
                })
            }, true)
        } else {
            // get id
            this.id = tourable.uidGenerator.uid;
        }
        // register to sceneManager
        tourable.sceneManager.scenes.set(this.id, this);
        // create camera
        let camera = new FreeCamera('camera1', new Vector3(0, 0, 0), this);
        camera.angularSensibility *= -1;
        camera.minZ = 0.001;
        camera.fov = tourable.config.fov * Math.PI / 180;
        // Target the camera to scene origin
        camera.setTarget(new Vector3(0, 0, 1));
        // Attach the camera to the canvas
        camera.attachControl();
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
                this.activeCamera.position = Vector3.Lerp(start, end, iteration / totalIterations);
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
                this.activeCamera.fov = Scalar.Lerp(start, end, iteration / totalIterations);
                iteration++;
            }, 16);
            return this._changeFOVInterval;
        })
    }
    resetCamera = (position:boolean = true, rotation:boolean = true) => {
        if (position){ this.activeCamera.position = Vector3.Zero() }
        if (rotation){ (this.activeCamera as FreeCamera).rotation = Vector3.Zero() }
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