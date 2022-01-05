import { Vector3 } from "babylonjs";
import Tourable from "../../Tourable/Tourable";
import Mathematics from "../../Utilities/Mathematics/Mathematics";
import Hotspot, { HotspotSchema } from "./Hotspot";

export interface InfoHotspotSchema extends HotspotSchema {
    
}

export default class InfoHotspot extends Hotspot implements InfoHotspotSchema {
    type: "infoHotspot" = "infoHotspot";

    constructor( tourable:Tourable, sceneID:number, schema:InfoHotspotSchema = null){
        super(tourable, sceneID, schema)
        // create mesh
        this.createMesh(tourable, sceneID);
        if (tourable.loaded){
            this.hookEvents(tourable)
        } else {
            tourable.onLoadObservabl.Add(this._observableManager, () => {
                this.hookEvents(tourable)
            }, true)
        }
    }
    hookEvents = (tourable:Tourable) => {
        this.pointerEnterObservable.Add(this._observableManager, () => {
            // change cursor icon
            document.body.style.cursor = "pointer"
            // scale hotspot mesh
            this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
            // show bubble
            let titlePos = Mathematics.WorldToScreenPoint(tourable, this.mesh.position.add(new Vector3(this.originalScaling.x * tourable.config.infoHotspotSize * 1.1, this.originalScaling.y * tourable.config.infoHotspotSize * 1.1, 0)));
            tourable.gui.current.text.current.display(titlePos.x, titlePos.y, this.hoverTitle);
        }, false)
        this.pointerLeaveObservable.Add(this._observableManager, () => {
            // set cursor icon to default
            document.body.style.cursor = null;
            // unscale hotspot mesh
            this.scale(this.mesh.scaling, this.originalScaling, 150);
            // hide bubble popup
            tourable.gui.current.text.current.hide();
        }, false)
        // on click
        this.onClickObservable.Add(this._observableManager, () => {
            // show popup
            tourable.gui.current.popup.current.display(this.title);
        }, false)
        this.onRightClickObservable.Add(this._observableManager, () => {
            // show hotspot config
            tourable.gui.current.infoHotspotConfig.current.setTarget(this)
        }, false)
        // on mouse move
        this.pointerMoveObservable.Add(this._observableManager, (e) => {
            if (this.grabbing){
                this.sphericalGrab(tourable, e.clientX, e.clientY, true);
            }
        }, false)
    }
    export = ():InfoHotspotSchema => {
        return {
            type: this.type,
            id: this.id,
            sceneID: this.sceneID,
            targetSceneID: -1,
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