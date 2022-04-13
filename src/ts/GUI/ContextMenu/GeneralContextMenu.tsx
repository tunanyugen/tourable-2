import ContextMenu, { ContextMenuItemProps, ContextMenuProps, ContextMenuState } from "./ContextMenu";
import FloorHotspot from "../../SceneObject/Hotspot/FloorHotspot";
import { Vector2, Vector3 } from "babylonjs";
import FloatingHotspot from "../../SceneObject/Hotspot/FloatingHotspot";
import InfoHotspot from "../../SceneObject/Hotspot/InfoHotspot";
import Pivot from "../../SceneObject/Pivot/Pivot";
import Mathematics from "../../Utilities/Mathematics/Mathematics";
import Poly from "../../SceneObject/Poly/Poly";

export interface GeneralContextMenuProps extends ContextMenuProps {}

export interface GeneralContextMenuState extends ContextMenuState {}

class GeneralContextMenu extends ContextMenu<GeneralContextMenuProps, GeneralContextMenuState> {
    constructor(props: GeneralContextMenuProps) {
        super(props);
        // toggle
        this.props.tourable.onLoadObservable.Add(
            this._observableManager,
            () => {
                this.props.tourable.eventManager.mouse2.onButtonUpObservable.Add(
                    this._observableManager,
                    (e) => {
                        let result = this.props.tourable.sceneObjectManager.pick(this.props.tourable);
                        if (!result) {
                            this.move(e.clientX, e.clientY);
                            if (!this.state.hidden) {
                                this.hide(() => {
                                    setTimeout(() => {
                                        this.show();
                                    }, 250);
                                });
                            } else {
                                this.show();
                            }
                        }
                    },
                    false
                );
            },
            true
        );
        // default state
        this.state = {
            ...this.state,
            items: [
                {
                    icon: () => "",
                    name: "Global config",
                    onSelect: () => {
                        this.props.tourable.editorGUI.current.globalConfig.current.show();
                    },
                },
                {
                    icon: () => "",
                    name: "Scene",
                    children: [
                        {
                            icon: () => "",
                            name: "Create scene",
                            onSelect: () => {
                                let newScene = this.props.tourable.sceneManager.createDefaultScene(this.props.tourable);
                                this.props.tourable.sceneManager.switchScene(this.props.tourable, newScene.id);
                            },
                        },
                        {
                            icon: () => "",
                            name: "Config scene",
                            onSelect: () => {
                                this.props.tourable.editorGUI.current.sceneConfig.current.show();
                            },
                        },
                    ],
                },
                {
                    icon: () => "",
                    name: "Hotspot",
                    children: [
                        {
                            icon: () => "",
                            name: "Create floor hotspot",
                            onSelect: () => {
                                let camera = this.props.tourable.sceneManager.sceneToRender.camera;
                                let hotspot = new FloorHotspot(
                                    this.props.tourable,
                                    this.props.tourable.sceneManager.sceneToRender.id
                                );
                                let screenPos = new Vector2(
                                    this.props.tourable.sceneManager.sceneToRender.pointerX,
                                    this.props.tourable.sceneManager.sceneToRender.pointerY
                                );
                                hotspot.move(Mathematics.ScreenToWorldXZPlane(this.props.tourable, screenPos, -1));
                                hotspot.mesh.rotation.y = camera.absoluteRotation.toEulerAngles().y;
                            },
                        },
                        {
                            icon: () => "",
                            name: "Create floating hotspot",
                            onSelect: () => {
                                let camera = this.props.tourable.sceneManager.sceneToRender.camera;
                                let hotspot = new FloatingHotspot(
                                    this.props.tourable,
                                    this.props.tourable.sceneManager.sceneToRender.id
                                );
                                let screenPos = new Vector2(
                                    this.props.tourable.sceneManager.sceneToRender.pointerX,
                                    this.props.tourable.sceneManager.sceneToRender.pointerY
                                );
                                hotspot.move(Mathematics.ScreenToWorldPoint(this.props.tourable, screenPos, 1));
                                hotspot.mesh.lookAt(camera.getDirection(Vector3.Forward()).negate());
                            },
                        },
                        {
                            icon: () => "",
                            name: "Create info hotspot",
                            onSelect: () => {
                                let camera = this.props.tourable.sceneManager.sceneToRender.camera;
                                let hotspot = new InfoHotspot(
                                    this.props.tourable,
                                    this.props.tourable.sceneManager.sceneToRender.id
                                );
                                let screenPos = new Vector2(
                                    this.props.tourable.sceneManager.sceneToRender.pointerX,
                                    this.props.tourable.sceneManager.sceneToRender.pointerY
                                );
                                hotspot.move(Mathematics.ScreenToWorldPoint(this.props.tourable, screenPos, 1));
                                hotspot.mesh.lookAt(camera.getDirection(Vector3.Forward()).negate());
                            },
                        },
                    ],
                },
                {
                    icon: () => "",
                    name: "Poly",
                    onSelect: () => {
                        new Poly(this.props.tourable, this.props.tourable.sceneManager.sceneToRender.id);
                    },
                },
                {
                    icon: () => "",
                    name: "Pivot",
                    onSelect: () => {
                        let camera = this.props.tourable.sceneManager.sceneToRender.camera;
                        let pivot = new Pivot(this.props.tourable, this.props.tourable.sceneManager.sceneToRender.id);
                        let screenPos = new Vector2(
                            this.props.tourable.sceneManager.sceneToRender.pointerX,
                            this.props.tourable.sceneManager.sceneToRender.pointerY
                        );
                        pivot.move(Mathematics.ScreenToWorldXZPlane(this.props.tourable, screenPos, -1));
                        pivot.mesh.lookAt(camera.getDirection(Vector3.Forward()).negate());
                    },
                },
            ],
            hidden: true,
        };
    }
}

export default GeneralContextMenu;
