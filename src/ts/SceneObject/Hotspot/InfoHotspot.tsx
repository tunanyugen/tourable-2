import Tourable from "../../Tourable/Tourable";
import Hotspot, { HotspotSchema } from "./Hotspot";

export interface InfoHotspotSchema extends HotspotSchema {
    
}

export default class InfoHotspot extends Hotspot implements InfoHotspotSchema {
    constructor( tourable:Tourable, schema?:InfoHotspotSchema){
        super(tourable, SceneObjectType.infoHotspot, schema)
        this.loadSchema(tourable, schema);
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
    loadSchema: (tourable: Tourable, schema: InfoHotspotSchema) => void = (tourable: Tourable, schema: InfoHotspotSchema) => {
        this.loadHotspotSchema(tourable, schema);
    };
    export = ():InfoHotspotSchema => {
        let hotspotSchema = this.exportHotspot();
        return hotspotSchema;
    }
}