import Config, { ConfigProps, ConfigState } from "./Config";
import FloorHotspot from "../../SceneObject/Hotspot/FloorHotspot";
import MediaSelector from "../MediaSelector/MediaSelector";
import Label from "../Label/Label";
import { Box } from "@mui/material";
import CKEditor from "../CKEditor/CKEditor";

export interface FloorHotspotConfigProps extends ConfigProps {}

export interface FloorHotspotConfigState extends ConfigState {
    hotspotStyle: string;
    hoverTitle: string;
    clickTitle: string;
    targetSceneID: number;
}

class FloorHotspotConfig extends Config<FloorHotspot, FloorHotspotConfigProps, FloorHotspotConfigState> {
    target: FloorHotspot = null;
    constructor(props: FloorHotspotConfigProps) {
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
            targetSceneID: this.target.targetSceneID,
        })
    }
    applySettings = () => {
        this.target.texture = this.state.hotspotStyle;
        this.target.hoverTitle = this.state.hoverTitle;
        this.target.clickTitle = this.state.clickTitle;
        this.target.setTargetSceneID(this.props.tourable, this.state.targetSceneID);
    };
    renderComponents = () => {
        return (
            <Box>
                <Label>Choose the style of the hotspot</Label>
                <MediaSelector
                    medias={this.props.tourable.config.assets.floorHotspot.map((src) => {
                        return { src };
                    })}
                    defaultValue={this.state.hotspotStyle || ""}
                    onSelect={(media) => {
                        this.setState({ hotspotStyle: media.src })
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
                        this.setState({clickTitle: content})
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

export default FloorHotspotConfig;
