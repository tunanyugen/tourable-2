import * as React from 'react';
import GUI from "../GUI/GUI";
import UIDGenerator from "../Generator/UIDGenerator";
import SceneManager from "../Manager/SceneManager/SceneManager";
import SceneObjectManager from "../Manager/SceneObjectManager/SceneObjectManager";
import EventManager from "../Manager/EventManager/EventManager";
import Config from "../Config/Config";
import Observable from '@tunanyugen/observable';
import Scene, { SceneSchema } from '../Scene/Scene';
import Panorama from "../Panorama/Panorama";
import { Engine, RenderingManager } from "babylonjs";
import { ObservableManager } from '@tunanyugen/observable/src/ts/ObservableManager';

export default class Tourable{
    protected _observableManager:ObservableManager = new ObservableManager();
    // state
    private _loaded:boolean = false;
    get loaded(){ return this._loaded }
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
    onLoadObservabl:Observable = new Observable(this._observableManager, null, true);

    constructor(containerSelector:string, sceneSchemas:SceneSchema[]){
        RenderingManager.MAX_RENDERINGGROUPS = Config.MAX_RENDERINGGROUPS;
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
        if (sceneSchemas.length <= 0){
            this.sceneManager.createDefaultScene(this);
        } else {
            sceneSchemas.forEach((schema) => {
                new Scene(this, new Panorama(schema.panorama.name, schema.panorama.src, schema.panorama.thumbnail), schema);
            })
        }
        // switch to first scene
        this.sceneManager.switchScene(this, this.sceneManager.scenes.entries().next().value[1].id)
        // init events
        this.eventManager = new EventManager(this);
        // finished loading
        this.onLoadObservabl.Resolve();
        this._loaded = true;
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
    export = ():SceneSchema[] => {
        return Array.from(this.sceneManager.scenes).map(([id, scene]) => {
            return scene.export();
        })
    }
}