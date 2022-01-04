import { Vector3 } from "babylonjs";
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
        // load schema
        if (schema){
            this.backFloorHotspotID = schema.backFloorHotspotID;
        }
        // create mesh
        this.createMesh(tourable, sceneID);
        this.mesh.rotation.x = Math.PI / 2;
        if (tourable.loaded){
            this.hookEvents(tourable)
        } else {
            tourable.onLoadObservabl.Add(this._observableManager, () => {
                this.hookEvents(tourable)
            }, true)
        }
    }
    createBackHotspot = (tourable:Tourable) => {
        // dispose old back hotspot
        let backFloorHotspotScene = tourable.sceneManager.scenes.get(this._targetSceneID);
        if (backFloorHotspotScene){
            let hotspot = backFloorHotspotScene.sceneObjects.get(this.backFloorHotspotID);
            if (hotspot){ hotspot.dispose(tourable) }
        }
        // create new one
        let backHotspot = new FloorHotspot(tourable, this._targetSceneID);
        this.backFloorHotspotID = backHotspot.id;
        backHotspot.texture = this.texture;
        backHotspot._targetSceneID = tourable.sceneManager.sceneToRender.id;
        backHotspot.title = tourable.sceneManager.sceneToRender.panorama.name;
        let position = this.mesh.position.clone().negate();
        position.y = this.mesh.position.y;
        backHotspot.move(position);
        backHotspot.mesh.rotation.y = this.mesh.rotation.clone().y + Math.PI;
    }
    hookEvents = (tourable:Tourable) => {
        this.pointerEnterObservable.Add(this._observableManager, () => {
            // change cursor icon
            document.body.style.cursor = "pointer"
            // scale hotspot mesh
            this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
            // show bubble popup
            let titlePos = Mathematics.WorldToScreenPoint(tourable, this.mesh.position.add(new Vector3(0, this.originalScaling.y * tourable.config.floorHotspotSize * 1.1, 0)));
            tourable.gui.current.text.current.display(titlePos.x, titlePos.y, this.hoverTitle);
        }, false)
        this.pointerLeaveObservable.Add(this._observableManager, () => {
            // changed cursor back to default icon
            document.body.style.cursor = null
            // unscale hotspot mesh
            this.scale(this.mesh.scaling, this.originalScaling, 150);
            // hide bubble popup
            tourable.gui.current.text.current.hide();
        }, false)
        // on click
        this.onClickObservable.Add(this._observableManager, () => {
            // switch scene
            if (tourable.sceneObjectManager.hoverSceneObject == this){
                tourable.sceneManager.switchScene(tourable, this._targetSceneID, this.id)
            }
        }, false)
        // on right click
        this.onRightClickObservable.Add(this._observableManager, () => {
            // show confingurations
            if (tourable.sceneObjectManager.hoverSceneObject == this){
                tourable.gui.current.floorHotspotConfig.current.setTarget(this)
            }
        }, false)
        // on mouse move
        this.pointerMoveObservable.Add(this._observableManager, (e) => {
            if (this.grabbing){
                this.grab(tourable, e.clientX, e.clientY, true, false, true)
            }
        }, false)
    }
    export = ():FloorHotspotSchema => {
        return {
            type: this.type,
            id: this.id,
            sceneID: this.sceneID,
            backFloorHotspotID: this.backFloorHotspotID,
            targetSceneID: this.targetSceneID,
            texture: this.texture,
            hoverTitle: this.hoverTitle,
            title: this.title,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        }
    }
}