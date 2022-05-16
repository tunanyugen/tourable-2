import Tourable from "../../Tourable/Tourable";
import Hotspot, { HotspotSchema } from "./Hotspot";

export interface FloatingHotspotSchema extends HotspotSchema {}

export default class FloatingHotspot extends Hotspot implements FloatingHotspotSchema {
    constructor(tourable: Tourable, schema?: FloatingHotspotSchema) {
        super(tourable, SceneObjectType.floatingHotspot, schema);
        this.loadSchema(tourable, schema);
        if (tourable.loaded) {
            this.hookEvents(tourable);
        } else {
            tourable.onLoadObservable.Add(
                this._observableManager,
                () => {
                    this.hookEvents(tourable);
                },
                true
            );
        }
    }
    hookEvents = (tourable: Tourable) => {
        this.pointerEnterObservable.Add(
            this._observableManager,
            () => {
                // scale hotspot mesh
                this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
            },
            false
        );
        this.pointerLeaveObservable.Add(
            this._observableManager,
            () => {
                // unscale hotspot mesh
                this.scale(this.mesh.scaling, this.originalScaling, 150);
            },
            false
        );
        this.onClickObservable.Add(
            this._observableManager,
            () => {
                // switch scene
                tourable.sceneManager.switchScene(tourable, this._targetSceneId, this.id);
            },
            false
        );
        this.onRightClickObservable.Add(
            this._observableManager,
            () => {
                // show configurations
                tourable.editorGUI.current.floatingHotspotConfig.current.setTarget(this);
            },
            false
        );
        // on mouse move
        this.pointerMoveObservable.Add(
            this._observableManager,
            (e) => {
                if (this.grabbing) {
                    this.sphericalGrab(tourable, e.clientX, e.clientY, true);
                }
            },
            false
        );
    };
    loadSchema = (tourable: Tourable, schema: FloatingHotspotSchema) => {
        this.loadHotspotSchema(tourable, schema);
    };
    export = (): FloatingHotspotSchema => {
        let hotspotSchema = this.exportHotspot();
        return hotspotSchema;
    };
}
