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
                let titlePos = Mathematics.WorldToScreenPoint(tourable, this.mesh.position.add(new Vector3(0, this.originalScaling.y / 10, 0)));
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
        // show hotspot config
        tourable.eventManager.mouse2.onButtonDownObservable.Add(() => {
            if (tourable.sceneManager.sceneToRender != this.mesh.getScene()){ return }
            if (tourable.sceneObjectManager.hoverSceneObject == this){
                tourable.gui.current.infoHotspotConfig.current.setTarget(this)
            }
        }, false)
    }
    export = () => {
        return {
            type: this.type,
            id: this.id,
            texture: this.texture,
            title: this.title,
            originalScaling: {x: this.originalScaling.x, y: this.originalScaling.y, z: this.originalScaling.z},
            mesh: {
                position: {x: this.mesh.position.x, y: this.mesh.position.y, z: this.mesh.position.z},
                rotation: {x: this.mesh.rotation.x, y: this.mesh.rotation.y, z: this.mesh.rotation.z},
                scaling: {x: this.mesh.scaling.x, y: this.mesh.scaling.y, z: this.mesh.scaling.z},
            }
        } as InfoHotspotSchema
    }
}