import Config, { ConfigProps, ConfigState } from "./Config";
import { StandardMaterial, Vector3 } from "babylonjs";
import InfoHotspot from "../../SceneObject/Hotspot/InfoHotspot";
import { Box, Paper, Slider } from "@mui/material";
import CKEditor from "../CKEditor/CKEditor";
import MediaSelector from "../MediaSelector/MediaSelector";

export interface InfoHotspotConfigProps extends ConfigProps {}

export interface InfoHotspotConfigState extends ConfigState {}

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
    renderComponents = () => {
        return (
            <Paper className="tourable__info-hotspot-config">
                <MediaSelector
                    medias={this.props.tourable.config.assets.infoHotspot.map((src) => {
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
                <CKEditor
                    label="Title on hover"
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.hoverTitle : ""}
                    onChange={(content) => {
                        if (!this.target) {
                            return;
                        }
                        this.target.hoverTitle = content;
                    }}
                />
                <CKEditor
                    label="Title on click"
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.clickTitle : ""}
                    onChange={(content) => {
                        if (!this.target) {
                            return;
                        }
                        this.target.clickTitle = content;
                    }}
                />
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
            </Paper>
        );
    };
}

export default InfoHotspotConfig;
