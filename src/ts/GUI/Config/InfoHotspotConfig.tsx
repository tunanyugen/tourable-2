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
    scaling: number;
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
    syncSettings = () => {
        this.setState({
            hotspotStyle: this.target.texture,
            scaling: this.target.mesh.scaling.x * 50,
            hoverTitle: this.target.hoverTitle,
            clickTitle: this.target.clickTitle,
        })
    };
    applySettings = () => {
        // set hotspot texture
        this.target.texture = this.state.hotspotStyle;
        // set scaling
        let value = this.state.scaling / 50;
        let scaling = new Vector3(value, value, value);
        this.target.mesh.scaling = scaling.clone();
        this.target.originalScaling = scaling.clone();
        // set hover title
        this.target.hoverTitle = this.state.hoverTitle;
        // set click title
        this.target.clickTitle = this.state.clickTitle;
    };
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
                        this.setState({ hotspotStyle: media.src });
                    }}
                />
                <Label>Scaling</Label>
                <Slider
                    min={15}
                    max={100}
                    defaultValue={this.target ? this.target.originalScaling.x * 50 : 50}
                    onChange={(e, sliderValue) => {
                        this.setState({ scaling: sliderValue as number });
                    }}
                />
                <Label>Title on hover</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.hoverTitle : ""}
                    onBlur={(content) => {
                        this.setState({ hoverTitle: content });
                    }}
                />
                <Label>Title on click</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.clickTitle : ""}
                    onBlur={(content) => {
                        this.setState({ clickTitle: content });
                    }}
                />
            </Paper>
        );
    };
}

export default InfoHotspotConfig;
