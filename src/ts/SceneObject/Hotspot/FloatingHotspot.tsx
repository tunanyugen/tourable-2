import Tourable from "../../Tourable/Tourable";
import Hotspot, { HotspotSchema } from "./Hotspot";

export interface FloatingHotspotSchema extends HotspotSchema {
    
}

export default class FloatingHotspot extends Hotspot implements FloatingHotspotSchema {
    type: "floatingHotspot" = "floatingHotspot";

    constructor( tourable:Tourable, sceneID:number, schema:FloatingHotspotSchema = null){
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
            // scale hotspot mesh
            this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
        }, false)
        this.pointerLeaveObservable.Add(this._observableManager, () => {
            // unscale hotspot mesh
            this.scale(this.mesh.scaling, this.originalScaling, 150);
        }, false)
        this.onClickObservable.Add(this._observableManager, () => {
            // switch scene
            tourable.sceneManager.switchScene(tourable, this._targetSceneID, this.id)
        }, false)
        this.onRightClickObservable.Add(this._observableManager, () => {
            // show configurations
            tourable.editorGUI.current.floatingHotspotConfig.current.setTarget(this)
        }, false)
        // on mouse move
        this.pointerMoveObservable.Add(this._observableManager, (e) => {
            if (this.grabbing){
                this.sphericalGrab(tourable, e.clientX, e.clientY, true);
            }
        }, false)
    }
    export = ():FloatingHotspotSchema => {
        return {
            type: this.type,
            id: this.id,
            sceneID: this.sceneID,
            targetSceneID: this.targetSceneID,
            enteringAngle: {x: this.enteringAngle.x, y: this.enteringAngle.y, z: this.enteringAngle.z},
            texture: this.texture,
            hoverTitle: this.hoverTitle,
            clickTitle: this.clickTitle,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        }
    }
}