import * as React from 'react';
import GUI from "../GUI/GUI";
import UIDGenerator from "../Generator/UIDGenerator";
import SceneManager from "../Manager/SceneManager/SceneManager";
import SceneObjectManager from "../Manager/SceneObjectManager/SceneObjectManager";
import EventManager from "../Manager/EventManager/EventManager";
import Config from "../Config/Config";
import Observable from '@tunanyugen/observable';
import Scene, { SceneSchema } from '../Scene/Scene';
import { Engine } from "babylonjs";
import FloorHotspot, { FloorHotspotSchema } from '../SceneObject/FloorHotspot/FloorHotspot';

export default class Tourable{
    // generators
    uidGenerator:UIDGenerator;
    // managers
    sceneManager:SceneManager;
    sceneObjectManager:SceneObjectManager;
    eventManager:EventManager;
    // gui
    canvas:React.RefObject<HTMLCanvasElement> = React.createRef();
    gui:React.RefObject<GUI> = React.createRef();
    engine:Engine;
    config:Config
    // observables
    onLoadObservabl:Observable = new Observable(null, true);

    constructor(containerSelector:string, sceneSchemas:SceneSchema[]){
        // init config
        this.config = new Config();
        // init uid generator
        this.uidGenerator = new UIDGenerator();
        // init managers
        this.sceneManager = new SceneManager(this);
        this.sceneObjectManager = new SceneObjectManager(this);
        // render gui
        let renderResult = GUI.render(this, containerSelector);
        this.gui = renderResult.gui;
        this.canvas = renderResult.canvas;
        // create engine
        this.engine = new Engine(this.canvas.current, true, {preserveDrawingBuffer: true, stencil: true});
        this.engine.renderEvenInBackground = false;
        // create scenes
        sceneSchemas.forEach((schema) => {
            new Scene(this, schema.panorama, schema);
        })
        // switch to first scene
        if (sceneSchemas.length > 0){ this.sceneManager.switchScene(this, sceneSchemas[0].id) }
        // init events
        this.eventManager = new EventManager(this);
        // finished loading
        this.onLoadObservabl.Resolve();
        // run render loop
        this.engine.runRenderLoop(() => {
            if (this.sceneManager.sceneToRender){
                this.sceneManager.sceneToRender.render()
            }
        })
        // resize on viewport change
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
    export = () => {
        return JSON.stringify(Array.from(this.sceneManager.scenes).map(([id, scene]) => {
            return scene.export();
        }))
    }
}