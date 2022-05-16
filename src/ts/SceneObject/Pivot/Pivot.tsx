import { Color3, MeshBuilder, StandardMaterial, Texture } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface PivotSchema extends SceneObjectSchema {
    texture:string;
}

export default class Pivot extends SceneObject implements PivotSchema {
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
         newMaterial.alpha = 0.55;
         // dispose old material
         if (this.mesh.material){ this.mesh.material.dispose() }
         // set new material
         this.mesh.material = newMaterial;
    }

    constructor(tourable:Tourable, schema?:PivotSchema){
        super(tourable, SceneObjectType.pivot, schema)
        this.loadSchema(tourable, schema);
        this.hookEvents(tourable);
        // look at camera
        this.moveObservable.Add(this._observableManager, () => {
            this.mesh.lookAt(this.mesh.getScene().activeCamera.position);
        }, false)
    }

    createMesh = (tourable:Tourable, sceneID:number) => {
        let scene = tourable.scenes.get(sceneID).scene;
        // create plane using mesh builder
        this.mesh = MeshBuilder.CreatePlane(this.id.toString(), {
            size: tourable.config.pivot.size,
            updatable: true,
        }, scene);
        // set rendering group
        this.mesh.renderingGroupId = tourable.config.pivot.renderingGroupID;
    }
    hookEvents = (tourable:Tourable) => {
        this.pointerEnterObservable.Add(this._observableManager, () => {
            // change cursor icon
            document.body.style.cursor = "pointer"
        }, false)
        this.pointerLeaveObservable.Add(this._observableManager, () => {
            // set cursor icon to default
            document.body.style.cursor = null;
        }, false)
        // on right click
        this.onRightClickObservable.Add(this._observableManager, () => {
            tourable.editorGUI.current.pivotConfig.current.setTarget(this)
        }, false)
        // on mouse move
        this.pointerMoveObservable.Add(this._observableManager, (e) => {
            if (this.grabbing){
                this.grab(tourable, e.clientX, e.clientY, true, false, true)
            }
        }, false)
    }
    loadSchema = (tourable:Tourable, schema: PivotSchema) => {
        if (!schema){
            this.texture = tourable.config.assets.pivot[0];
            this.createMesh(tourable, tourable.sceneManager.sceneToRender.id);
        } else {
            this._texture = schema.texture;
            this.createMesh(tourable, schema.sceneId);
        }
    }
    export = (): PivotSchema => {
        let sceneObjectSchema = this.exportSceneObject() as PivotSchema;
        sceneObjectSchema.texture = this._texture;
        return sceneObjectSchema;
    }
}