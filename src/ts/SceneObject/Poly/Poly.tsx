import Observable from "@tunanyugen/observable";
import { Color3, Mesh, StandardMaterial, Texture, Vector2, VertexBuffer, VertexData } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import Mathematics from "../../Utilities/Mathematics/Mathematics";
import Pivot from "../Pivot/Pivot";
import SceneObject, { SceneObjectSchema } from "../SceneObject";


export interface PolySchema extends SceneObjectSchema{
    pivotIds:number[];
    color: {r:number, g:number, b:number};
    opacity: number;
}

export default class Poly extends SceneObject implements PolySchema{
    //#region pivotIds
    public pivotIds: number[] = [];
    //#endregion
    //#region color
    private _color:Color3 = new Color3(1, 1, 1);
    public get color(){ return this._color }
    public set color(value:Color3){
        this._color = value.clone();
        (this.mesh.material as StandardMaterial).emissiveColor = this._color;
    }
    //#endregion
    //#region opacity
    private _opacity:number = 1;;
    public get opacity(){ return this._opacity }
    public set opacity(value:number){
        this._opacity = value;
        (this.mesh.material as StandardMaterial).alpha = value;
    }
    //#endregion
    constructor(tourable:Tourable, schema:PolySchema = null){
        super(tourable, schema);
        this.createMesh(tourable);
        this.loadSchema(tourable, schema);
        this.hookEvents(tourable);
        if (!schema){
            this.tutorial(tourable);
        } else {
            tourable.onLoadObservable.Add(this._observableManager, () => {
                let pivotMap = new Map<number, boolean>();
                schema.pivotIds.forEach((id) => {
                    if (!pivotMap.has(id)){{
                        let pivot = tourable.sceneObjects.get(id) as Pivot;
                        this.subscribeToPivot(tourable, pivot);
                        pivotMap.set(id, true);
                    }}
                })
                this.createVertexData(tourable);
            }, true)
        }
    }
    createMesh = (tourable:Tourable) => {
        let scene = tourable.scenes.get(this.sceneId);
        // create mesh
        this.mesh = new Mesh(this.id.toString(), scene);
        // create material
        let material = new StandardMaterial(this.id.toString(), scene);
        material.emissiveColor = this.color;
        material.diffuseTexture = new Texture(tourable.config.assets.poly[0], scene);
        material.backFaceCulling = false;
        material.alpha = this.opacity;
        this.mesh.material = material;
        // set rendering group
        this.mesh.renderingGroupId = tourable.config.poly.renderingGroupID;
    }
    createVertexData = (tourable:Tourable) => {
        let scene = tourable.scenes.get(this.sceneId);
        // generate positions
        let positions:number[] = [];
        let verticesCount = parseInt(`${this.pivotIds.length / 3}`) * 3;
        for (let i = 0; i < verticesCount; i++){
            let pivot = tourable.sceneObjects.get(this.pivotIds[i]) as Pivot;
            positions.push(pivot.mesh.position.x, pivot.mesh.position.y, pivot.mesh.position.z);
        }
        // generate indices
        let indices:number[] = [];
        for (let i = 0; i < verticesCount; i+=3){
            indices.push(i, i + 1, i + 2)
        }
        let vertexData = new VertexData();
        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.applyToMesh(this.mesh, true);
    }
    updateMesh = (tourable:Tourable) => {
        // create new positions
        let positions:number[] = [];
        let count = parseInt(`${this.pivotIds.length / 3}`) * 3;
        for (let i = 0; i < count; i++){
            let pivot = tourable.sceneObjects.get(this.pivotIds[i]) as Pivot;
            positions.push(pivot.mesh.position.x, pivot.mesh.position.y, pivot.mesh.position.z);
        }
        this.mesh.updateVerticesData(VertexBuffer.PositionKind, positions);
        this.mesh.refreshBoundingInfo();
    }
    hookEvents = (tourable:Tourable) => {
        this.onRightClickObservable.Add(this._observableManager, () => {
            tourable.editorGUI.current.polyConfig.current.setTarget(this);
        }, false)
    }
    subscribeToPivot = (tourable:Tourable, pivot:Pivot) => {
        pivot.moveObservable.Add(this._observableManager, () => { this.updateMesh(tourable) }, false);
        pivot.disposeObservable.Add(this._observableManager, () => { this.dispose(tourable) }, true);
    }
    tutorial = (tourable:Tourable) => {
        // map to check if pivot exists in pivotIDs array
        let pivotMap = new Map<number, boolean>();

        tourable.uncontrolledGUI.current.notification.current.notify("Click anywhere to select a point", 2000)
        let pivotPickObservable = new Observable<PointerEvent>(this._observableManager, (e) => {
            // pick pivot or create new one as poly's vertex
            let result = tourable.sceneObjectManager.pick(tourable);
            let pivot:Pivot = null;
            if (result && result.sceneObject instanceof Pivot){
                pivot = result.sceneObject;
            } else {
                pivot = new Pivot(tourable, this.sceneId);
                pivot.move(Mathematics.ScreenToWorldXZPlane(tourable, new Vector2(e.clientX, e.clientY), -1));
            }
            // add pivot array
            this.pivotIds.push(pivot.id);
            if (!pivotMap.has(pivot.id)){
                // subcribe to pivot events
                this.subscribeToPivot(tourable, pivot);
                // add pivot to map
                pivotMap.set(pivot.id, true);
            }
            // recreate vertex data
            this.createVertexData(tourable);
            // notify user on how to stop
            tourable.uncontrolledGUI.current.notification.current.notify(`Press "Esc" to stop`, 2000)
        }, false)
        tourable.eventManager.mouse0.onButtonDownObservable.AddObservable(pivotPickObservable);
        // press escape to stop
        tourable.eventManager.escape.onKeyDownObservable.Add(this._observableManager, () => {
            pivotPickObservable.Dispose();
            tourable.uncontrolledGUI.current.notification.current.notify(`Stopped picking vertices for poly`, 2000)
        }, true)
    }
    loadSchema = (tourable: Tourable, schema: PolySchema) => {
        this.loadSceneObjectSchema(tourable, schema);
        if (schema){
            this.pivotIds = schema.pivotIds;
            this._color = new Color3(schema.color.r, schema.color.g, schema.color.b);
            this._opacity = schema.opacity;
        } else {
            this._color = new Color3(tourable.config.poly.color.r, tourable.config.poly.color.g, tourable.config.poly.color.b);
            this._opacity = tourable.config.poly.opacity;
        }
    }
    export = ():PolySchema => {
        let sceneObjectSchema = this.exportSceneObject() as PolySchema;
        sceneObjectSchema.pivotIds = this.pivotIds;
        sceneObjectSchema.color = {r: this.color.r, g: this.color.g, b: this.color.b};
        sceneObjectSchema.opacity = this.opacity;
        return sceneObjectSchema;
    }
}