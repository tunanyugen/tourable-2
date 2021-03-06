import Observable from "@tunanyugen/observable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import { Mesh, Space, Vector3 } from "babylonjs";
import { Vector2 } from "babylonjs";
import Entity, { EntitySchema } from "../Entity/Entity";
import Tourable from "../Tourable/Tourable";
import Mathematics from "../Utilities/Mathematics/Mathematics";

export interface SceneObjectSchema extends EntitySchema {
    type: SceneObjectType;
    sceneId: number;
    originalScaling: { x: number; y: number; z: number };
    mesh:
        | {
              position: { x: number; y: number; z: number };
              rotation: { x: number; y: number; z: number };
              scaling: { x: number; y: number; z: number };
          }
        | Mesh;
    hoverTitle: string;
    clickTitle: string;
}

export default abstract class SceneObject extends Entity {
    //#region type
    protected _type: SceneObjectType;
    public get type() {
        return this._type;
    }
    //#endregion
    //#region original scaling
    private _originalScaling: Vector3 = new Vector3(1, 1, 1);
    public get originalScaling() {
        return this._originalScaling;
    }
    public set originalScaling(value: Vector3) {
        this._originalScaling = value.clone();
    }
    //#endregion
    //#region sceneID
    private _sceneId: number;
    public get sceneId() {
        return this._sceneId;
    }
    public set sceneId(value: number) {
        this._sceneId = value;
    }
    //#endregion
    //#region hoverTitle
    private _hoverTitle: string = "";
    public setHoverTitleWithoutInvokingObservable = (value: string) => {
        this._hoverTitle = value;
    };
    public get hoverTitle() {
        return this._hoverTitle;
    }
    public set hoverTitle(value: string) {
        this._hoverTitle = value;
        this.hoverTitleChangeObservable.Resolve(value);
    }
    //#endregion
    //#region clickTitle
    private _clickTitle: string = "";
    public setClickTitleWithoutInvokingObservable = (value: string) => {
        this._clickTitle = value;
    };
    public get clickTitle() {
        return this._clickTitle;
    }
    public set clickTitle(value) {
        this._clickTitle = value;
        this.clickTitleChangeObserable.Resolve(value);
    }
    //#endregion
    public mesh: Mesh;
    public grabbing: boolean = false;
    protected _observableManager: ObservableManager = new ObservableManager();
    public disposeObservable = new Observable(this._observableManager, null, true);
    public moveObservable: Observable = new Observable(this._observableManager, null, false);
    public gDownObservable: Observable;
    public gUpObservable: Observable;
    public onClickObservable: Observable<PointerEvent>;
    public onRightClickObservable: Observable<PointerEvent>;
    public pointerMoveObservable: Observable<PointerEvent>;
    public mouseScrollObservable: Observable<WheelEvent>;
    public pointerEnterObservable: Observable<PointerEvent>;
    public pointerLeaveObservable: Observable<PointerEvent>;
    public hoverTitleChangeObservable: Observable<string> = new Observable(this._observableManager, null, false);
    public clickTitleChangeObserable: Observable<string> = new Observable(this._observableManager, null, false);

