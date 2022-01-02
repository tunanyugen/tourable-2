import { Color3, MeshBuilder, StandardMaterial, Texture } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface PivotSchema extends SceneObjectSchema {
    texture:string;
}

export default class Pivot extends SceneObject implements PivotSchema {
    type: "pivot" = "pivot";
    protected _texture:string = "";
    get texture(){ return this._texture }
    set texture(val:string){
        this._texture = val;
         // creating material
         let newMaterial = new StandardMaterial(this.id.toString(), this.mesh.getScene());
         newMaterial.backFaceCulling = false;
         newMaterial.emissiveColor = new Color3(1, 1, 1);
         newMaterial.diffuseTexture = new Texture(this.texture, this.mesh.getScene());
         newMaterial.diffuseTexture.hasAlpha = true;
         newMaterial.useAlphaFromDiffuseTexture = true;
         // dispose old material
         if (this.mesh.material){ this.mesh.material.dispose() }
         // set new material
         this.mesh.material = newMaterial;
    }

    constructor(tourable:Tourable, sceneID:number, schema:PivotSchema = null){
        super(tourable, sceneID, schema)
        // load schema
        if (schema){
            this.texture = schema.texture;
        }
        this.createMesh(tourable, sceneID);
        this.hookEvents(tourable);
    }

    createMesh = (tourable:Tourable, sceneID:number) => {
        let scene = tourable.sceneManager.scenes.get(sceneID);
        // create plane using mesh builder
        this.mesh = MeshBuilder.CreatePlane(this.id.toString(), {
            size: tourable.config.pivotSize,
            updatable: true,
        }, scene);
        this.mesh.renderingGroupId = 1;
        // set texture
        this.texture = tourable.config.assets.pivot[0];
    }
    hookEvents = (tourable:Tourable) => {
        tourable.eventManager.onMouseMoveObservable.Add(() => {
            if (tourable.sceneManager.sceneToRender != this.mesh.getScene()){ return }
            // on pointer enter
            if (
                tourable.sceneObjectManager.lastHoverSceneObject != this &&
                tourable.sceneObjectManager.hoverSceneObject == this
            ){
                // change cursor icon
                document.body.style.cursor = "pointer"
                // scale hotspot mesh
                this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
            }
            // on pointer leave
            else if (
                tourable.sceneObjectManager.lastHoverSceneObject == this &&
                tourable.sceneObjectManager.hoverSceneObject != this
            ) {
                // set cursor icon to default
                document.body.style.cursor = null;
                // unscale hotspot mesh
                this.scale(this.mesh.scaling, this.originalScaling, 150);
            }
        }, false)
    }
    export = (): PivotSchema => {
        return {
            id: this.id,
            type: this.type,
            texture: this.texture,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        }
    }
}