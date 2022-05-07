import Config, { ConfigProps, ConfigState } from "./Config";
import { StandardMaterial, Vector3 } from "babylonjs";
import FloatingHotspot from "../../SceneObject/Hotspot/FloatingHotspot";
import MediaSelector from "../MediaSelector/MediaSelector";
import Label from "../Label/Label";
import { Box, Slider } from "@mui/material";
import CKEditor from "../CKEditor/CKEditor";

export interface FloatingHotspotConfigProps extends ConfigProps {}

export interface FloatingHotspotConfigState extends ConfigState {
    hotspotStyle: string;
    hoverTitle: string;
    clickTitle: string;
    scaling: number;
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
    syncSettings = () => {
        this.setState({
            hotspotStyle: this.target.texture,
            hoverTitle: this.target.hoverTitle,
            clickTitle: this.target.clickTitle,
            scaling: this.target.mesh.scaling.x * 50,
            targetSceneID: this.target.targetSceneId,
        })
    }
    applySettings = () => {
        // set style
        this.target.texture = this.state.hotspotStyle;
        // hover title
        this.target.hoverTitle = this.state.hoverTitle;
        // click title
        this.target.clickTitle = this.state.clickTitle;
        // scaling
        let value = parseInt(`${this.state.scaling}`) / 50;
        let scaling = new Vector3(value, value, value);
        this.target.mesh.scaling = scaling.clone();
        this.target.originalScaling = scaling.clone();
        // hotspot target scene
        if (this.state.targetSceneID >= 0){
            // set target scene
            this.target.setTargetSceneID(this.props.tourable, this.state.targetSceneID);
            // set entering angle
            // store hotspot in another reference so that it can be kept when target changes
            let hotspot = this.props.tourable.sceneManager.scenes
                .get(this.target.sceneId)
                .sceneObjects.get(this.target.id) as FloatingHotspot;
            // switch to target scene
            this.props.tourable.sceneManager.switchScene(this.props.tourable, this.target.targetSceneId);
            this.props.tourable.uncontrolledGUI.current.confirm.current.display(
                'Move to your desired angle and click "Confirm".',
                () => {
                    hotspot.enteringAngle = this.props.tourable.sceneManager.sceneToRender.camera.rotation;
                    this.props.tourable.sceneManager.switchScene(this.props.tourable, hotspot.sceneId);
                },
                () => {
                    this.props.tourable.sceneManager.switchScene(this.props.tourable, hotspot.sceneId);
                }
            );
        }
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
                        this.setState({
                            hotspotStyle: media.src
                        })
                    }}
                />
                <Label>Title on hover</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.state.hoverTitle || ""}
                    onBlur={(content) => {
                        this.setState({ hoverTitle: content });
                    }}
                />
                <Label>Title on click</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.state.clickTitle || ""}
                    onBlur={(content) => {
                        this.setState({ clickTitle: content });
                    }}
                />
                <Label>Resize hotspot</Label>
                <Slider
                    min={15}
                    max={100}
                    value={this.state.scaling || 0}
                    onChange={(e, sliderValue) => {
                        this.setState({scaling: sliderValue as number});
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
