import * as React from 'react';
import GUI from "../GUI/GUI";
import UIDGenerator from "../Generator/UIDGenerator";
import SceneManager from "../Manager/SceneManager/SceneManager";
import EventManager from "../Manager/EventManager/EventManager";
import Config from "../Config/Config";
import Observable from '@tunanyugen/observable';

export default class Tourable{
    // generators
    uidGenerator:UIDGenerator;
    // managers
    sceneManager:SceneManager;
    eventManager:EventManager;
    // gui
    canvas:React.RefObject<HTMLCanvasElement> = React.createRef();
    gui:React.RefObject<GUI> = React.createRef();
    config:Config
    // observables
    onLoadObservabl:Observable = new Observable(null, true);

    constructor(containerSelector:string){
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
        // init events
        this.eventManager = new EventManager(this);

        this.onLoadObservabl.Resolve();
    }
}