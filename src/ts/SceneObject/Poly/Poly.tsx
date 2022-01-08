import Observable from "@tunanyugen/observable";
import { Color3, Mesh, StandardMaterial, Texture, Vector2, VertexBuffer, VertexData } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import Mathematics from "../../Utilities/Mathematics/Mathematics";
import Pivot from "../Pivot/Pivot";
import SceneObject, { SceneObjectSchema } from "../SceneObject";


export interface PolySchema extends SceneObjectSchema {
    pivotIDs:number[];
    color: {r:number, g:number, b:number};
    opacity: number;
}

export default class Poly extends SceneObject implements PolySchema{
    type: "poly" = "poly";
    public id: number;
    public pivotIDs: number[] = [];
    private _color:Color3 = new Color3(1, 1, 1);
    public get color(){ return this._color }
    public set color(value:Color3){
        this._color = value.clone();
        (this.mesh.material as StandardMaterial).emissiveColor = this._color;
    }
    private _opacity:number = 1;;
    public get opacity(){ return this._opacity }
    public set opacity(value:number){
        this._opacity = value;
        (this.mesh.material as StandardMaterial).alpha = value;
    }
    constructor(tourable:Tourable, sceneID:number, schema:PolySchema = null){
        super(tourable, sceneID, schema);
        // load data from schema
        if (schema){
            this.pivotIDs = schema.pivotIDs;
            this._color = new Color3(schema.color.r, schema.color.g, schema.color.b);
            this._opacity = schema.opacity;
        } else {
            this._color = new Color3(tourable.config.poly.color.r, tourable.config.poly.color.g, tourable.config.poly.color.b);
            this._opacity = tourable.config.poly.opacity;
        }
        // create mesh
        this.createMesh(tourable);
        // hook events
        this.hookEvents(tourable);
        // map to check if pivot exists in pivotIDs array
        let pivotMap = new Map<number, boolean>();
        let subscribeToPivot = (pivot:Pivot) => {
            pivot.moveObservable.Add(this._observableManager, () => { this.updateMesh(tourable) }, false);
            pivot.disposeObservable.Add(this._observableManager, () => { this.dispose(tourable) }, true);
        }
        if (!schema){
            // tutorial
            tourable.gui.current.notification.current.notify("Click anywhere to select a point", 2000)
            let pivotPickObservable = new Observable<PointerEvent>(this._observableManager, (e) => {
                // pick pivot or create new one as poly's vertex
                let result = tourable.sceneObjectManager.pick(tourable);
                let pivot:Pivot = null;
                if (result && result.sceneObject instanceof Pivot){
                    pivot = result.sceneObject;
                } else {
                    pivot = new Pivot(tourable, this.sceneID);
                    pivot.move(Mathematics.ScreenToWorldXZPlane(tourable, new Vector2(e.clientX, e.clientY), -1));
                }
                // add pivot array
                this.pivotIDs.push(pivot.id);
                if (!pivotMap.has(pivot.id)){
                    // subcribe to pivot events
                    subscribeToPivot(pivot);
                    // add pivot to map
                    pivotMap.set(pivot.id, true);
                }
                // recreate vertex data
                this.createVertexData(tourable);
                // notify user on how to stop
                tourable.gui.current.notification.current.notify(`Press "Esc" to stop`, 2000)
            }, false)
            // press escape to stop
            tourable.eventManager.escape.onKeyDownObservable.Add(this._observableManager, () => {
                pivotPickObservable.Dispose();
                tourable.gui.current.notification.current.notify(`Stopped picking vertices for poly`, 2000)
            }, true)
            tourable.eventManager.mouse0.onButtonDownObservable.AddObservable(pivotPickObservable);
        } else {
            tourable.onLoadObservabl.Add(this._observableManager, () => {
                let scene = tourable.sceneManager.scenes.get(this.sceneID);
                let pivotMap = new Map<number, boolean>();
                schema.pivotIDs.forEach((id) => {
                    if (!pivotMap.has(id)){{
                        let pivot = scene.sceneObjects.get(id) as Pivot;
                        subscribeToPivot(pivot);
                        pivotMap.set(id, true);
                    }}
                })
                this.createVertexData(tourable);
            }, true)
        }
    }
    createMesh = (tourable:Tourable) => {
        let scene = tourable.sceneManager.scenes.get(this.sceneID);
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
        let scene = tourable.sceneManager.scenes.get(this.sceneID);
        // generate positions
        let positions:number[] = [];
        let verticesCount = parseInt(`${this.pivotIDs.length / 3}`) * 3;
        for (let i = 0; i < verticesCount; i++){
            let pivot = scene.sceneObjects.get(this.pivotIDs[i]) as Pivot;
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
        let scene = tourable.sceneManager.scenes.get(this.sceneID);
        let positions:number[] = [];
        let count = parseInt(`${this.pivotIDs.length / 3}`) * 3;
        for (let i = 0; i < count; i++){
            let pivot = scene.sceneObjects.get(this.pivotIDs[i]) as Pivot;
            positions.push(pivot.mesh.position.x, pivot.mesh.position.y, pivot.mesh.position.z);
        }
        this.mesh.updateVerticesData(VertexBuffer.PositionKind, positions);
        this.mesh.refreshBoundingInfo();
    }
    hookEvents = (tourable:Tourable) => {
        this.onRightClickObservable.Add(this._observableManager, () => {
            tourable.gui.current.polyConfig.current.setTarget(this);
        }, false)
        this.hoverTitleChangeObservable.Add(this._observableManager, (hoverTitle) => {
            this.connectedPolies(tourable).forEach((poly) => {
                poly.setHoverTitleWithoutInvokingObservable(hoverTitle);
            })
        }, false)
    }
    connectedPolies = (tourable:Tourable) => {
        let polies:Poly[] = [];
        let pivotMap = new Map<number, boolean>();
        // add pivot ids to map
        this.pivotIDs.forEach((id) => { pivotMap.set(id, true) });
        // loop through all scene objects in scene
        tourable.sceneManager.sceneToRender.sceneObjects.forEach((poly, key) => {
            // check if scene object is a poly
            if (poly instanceof Poly){
                // check if poly is connected
                for (let i = 0; i < poly.pivotIDs.length; i++){
                    if (pivotMap.get(poly.pivotIDs[i])){
                        // add poly to array
                        polies.push(poly);
                        // add pivots to map
                        poly.pivotIDs.forEach((id) => { pivotMap.set(id, true) })
                        break;
                    }
                }
            }
        });
        return polies;
    }
    export = ():PolySchema => {
        return {
            id: this.id,
            sceneID: this.sceneID,
            type: this.type,
            pivotIDs: this.pivotIDs,
            color: {r: this.color.r, g: this.color.g, b: this.color.b},
            opacity: this.opacity,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            },
            hoverTitle: this.hoverTitle,
            clickTitle: this.clickTitle,
        }
    }
}