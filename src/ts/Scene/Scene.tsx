import { Scene as BABYLONScene, Engine, SceneOptions, PhotoDome, FreeCamera, Vector3 } from "babylonjs";
import Panorama, { PanoramaSchema } from "../Panorama/Panorama";
import Tourable from "../Tourable/Tourable";

export interface SceneSchema {
    id:number;
    panorama:PanoramaSchema;
}

export default class Scene extends BABYLONScene implements SceneSchema {
    public id:number;
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
                size: 1,
            },
            this
        );
        this.photoDome.onLoadObservable.addOnce(() => {
            onLoad();
        })
    }
}