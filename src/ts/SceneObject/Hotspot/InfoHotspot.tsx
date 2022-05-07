import Tourable from "../../Tourable/Tourable";
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
            tourable.onLoadObservable.Add(this._observableManager, () => {
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
        }, false)
        this.pointerLeaveObservable.Add(this._observableManager, () => {
            // set cursor icon to default
            document.body.style.cursor = null;
            // unscale hotspot mesh
            this.scale(this.mesh.scaling, this.originalScaling, 150);
        }, false)
        this.onRightClickObservable.Add(this._observableManager, () => {
            // show hotspot config
            tourable.editorGUI.current.infoHotspotConfig.current.setTarget(this)
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
            sceneId: this.sceneId,
            targetSceneID: this.targetSceneID,
            enteringAngle: {x: this.enteringAngle.x, y: this.enteringAngle.y, z: this.enteringAngle.z},
            texture: this.texture,
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