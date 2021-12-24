import { Scene as BABYLONScene } from "babylonjs";
import { Engine } from "babylonjs/Engines/engine";
import { SceneOptions } from "babylonjs/scene";
import Panorama from "../Panorama/Panorama";
import Tourable from "../Tourable/Tourable";

export interface SceneSchema {
    panorama:Panorama;
}

export default class Scene extends BABYLONScene implements SceneSchema {
    public id:number;
    constructor(
        tourable:Tourable,
        engine:Engine,
        options:SceneOptions,
        public panorama:Panorama
    ){
        super(engine, options)
        this.id = tourable.uidGenerator.uid;
    }
}