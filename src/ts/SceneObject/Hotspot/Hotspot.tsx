import { Color3, MeshBuilder, Quaternion, StandardMaterial, Texture, Vector3 } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, {SceneObjectSchema} from "../SceneObject";

export interface HotspotSchema extends SceneObjectSchema{
    texture:string;
    targetSceneID:number;
    enteringAngle:Vector3|{x:number,y:number,z:number};
}

export default abstract class Hotspot extends SceneObject implements HotspotSchema{
    protected _targetSceneID:number = -1;
    get targetSceneID(){ return this._targetSceneID.valueOf() }
    protected _enteringAngle = new Vector3();
    get enteringAngle(){ return this._enteringAngle.clone() }
    set enteringAngle(rotation:Vector3){ this._enteringAngle = rotation.clone() }
    setTargetSceneID = (tourable:Tourable, value:number) => {
        let currentScene = tourable.sceneManager.scenes.get(value);
        this._targetSceneID = value;
        if (this.hoverTitle.length <= 0){
            this.hoverTitle = currentScene.panorama.name;
        }
    }
    protected _texture:string = "";
    get texture(){ return this._texture }
    set texture(val:string){
        this._texture = val.valueOf();
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
            this.enteringAngle = schema.enteringAngle ? new Vector3(schema.enteringAngle.x, schema.enteringAngle.y, schema.enteringAngle.z) : new Vector3();
            this.hoverTitle = schema.hoverTitle;
            tourable.onLoadObservable.Add(this._observableManager, () => {
                this.texture = schema.texture;
            }, true)
        }
    }

    createMesh = (tourable:Tourable, sceneID:number) => {
        let scene = tourable.sceneManager.scenes.get(sceneID);
        let size = 1;
        let texture = "";
        let renderingGroupID = 0;
        switch(this.type){
            case "floatingHotspot":
                size = tourable.config.floatingHotspot.size;
                texture = tourable.config.assets.floatingHotspot[0];
                renderingGroupID = tourable.config.floatingHotspot.renderingGroupID;
                break;
            case "floorHotspot":
                size = tourable.config.floorHotspot.size;
                texture = tourable.config.assets.floorHotspot[0];
                renderingGroupID = tourable.config.floorHotspot.renderingGroupID;
                break;
            case "infoHotspot":
                size = tourable.config.infoHotspot.size;
                texture = tourable.config.assets.infoHotspot[0];
                renderingGroupID = tourable.config.infoHotspot.renderingGroupID;
                break;
        }
        // create plane using mesh builder
        this.mesh = MeshBuilder.CreatePlane(this.id.toString(), {
            size: size,
            updatable: true,
        }, scene);
        this.mesh.renderingGroupId = renderingGroupID;
        // set texture
        this.texture = texture;
    }
    abstract export:() => HotspotSchema
}