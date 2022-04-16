import Config, { ConfigProps, ConfigState } from "./Config";
import { StandardMaterial, Vector3 } from "babylonjs";
import InfoHotspot from "../../SceneObject/Hotspot/InfoHotspot";
import { Paper, Slider } from "@mui/material";
import CKEditor from "../CKEditor/CKEditor";
import MediaSelector from "../MediaSelector/MediaSelector";
import Label from "../Label/Label";

export interface InfoHotspotConfigProps extends ConfigProps {}

export interface InfoHotspotConfigState extends ConfigState {
    hotspotStyle: string;
    originalScaling: number;
    hoverTitle: string;
    clickTitle: string;
}

class InfoHotspotConfig extends Config<InfoHotspot, InfoHotspotConfigProps, InfoHotspotConfigState> {
    target: InfoHotspot = null;
    constructor(props: InfoHotspotConfigProps) {
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
    syncSettings = () => {}
    applySettings = () => {
        this.target.texture = this.state.hotspotStyle;   
    }
    renderComponents = () => {
        return (
            <Paper className="tourable__info-hotspot-config">
                <Label>Choose the style of the hotspot</Label>
                <MediaSelector
                    medias={this.props.tourable.config.assets.infoHotspot.map((src) => {
                        return { src };
                    })}
                    defaultValue={this.target ? (this.target.mesh.material as StandardMaterial).diffuseTexture._texture.url : ""}
                    onSelect={(media) => {
                        this.setState({hotspotStyle: media.src})
                    }}
                />
                <Label>Scaling</Label>
                <Slider
                    min={15}
                    max={100}
                    defaultValue={this.target ? this.target.originalScaling.x * 50 : 50}
                    onChange={(e, sliderValue) => {
                        if (!this.target) {
                            return;
                        }
                        let value = parseInt(`${sliderValue as number}`) / 50;
                        let scaling = new Vector3(value, value, value);
                        this.target.mesh.scaling = scaling.clone();
                        this.target.originalScaling = scaling.clone();
                    }}
                />
                <Label>Title on hover</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.hoverTitle : ""}
                    onBlur={(content) => {
                        if (!this.target) {
                            return;
                        }
                        this.target.hoverTitle = content;
                    }}
                />
                <Label>Title on click</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.clickTitle : ""}
                    onBlur={(content) => {
                        if (!this.target) {
                            return;
                        }
                        this.target.clickTitle = content;
                    }}
                />
            </Paper>
        );
    };
}

export default InfoHotspotConfig;
