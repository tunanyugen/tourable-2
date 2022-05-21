import * as React from "react";
import UIDGenerator from "../Generator/UIDGenerator";
import SceneManager from "../Manager/SceneManager/SceneManager";
import SceneObjectManager from "../Manager/SceneObjectManager/SceneObjectManager";
import EventManager from "../Manager/EventManager/EventManager";
import Config from "../Config/Config";
import Observable from "@tunanyugen/observable";
import Scene, { SceneSchema } from "../Scene/Scene";
import Panorama, { PanoramaSchema } from "../Panorama/Panorama";
import { Engine, RenderingManager } from "babylonjs";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import EditorGUI from "../GUI/EditorGUI";
import UncontrolledGUI from "../GUI/UncontrolledGUI";
import GUIRenderer from "../GUI/GUIRenderer";
import ClientGUI from "../GUI/ClientGUI";
import SceneObject, { SceneObjectSchema } from "../SceneObject/SceneObject";
import SceneGroup, { SceneGroupSchema } from "../Scene/SceneGroup";
import Entity, { EntitySchema } from "../Entity/Entity";

export default interface TourableSchema {
    panoramaSchemas: PanoramaSchema[];
    sceneSchemas: SceneSchema[];
    sceneGroupSchemas: SceneGroupSchema[];
    sceneObjectSchemas: SceneObjectSchema[];
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
    sceneGroupObservable: Observable = new Observable(this._observableManager, null, false);
    // entities
    entities: Map<number, Entity> = new Map();
    panoramas: Map<number, Panorama> = new Map();
    scenes: Map<number, Scene> = new Map();
    sceneGroups: Map<number, SceneGroup> = new Map();
    sceneObjects: Map<number, SceneObject> = new Map();

    constructor(containerSelector: string, schema?: TourableSchema) {
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
        if (!schema) {
            console.log("Not loading schema")
            this.sceneManager.createSceneGroup(this);
        } else {
            console.log("Loading schema")
            this.loadSchema(schema);
        }
        // switch to first scene
        this.sceneManager.switchScene(this, this.scenes.entries().next().value[1].id);
        // init events
        this.eventManager = new EventManager(this);
        // finished loading
        this.onLoadObservable.Resolve();
        this._loaded = true;
        // run render loop
        this.engine.runRenderLoop(() => {
            if (this.sceneManager.sceneToRender) {
                this.sceneManager.sceneToRender.scene.render();
            }
        });
        // resize on viewport change
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
    loadSchema = (schema: TourableSchema) => {
        schema.panoramaSchemas.forEach((panoramaSchema) => {
            new Panorama(this, panoramaSchema);
        });
        schema.sceneSchemas.forEach((sceneSchema) => {
            new Scene(this, sceneSchema);
        });
        schema.sceneGroupSchemas.forEach((sceneGroupSchema) => {
            new SceneGroup(this, sceneGroupSchema);
        })
        schema.sceneObjectSchemas.forEach((sceneObjectSchema) => {
            this.sceneObjectManager.loadSceneObjectSchema(this, sceneObjectSchema);
        })
    };
    export: () => TourableSchema = () => {
        let panoramaSchemas = Array.from(this.panoramas).map(([id, panorama]) => {
            return panorama.export();
        });
        let sceneSchemas = Array.from(this.scenes).map(([id, scene]) => {
            return scene.export();
        });
        let sceneGroupSchemas = Array.from(this.sceneGroups).map(([id, sceneGroup]) => {
            return sceneGroup.export();
        })
        let sceneObjectSchemas = Array.from(this.sceneObjects).map(([id, sceneObject]) => {
            return sceneObject.export();
        })
        return {
            panoramaSchemas,
            sceneSchemas,
            sceneGroupSchemas,
            sceneObjectSchemas,
        } as TourableSchema;
    };
}