    constructor(tourable: Tourable, sceneObjectType: SceneObjectType, schema?: SceneObjectSchema) {
        super(tourable, schema);
        this._type = sceneObjectType;
        // register to tourable
        tourable.sceneObjects.set(this.id, this);
        // init events
        this.defaultEvents(tourable);
    }
    move = (position: Vector3) => {
        this.mesh.position = position.clone();
        this.moveObservable.Resolve();
    };
    grab = (tourable: Tourable, pointerX: number, pointerY: number, xAxis: boolean, yAxis: boolean, zAxis: boolean) => {
        this.move(Mathematics.TransformPoint(tourable, this.mesh.position, new Vector2(pointerX, pointerY), xAxis, yAxis, zAxis));
    };
    sphericalGrab = (tourable: Tourable, pointerX: number, pointerY: number, lookAtCamera: boolean = false) => {
        this.move(Mathematics.ScreenToWorldPoint(tourable, new Vector2(pointerX, pointerY), 1));
        if (lookAtCamera) {
            this.mesh.lookAt(tourable.sceneManager.sceneToRender.camera.getDirection(Vector3.Forward()).negate());
        }
    };
    dispose = (tourable: Tourable) => {
        tourable.sceneObjects.delete(this.id);
        this.disposeObservable.Resolve();
        if (this.mesh) {
            this.mesh.dispose();
        }
        // for some reason some observables will not be resolved if run the following command without delay
        setTimeout(() => {
            this._observableManager.Dispose();
        }, 16);
    };
    private _scaleInterval: NodeJS.Timeout;
    scale = (start: Vector3, end: Vector3, duration: number) => {
        return new Promise((resolve) => {
            if (this._scaleInterval) {
                clearInterval(this._scaleInterval);
            }
            let totalIterations = Math.round(duration / 16);
            let iteration = 0;
            this._scaleInterval = setInterval(() => {
                if (iteration >= totalIterations) {
                    clearInterval(this._scaleInterval);
                    resolve(null);
                }
                this.mesh.scaling = Vector3.Lerp(start, end, iteration / totalIterations);
                iteration++;
            }, 16);
            return this._scaleInterval;
        });
    };
    private defaultEvents = (tourable: Tourable) => {
        let validObjectCondition = () => {
            return !this.mesh || tourable.sceneManager.sceneToRender.scene != this.mesh.getScene();
        };
        let mouseOverObjectCondition = () => {
            return tourable.sceneObjectManager.hoverSceneObject != this || validObjectCondition();
        };
        this.gDownObservable = new Observable(this._observableManager, null, false, mouseOverObjectCondition);
        this.gUpObservable = new Observable(this._observableManager, null, false, validObjectCondition);
        this.onClickObservable = new Observable(this._observableManager, null, false, mouseOverObjectCondition);
        this.onRightClickObservable = new Observable(this._observableManager, null, false, mouseOverObjectCondition);
        this.pointerMoveObservable = new Observable(this._observableManager, null, false, validObjectCondition);
        this.mouseScrollObservable = new Observable(this._observableManager, null, false, validObjectCondition);
        this.pointerEnterObservable = new Observable(this._observableManager, null, false, () => {
            return !(tourable.sceneObjectManager.lastHoverSceneObject != this && tourable.sceneObjectManager.hoverSceneObject == this);
        });
        this.pointerLeaveObservable = new Observable(this._observableManager, null, false, () => {
            return !(tourable.sceneObjectManager.lastHoverSceneObject == this && tourable.sceneObjectManager.hoverSceneObject != this);
        });
        // g key down
        this.gDownObservable.Add(
            this._observableManager,
            () => {
                // set grabbing state
                this.grabbing = true;
            },
            false
        );
        tourable.eventManager.g.onKeyDownObservable.AddObservable(this.gDownObservable);
        // g key up
        this.gUpObservable.Add(
            this._observableManager,
            () => {
                // unset grabbing state
                if (this.grabbing) {
                    this.grabbing = false;
                }
            },
            false
        );
        tourable.eventManager.g.onKeyUpObservable.AddObservable(this.gUpObservable);
        // on click
        tourable.eventManager.mouse0.onButtonDownObservable.AddObservable(this.onClickObservable);
        // right click
        tourable.eventManager.mouse2.onButtonDownObservable.AddObservable(this.onRightClickObservable);
        // pointer move
        tourable.eventManager.onMouseMoveObservable.AddObservable(this.pointerMoveObservable);
        // mouse scroll
        tourable.eventManager.onMouseScrollObservable.AddObservable(this.mouseScrollObservable);
        // pointer move observable
        tourable.eventManager.onMouseMoveObservable.AddObservable(this.pointerEnterObservable);
        tourable.eventManager.onMouseMoveObservable.AddObservable(this.pointerLeaveObservable);
        // default events
        this.mouseScrollObservable.Add(
            this._observableManager,
            (e) => {
                if (this.grabbing) {
                    this.mesh.rotate(Vector3.Up(), ((e.deltaY * 4) / 100) * (tourable.engine.getDeltaTime() / 1000), Space.WORLD);
                }
            },
            false
        );
        this.pointerEnterObservable.Add(
            this._observableManager,
            (e) => {
                // show bubble
                if (this.hoverTitle.length > 0) {
                    let titlePos = new Vector2(e.clientX, e.clientY);
                    // delaying to prevent hide function executes right after display
                    setTimeout(() => {
                        tourable.uncontrolledGUI.current.text.current.display(titlePos.x, titlePos.y, this.hoverTitle);
                    }, 16);
                }
            },
            false
        );
        this.pointerLeaveObservable.Add(
            this._observableManager,
            () => {
                // hide bubble popup
                if (!tourable.uncontrolledGUI.current.text.current.state.hidden) {
                    tourable.uncontrolledGUI.current.text.current.hide();
                }
            },
            false
        );
        this.onClickObservable.Add(
            this._observableManager,
            () => {
                // show popup
                if (this.clickTitle.length > 0) {
                    tourable.uncontrolledGUI.current.popup.current.display(this.clickTitle);
                }
            },
            false
        );
    };
    loadSceneObjectSchema = (tourable: Tourable, schema: SceneObjectSchema) => {
        this.loadEntitySchema(tourable, schema);
        if (schema) {
            this._type = schema.type;
            this._sceneId = schema.sceneId;
            this._originalScaling = new Vector3(schema.originalScaling.x, schema.originalScaling.y, schema.originalScaling.z);
            this.mesh.position = new Vector3(schema.mesh.position.x, schema.mesh.position.y, schema.mesh.position.z);
            this.mesh.rotation = new Vector3(schema.mesh.rotation.x, schema.mesh.rotation.y, schema.mesh.rotation.z);
            this.mesh.scaling = new Vector3(schema.mesh.scaling.x, schema.mesh.scaling.y, schema.mesh.scaling.z);
            this._hoverTitle = schema.hoverTitle;
            this._clickTitle = schema.clickTitle;
        } else {
            this._type = schema.type;
            this._sceneId = tourable.sceneManager.sceneToRender.id;
        }
    };
    exportSceneObject: () => SceneObjectSchema = () => {
        let entitySchema = this.exportEntity() as SceneObjectSchema;
        entitySchema.clickTitle = this._clickTitle;
        entitySchema.hoverTitle = this._hoverTitle;
        entitySchema.mesh = {
            position: { x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z },
            rotation: { x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z },
            scaling: { x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z },
        };
        entitySchema.originalScaling = { x: this._originalScaling.x, y: this._originalScaling.y, z: this._originalScaling.z };
        entitySchema.sceneId = this._sceneId;
        entitySchema.type = this._type;
        return entitySchema;
    };
    abstract export: () => SceneObjectSchema;
}
