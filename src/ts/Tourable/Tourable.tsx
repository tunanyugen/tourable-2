import * as React from "react";
import UIDGenerator from "../Generator/UIDGenerator";
import SceneManager from "../Manager/SceneManager/SceneManager";
import SceneObjectManager from "../Manager/SceneObjectManager/SceneObjectManager";
import EventManager from "../Manager/EventManager/EventManager";
import Config from "../Config/Config";
import Observable from "@tunanyugen/observable";
import Scene, { SceneSchema } from "../Scene/Scene";
import Panorama from "../Panorama/Panorama";
import { Engine, RenderingManager } from "babylonjs";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import EditorGUI from "../GUI/EditorGUI";
import UncontrolledGUI from "../GUI/UncontrolledGUI";
import GUIRenderer from "../GUI/GUIRenderer";
import ClientGUI from "../GUI/ClientGUI";
import SceneObject from "../SceneObject/SceneObject";

export default interface TourableSchema {
    sceneSchemas: SceneSchema[];
}

export default class Tourable {
    protected _observableManager: ObservableManager = new ObservableManager();
    // state
    private _loaded: boolean = false;
    get loaded() {
        return this._loaded;
    }
    // generators
    uidGenerator: UIDGenerator;
    // managers
    sceneManager: SceneManager;
    sceneObjectManager: SceneObjectManager;
    eventManager: EventManager;
    // gui
    canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    clientGUI: React.RefObject<ClientGUI> = React.createRef();
    editorGUI: React.RefObject<EditorGUI> = React.createRef();
    uncontrolledGUI: React.RefObject<UncontrolledGUI> = React.createRef();
    engine: Engine;
    config: Config;
    // observables
    onLoadObservable: Observable = new Observable(this._observableManager, null, true);
    // entities
    panoramas: Map<number, Panorama> = new Map();
    scenes: Map<number, Scene> = new Map();
    sceneObjects: Map<number, SceneObject> = new Map();

    constructor(containerSelector: string, schema: TourableSchema) {
        RenderingManager.MAX_RENDERINGGROUPS = Config.MAX_RENDERINGGROUPS;
        // init config
        this.config = new Config();
        // init uid generator
        this.uidGenerator = new UIDGenerator();
        // init managers
        this.sceneManager = new SceneManager(this);
        this.sceneObjectManager = new SceneObjectManager(this);
        // render gui
        let renderResult = GUIRenderer.render(this, containerSelector);
        this.clientGUI = renderResult.clientGUI;
        this.editorGUI = renderResult.editorGUI;
        this.uncontrolledGUI = renderResult.uncontrolledGUI;
        this.canvas = renderResult.canvas;
        // create engine
        this.engine = new Engine(this.canvas.current, true, {
            preserveDrawingBuffer: true,
            stencil: true,
        });
        this.engine.renderEvenInBackground = false;
        // create scenes
        if (!schema.sceneSchemas || schema.sceneSchemas.length <= 0) {
            this.sceneManager.createSceneGroup(this);
        } else {
            schema.sceneSchemas.forEach((sceneSchema) => {
                new Scene(this, sceneSchema);
            });
        }
        // switch to first scene
        this.sceneManager.switchScene(this, this.scenes.entries().next().value[1].id);
        // init events
        this.eventManager = new EventManager(this);
        // finished loading
        this.onLoadObservable.Resolve();
        this._loaded = true;
        // run render loop
        // this.engine.runRenderLoop(() => {
        //     if (this.sceneManager.sceneToRender) {
        //         this.sceneManager.sceneToRender.render();
        //     }
        // });
        // resize on viewport change
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
    export = () => {
        let panoramas = Array.from(this.panoramas).map(([id, panorama]) => {
            return panorama.export();
        })
        let scenes = Array.from(this.scenes).map(([id, scene]) => {
            return scene.export();
        })
    };
}
