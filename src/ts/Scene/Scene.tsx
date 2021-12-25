import { Scene as BABYLONScene, PhotoDome, FreeCamera, Vector3 } from "babylonjs";
import UIDGenerator from "../Generator/UIDGenerator";
import { PanoramaSchema } from "../Panorama/Panorama";
import Tourable from "../Tourable/Tourable";
import SceneObject from "../SceneObject/SceneObject";

export interface SceneSchema {
    id:number;
    panorama:PanoramaSchema;
    sceneObjects:Map<number, SceneObject>;
}

export default class Scene extends BABYLONScene implements SceneSchema {
    public uidGenerator:UIDGenerator = new UIDGenerator();
    public id:number;
    public sceneObjects:Map<number, SceneObject> = new Map();
    public photoDome:PhotoDome;
    constructor(
        tourable:Tourable,
        public panorama:PanoramaSchema
    ){
        super(tourable.engine);
        // get id
        this.id = tourable.uidGenerator.uid;
        // register to sceneManager
        tourable.sceneManager.scenes.set(this.id, this);
        // create camera
        let camera = new FreeCamera('camera1', new Vector3(0, 0, 0), this);
        camera.minZ = 0.0001;
        camera.fov = tourable.config.fov * Math.PI / 180;
        // Target the camera to scene origin
        camera.setTarget(new Vector3(0, 0, 1));
        // Attach the camera to the canvas
        camera.attachControl(tourable.canvas.current, false);
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
        this.photoDome.onLoadObservable.addOnce(() => {
            onLoad();
        })
    }
}