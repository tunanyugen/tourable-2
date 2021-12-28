import { MeshBuilder, Vector3 } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import Mathematics from "../../Utilities/Mathematics/Mathematics";
import Hotspot, { HotspotSchema } from "./Hotspot";

export interface FloorHotspotSchema extends HotspotSchema {
    backFloorHotspotID:number;
}

export default class FloorHotspot extends Hotspot implements FloorHotspotSchema {
    type:"floorHotspot" = "floorHotspot";
    backFloorHotspotID: number = -1;

    constructor( tourable:Tourable, sceneID:number, schema:FloorHotspotSchema = null){
        super(tourable, sceneID, schema)
        // set default values
        if (schema){
            this.backFloorHotspotID = schema.backFloorHotspotID;
        }
        // constructor
        tourable.sceneManager.scenes.get(sceneID).sceneObjects.set(this.id, this);
        // create mesh
        this.createMesh(tourable, sceneID);
        this.mesh.position.y = -1;
        this.mesh.rotation.x = Math.PI / 2;
        // load mesh transforms
        if (schema){
            this.mesh.position = new Vector3(schema.mesh.position.x, schema.mesh.position.y, schema.mesh.position.z)
            this.mesh.rotation = new Vector3(schema.mesh.rotation.x, schema.mesh.rotation.y, schema.mesh.rotation.z)
            this.mesh.scaling = new Vector3(schema.mesh.scaling.x, schema.mesh.scaling.y, schema.mesh.scaling.z)
        }
        if (tourable.loaded){
            this.hookEvents(tourable)
        } else {
            tourable.onLoadObservabl.Add(() => {
                this.hookEvents(tourable)
            }, true)
        }
    }
    createBackHotspot = (tourable:Tourable) => {
        // dispose old back hotspot
        let backFloorHotspotScene = tourable.sceneManager.scenes.get(this._targetSceneID);
        if (backFloorHotspotScene){
            let hotspot = backFloorHotspotScene.sceneObjects.get(this.backFloorHotspotID);
            if (hotspot){ hotspot.dispose() }
        }
        // create new one
        let backHotspot = new FloorHotspot(tourable, this._targetSceneID);
        this.backFloorHotspotID = backHotspot.id;
        backHotspot.texture = this.texture;
        backHotspot._targetSceneID = tourable.sceneManager.sceneToRender.id;
        backHotspot.title = tourable.sceneManager.sceneToRender.panorama.name;
        let position = this.mesh.position.clone().negate();
        position.y = this.mesh.position.y;
        backHotspot.mesh.position = position;
        backHotspot.mesh.rotation.y = this.mesh.rotation.clone().y + Math.PI;
    }
    hookEvents = (tourable:Tourable) => {
        tourable.eventManager.onMouseMoveObservable.Add(() => {
            if (tourable.sceneManager.sceneToRender != this.mesh.getScene()){ return }
            // change cursor icon, show title and scale
            if (
                tourable.sceneObjectManager.lastHoverSceneObject != this &&
                tourable.sceneObjectManager.hoverSceneObject == this
            ){
                document.body.style.cursor = "pointer"
                this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
                let titlePos = Mathematics.WorldToScreenPoint(tourable, this.mesh.position.add(new Vector3(0, tourable.config.floorHotspotSize, 0)));
                tourable.gui.current.text.current.display(titlePos.x, titlePos.y, this.title);
            }
            // change cursor icon, hide title, unscale
            else if (
                tourable.sceneObjectManager.lastHoverSceneObject == this &&
                tourable.sceneObjectManager.hoverSceneObject != this
            ) {
                document.body.style.cursor = null
                this.scale(this.mesh.scaling, this.originalScaling, 150);
                tourable.gui.current.text.current.hide();
            }
        }, false)
        // switch scene on click
        tourable.eventManager.mouse0.onButtonDownObservable.Add(() => {
            if (tourable.sceneManager.sceneToRender != this.mesh.getScene()){ return }
            if (tourable.sceneObjectManager.hoverSceneObject == this){
                tourable.sceneManager.switchScene(tourable, this._targetSceneID, this.id)
            }
        }, false)
        // show floor hotspot config
        tourable.eventManager.mouse2.onButtonDownObservable.Add(() => {
            if (tourable.sceneManager.sceneToRender != this.mesh.getScene()){ return }
            if (tourable.sceneObjectManager.hoverSceneObject == this){
                tourable.gui.current.floorHotspotConfig.current.setTarget(this)
            }
        }, false)
    }
    export = () => {
        return {
            type: this.type,
            id: this.id,
            backFloorHotspotID: this.backFloorHotspotID,
            targetSceneID: this.targetSceneID,
            texture: this.texture,
            title: this.title,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        } as FloorHotspotSchema
    }
}