import { Color3, MeshBuilder, StandardMaterial, Texture } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, {SceneObjectSchema} from "../SceneObject";

export interface HotspotSchema extends SceneObjectSchema{
    texture:string;
    targetSceneID:number;
    title:string;
}

export default abstract class Hotspot extends SceneObject implements HotspotSchema{
    protected _targetSceneID:number = -1;
    get targetSceneID(){ return this._targetSceneID }
    setTargetSceneID = (tourable:Tourable, value:number) => {
        let lastScene = tourable.sceneManager.scenes.get(this.targetSceneID);
        let currentScene = tourable.sceneManager.scenes.get(value);
        this._targetSceneID = value;
        if ((lastScene && this.title == lastScene.panorama.name) || this.title.length <= 0){
            this.title = currentScene.panorama.name;
        }
    }
    title: string = "";
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

    constructor(tourable:Tourable, sceneID:number, schema:HotspotSchema = null){
        super(tourable, sceneID, schema);
        if (schema){
            this._targetSceneID = schema.targetSceneID;
            this.title = schema.title;
            tourable.onLoadObservabl.Add(() => {
                this.texture = schema.texture;
            }, true)
        }
    }

    createMesh = (tourable:Tourable, sceneID:number) => {
        let scene = tourable.sceneManager.scenes.get(sceneID);
        // create plane using mesh builder
        this.mesh = MeshBuilder.CreatePlane(this.id.toString(), {
            size: tourable.config.floorHotspotSize,
            updatable: true,
        }, scene);
        this.mesh.renderingGroupId = 1;
        // set texture
        this.texture = tourable.config.assets.floorHotspot[0];
    }
    abstract export:() => HotspotSchema
}