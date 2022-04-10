import Tourable from "../../Tourable/Tourable";
import Hotspot, { HotspotSchema } from "./Hotspot";

export interface FloorHotspotSchema extends HotspotSchema {
    
}

export default class FloorHotspot extends Hotspot implements FloorHotspotSchema {
    type:"floorHotspot" = "floorHotspot";

    constructor( tourable:Tourable, sceneID:number, schema:FloorHotspotSchema = null){
        super(tourable, sceneID, schema)
        // create mesh
        this.createMesh(tourable, sceneID);
        this.mesh.rotation.x = Math.PI / 2;
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
            // changed cursor back to default icon
            document.body.style.cursor = null
            // unscale hotspot mesh
            this.scale(this.mesh.scaling, this.originalScaling, 150);
        }, false)
        // on click
        this.onClickObservable.Add(this._observableManager, () => {
            // switch scene
            tourable.sceneManager.switchScene(tourable, this._targetSceneID, this.id)
        }, false)
        // on right click
        this.onRightClickObservable.Add(this._observableManager, () => {
            // show confingurations
            tourable.editorGUI.current.floorHotspotConfig.current.setTarget(this)
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