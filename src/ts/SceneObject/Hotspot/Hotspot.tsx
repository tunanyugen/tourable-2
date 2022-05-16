import { Color3, MeshBuilder, StandardMaterial, Texture, Vector3 } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import SceneObject, { SceneObjectSchema } from "../SceneObject";

export interface HotspotSchema extends SceneObjectSchema {
    texture: string;
    targetSceneId: number;
    enteringAngle: Vector3 | { x: number; y: number; z: number };
}

export default abstract class Hotspot extends SceneObject implements HotspotSchema {
    //#region targetSceneId
    protected _targetSceneId: number = -1;
    get targetSceneId() {
        return this._targetSceneId.valueOf();
    }
    setTargetSceneID = (tourable: Tourable, value: number) => {
        let currentScene = tourable.scenes.get(value);
        this._targetSceneId = value;
        if (this.hoverTitle.length <= 0) {
            this.hoverTitle = tourable.panoramas.get(currentScene.panoramaId).name;
        }
    };
    //#endregion
    //#region enteringAngle
    protected _enteringAngle = new Vector3();
    get enteringAngle() {
        return this._enteringAngle.clone();
    }
    set enteringAngle(rotation: Vector3) {
        this._enteringAngle = rotation.clone();
    }
    //#endregion
    //#region texture
    protected _texture: string = "";
    get texture() {
        return this._texture;
    }
    set texture(val: string) {
        this._texture = val.valueOf();
        // creating material
        let newMaterial = new StandardMaterial(this.id.toString(), this.mesh.getScene());
        newMaterial.backFaceCulling = false;
        newMaterial.emissiveColor = new Color3(1, 1, 1);
        newMaterial.diffuseTexture = new Texture(this.texture, this.mesh.getScene());
        newMaterial.diffuseTexture.hasAlpha = true;
        newMaterial.useAlphaFromDiffuseTexture = true;
        // dispose old material
        if (this.mesh.material) {
            this.mesh.material.dispose();
        }
        // set new material
        this.mesh.material = newMaterial;
    }
    //#endregion
    
    constructor(tourable: Tourable, schema: HotspotSchema = null) {
        super(tourable, schema);
        this.createMesh(tourable);
    }

    private createMesh = (tourable: Tourable) => {
        let size = 1;
        let texture = "";
        let renderingGroupID = 0;
        switch (this.type) {
            case SceneObjectType.floatingHotspot:
                size = tourable.config.floatingHotspot.size;
                texture = tourable.config.assets.floatingHotspot[0];
                renderingGroupID = tourable.config.floatingHotspot.renderingGroupID;
                break;
            case SceneObjectType.floorHotspot:
                size = tourable.config.floorHotspot.size;
                texture = tourable.config.assets.floorHotspot[0];
                renderingGroupID = tourable.config.floorHotspot.renderingGroupID;
                break;
            case SceneObjectType.infoHotspot:
                size = tourable.config.infoHotspot.size;
                texture = tourable.config.assets.infoHotspot[0];
                renderingGroupID = tourable.config.infoHotspot.renderingGroupID;
                break;
        }
        // create plane using mesh builder
        this.mesh = MeshBuilder.CreatePlane(
            this.id.toString(),
            {
                size: size,
                updatable: true,
            },
            tourable.sceneManager.sceneToRender.scene
        );
        this.mesh.renderingGroupId = renderingGroupID;
        // set texture
        this.texture = texture;
    };
    exportHotspot: () => HotspotSchema = () => {
        let sceneObjectSchema = this.exportSceneObject() as HotspotSchema;
        sceneObjectSchema.texture = this._texture;
        sceneObjectSchema.targetSceneId = this._targetSceneId;
        sceneObjectSchema.enteringAngle = { x: this._enteringAngle.x, y: this._enteringAngle.y, z: this._enteringAngle.z };
        return sceneObjectSchema;
    };
    loadHotspotSchema: (tourable: Tourable, schema: HotspotSchema) => void = (tourable: Tourable, schema: HotspotSchema) => {
        this.loadSceneObjectSchema(tourable, schema);
        if (schema){
            this._texture = schema.texture;
            this._targetSceneId = schema.targetSceneId;
            this._enteringAngle = new Vector3(schema.enteringAngle.x, schema.enteringAngle.y, schema.enteringAngle.z);
        } else {
            this._texture = tourable.config.assets.floatingHotspot[0];
            this._targetSceneId = -1;
            this.enteringAngle = new Vector3();
        }
    };
    abstract loadSchema: (tourable: Tourable, schema: HotspotSchema) => void;
    abstract export: () => HotspotSchema;
}
