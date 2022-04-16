import Config, { ConfigProps, ConfigState } from "./Config";
import { StandardMaterial, Vector3 } from "babylonjs";
import FloatingHotspot from "../../SceneObject/Hotspot/FloatingHotspot";
import MediaSelector from "../MediaSelector/MediaSelector";
import Label from "../Label/Label";
import { Box, Slider } from "@mui/material";
import CKEditor from "../CKEditor/CKEditor";

export interface FloatingHotspotConfigProps extends ConfigProps {}

export interface FloatingHotspotConfigState extends ConfigState {
    hoverTitle: string;
    clickTitle: string;
    originalScaling: number;
    targetSceneID: number;
}

class FloatingHotspotConfig extends Config<FloatingHotspot, FloatingHotspotConfigProps, FloatingHotspotConfigState> {
    target: FloatingHotspot = null;
    constructor(props: FloatingHotspotConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit Hotspot",
            hidden: true,
            onClose: () => {
                this.hide();
            },
            onDelete: () => {
                if (!this.target) {
                    return;
                }
                this.target.dispose(this.props.tourable);
                this.hide();
            },
        };
    }
    applySettings = () => {
        // hover title
        this.target.hoverTitle = this.state.hoverTitle;
        console.log(this.target.hoverTitle);
        // click title
        this.target.clickTitle = this.state.clickTitle;
        // scaling
        let value = parseInt(`${this.state.originalScaling}`) / 50;
        let scaling = new Vector3(value, value, value);
        this.target.mesh.scaling = scaling.clone();
        this.target.originalScaling = scaling.clone();
        // hotspot target scene
        // set target scene
        this.target.setTargetSceneID(this.props.tourable, this.state.targetSceneID);
        // set entering angle
        // store hotspot in another reference so that it can be kept when target changes
        let hotspot = this.props.tourable.sceneManager.scenes
            .get(this.target.sceneID)
            .sceneObjects.get(this.target.id) as FloatingHotspot;
        // switch to target scene
        this.props.tourable.sceneManager.switchScene(this.props.tourable, this.target.targetSceneID);
        this.props.tourable.uncontrolledGUI.current.confirm.current.display(
            'Move to your desired angle and click "Confirm".',
            () => {
                hotspot.enteringAngle = this.props.tourable.sceneManager.sceneToRender.camera.rotation;
                this.props.tourable.sceneManager.switchScene(this.props.tourable, hotspot.sceneID);
            },
            () => {
                this.props.tourable.sceneManager.switchScene(this.props.tourable, hotspot.sceneID);
            }
        );
    }
    renderComponents = () => {
        return (
            <Box>
                <Label>Choose the style of the hotspot</Label>
                <MediaSelector
                    medias={this.props.tourable.config.assets.floatingHotspot.map((src) => {
                        return { src };
                    })}
                    defaultValue={this.target ? (this.target.mesh.material as StandardMaterial).diffuseTexture._texture.url : ""}
                    onSelect={(media) => {
                        if (!this.target) {
                            return;
                        }
                        this.target.texture = media.src;
                        // update to see texture change effect
                        this.forceUpdate();
                    }}
                />
                <Label>Title on hover</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.state.hoverTitle || ""}
                    onChange={(content) => {
                        this.setState({ hoverTitle: content });
                    }}
                />
                <Label>Title on click</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.state.clickTitle || ""}
                    onChange={(content) => {
                        this.setState({ clickTitle: content });
                    }}
                />
                <Label>Resize hotspot</Label>
                <Slider
                    min={15}
                    max={100}
                    value={this.state.originalScaling || 0}
                    onChange={(e, sliderValue) => {
                        this.setState({originalScaling: this.state.originalScaling * 50});
                    }}
                />
                <Label>Pick a scene</Label>
                <MediaSelector
                    medias={Array.from(this.props.tourable.sceneManager.scenes).map(([id, scene]) => {
                        return {
                            label: scene.panorama.name,
                            src: scene.panorama.thumbnail,
                            onSelect: () => {
                                this.setState({targetSceneID: scene.id});
                            },
                        };
                    })}
                />
            </Box>
        );
    };
}

export default FloatingHotspotConfig;
