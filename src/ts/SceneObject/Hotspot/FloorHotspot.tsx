import Tourable from "../../Tourable/Tourable";
import Hotspot, { HotspotSchema } from "./Hotspot";

export interface FloorHotspotSchema extends HotspotSchema {}

export default class FloorHotspot extends Hotspot implements FloorHotspotSchema {
    constructor(tourable: Tourable, schema: FloorHotspotSchema = null) {
        super(tourable, SceneObjectType.floorHotspot, schema);
        this.loadSchema(tourable, schema);
        this.mesh.rotation.x = Math.PI / 2;

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
                // change cursor icon
                document.body.style.cursor = "pointer";
                // scale hotspot mesh
                this.scale(this.mesh.scaling, this.mesh.scaling.multiplyByFloats(1.1, 1.1, 1.1), 150);
            },
            false
        );
        this.pointerLeaveObservable.Add(
            this._observableManager,
            () => {
                // changed cursor back to default icon
                document.body.style.cursor = null;
                // unscale hotspot mesh
                this.scale(this.mesh.scaling, this.originalScaling, 150);
            },
            false
        );
        // on click
        this.onClickObservable.Add(
            this._observableManager,
            () => {
                // switch scene
                tourable.sceneManager.switchScene(tourable, this._targetSceneId, this.id);
            },
            false
        );
        // on right click
        this.onRightClickObservable.Add(
            this._observableManager,
            () => {
                // show confingurations
                tourable.editorGUI.current.floorHotspotConfig.current.setTarget(this);
            },
            false
        );
        // on mouse move
        this.pointerMoveObservable.Add(
            this._observableManager,
            (e) => {
                if (this.grabbing) {
                    this.grab(tourable, e.clientX, e.clientY, true, false, true);
                }
            },
            false
        );
    };
    loadSchema = (tourable: Tourable, schema: FloorHotspotSchema) => {
        this.loadHotspotSchema(tourable, schema);
    };
    export = (): FloorHotspotSchema => {
        let hotspotSchema = this.exportHotspot() as FloorHotspotSchema;
        return hotspotSchema;
    };
}
