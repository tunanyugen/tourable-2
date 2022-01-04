import Observable from "@tunanyugen/observable";
import { Color3, Mesh, StandardMaterial, Texture, Vector2, VertexData } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import Mathematics from "../../Utilities/Mathematics/Mathematics";
import Pivot from "../Pivot/Pivot";
import SceneObject, { SceneObjectSchema } from "../SceneObject";


export interface PolySchema extends SceneObjectSchema {
    pivotIDs:number[];
}

export default class Poly extends SceneObject implements PolySchema{
    type: "poly" = "poly";
    public id: number;
    pivotIDs: number[] = [];
    constructor(tourable:Tourable, sceneID:number, schema:PolySchema = null){
        super(tourable, sceneID, schema);
        // load data from schema
        if (schema){
            this.pivotIDs = schema.pivotIDs;
        }
        console.log("Pick 1st point");
        let pivotPickObservable = new Observable<PointerEvent>((e) => {
            // pick pivot or create new one as poly's vertex
            let result = tourable.sceneObjectManager.pick(tourable);
            if (result && result.sceneObject instanceof Pivot){
                this.pivotIDs.push(result.sceneObject.id);
            } else {
                let newPivot = new Pivot(tourable, this.sceneID);
                newPivot.move(Mathematics.ScreenToWorldXZPlane(tourable, new Vector2(e.clientX, e.clientY), -1));
                this.pivotIDs.push(newPivot.id);
            }
            // state check
            if (this.pivotIDs.length == 1){ console.log(`Picked 1st point (2 left)`) }
            else if (this.pivotIDs.length == 2){ console.log(`Picked 2nd point (1 left)`) }
            else {
                console.log(`Last point picked, creating poly`);
                this.createMesh(tourable);
                // dispose observable
                pivotPickObservable.Dispose();
            }
        }, false)
        tourable.eventManager.mouse0.onButtonDownObservable.AddObservable(pivotPickObservable);
    }
    createMesh = (tourable:Tourable) => {
        let scene = tourable.sceneManager.scenes.get(this.sceneID);
        // create mesh
        this.mesh = new Mesh(this.id.toString(), scene);
        // create vertex data
        let positions:number[] = [];
        this.pivotIDs.forEach((id) => {
            let pivot = scene.sceneObjects.get(id) as Pivot;
            positions.push(pivot.mesh.position.x, pivot.mesh.position.y, pivot.mesh.position.z);
        })
        let indices = [0, 1, 2];
        let vertexData = new VertexData();
        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.applyToMesh(this.mesh);
        // create material
        let material = new StandardMaterial(this.id.toString(), scene);
        material.emissiveColor = new Color3(1, 1, 1);
        material.diffuseTexture = new Texture(tourable.config.assets.poly[0], scene);
        material.backFaceCulling = false;
        this.mesh.material = material;
        // set rendering group
        this.mesh.renderingGroupId = 1;
    }
    export = ():PolySchema => {
        return {
            id: this.id,
            sceneID: this.sceneID,
            type: this.type,
            pivotIDs: this.pivotIDs,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        }
    }
}