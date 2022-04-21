import { Color3 } from "babylonjs";
import Poly from "../../SceneObject/Poly/Poly";
import Config, { ConfigProps, ConfigState } from "./Config";
import { Box, Slider, TextField } from "@mui/material";
import CKEditor from "../CKEditor/CKEditor";
import Label from "../Label/Label";
const colorConverter = require("color-convert");

export interface PolyConfigProps extends ConfigProps {}

export interface PolyConfigState extends ConfigState {
    color: string;
    opacity: number;
    hoverTitle: string;
    clickTitle: string;
}

class PolyConfig extends Config<Poly, PolyConfigProps, PolyConfigState> {
    target: Poly = null;
    constructor(props: PolyConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit poly",
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
            onEdit: () => {
                if (!this.target) {
                    return;
                }
                this.target.tutorial(this.props.tourable);
                this.hide();
            },
        };
    }
    syncSettings = () => {
        this.setState({
            color: colorConverter.rgb.hex(this.target.color.r * 255, this.target.color.g * 255, this.target.color.b * 255),
            opacity: this.target.opacity * 100,
            hoverTitle: this.target.hoverTitle,
            clickTitle: this.target.clickTitle,
        });
    };
    applySettings = () => {
        // set color
        let rgb = (colorConverter.hex.rgb(this.state.color) as number[]).map((color) => {
            return color / 255;
        });
        this.target.color = new Color3(rgb[0], rgb[1], rgb[2]);
        this.props.tourable.config.poly.color = { r: rgb[0], g: rgb[1], b: rgb[2] };
        // set opacity
        let opacity = this.state.opacity / 100;
        this.target.opacity = opacity;
        this.props.tourable.config.poly.opacity = opacity;
        // set title on hover
        this.target.hoverTitle = this.state.hoverTitle;
        // set title on click
        this.target.clickTitle = this.state.clickTitle;
    };
    renderComponents = () => {
        return (
            <Box>
                <Label>Color</Label>
                <TextField
                    {...this._textFieldProps}
                    placeholder="Enter hex code here"
                    value={this.state.color || "ffffff"}
                    onChange={(e) => {
                        if (!this.target) {
                            return;
                        }
                        this.setState({ color: e.target.value });
                    }}
                />
                <Label>Opacity</Label>
                <Slider
                    min={15}
                    max={100}
                    value={this.state.opacity || 100}
                    onChange={(e, value) => {
                        this.setState({ opacity: value as number });
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
            </Box>
        );
    };
}

export default PolyConfig;
