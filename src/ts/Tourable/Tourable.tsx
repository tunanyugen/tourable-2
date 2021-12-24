import * as React from 'react';
import GUI from "../GUI/GUI";
import UIDGenerator from "../Generator/UIDGenerator";
import SceneManager from "../Manager/SceneManager/SceneManager";
import EventManager from "../Manager/EventManager/EventManager";
import Config from "../Config/Config";
import Observable from '@tunanyugen/observable';
import Scene, { SceneSchema } from '../Scene/Scene';
import { Engine } from "babylonjs";

export default class Tourable{
    // generators
    uidGenerator:UIDGenerator;
    // managers
    sceneManager:SceneManager;
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
        // render gui
        let renderResult = GUI.render(this, containerSelector);
        this.gui = renderResult.gui;
        this.canvas = renderResult.canvas;
        // create engine
        this.engine = new Engine(this.canvas.current, true, {preserveDrawingBuffer: true, stencil: true});
        // create scenes
        sceneSchemas.forEach((schema) => {
            new Scene(this, schema.panorama)
        })
        // switch to first scene
        if (sceneSchemas.length > 0){ this.sceneManager.switchScene(sceneSchemas[0].id) }
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
}