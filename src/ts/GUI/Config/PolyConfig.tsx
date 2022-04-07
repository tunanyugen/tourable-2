import { Color3 } from "babylonjs";
import Poly from "../../SceneObject/Poly/Poly";
import Config, { ConfigProps, ConfigState } from "./Config";
import { Box, Slider, TextField } from '@mui/material';
import CKEditor from '../CKEditor/CKEditor';
import Label from './Label';
const colorConverter = require("color-convert");

export interface PolyConfigProps extends ConfigProps{
    
}
 
export interface PolyConfigState extends ConfigState{
    
}
 
class PolyConfig extends Config<Poly, PolyConfigProps, PolyConfigState> {
    target:Poly = null;
    constructor(props: PolyConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit poly",
            hidden: true,
            onClose: () => { this.hide() },
            onDelete: () => {
                if (!this.target){ return }
                this.target.dispose(this.props.tourable);
                this.hide();
            },
            onEdit: () => {
                if (!this.target){ return }
                this.target.tutorial(this.props.tourable);
                this.hide();
            }
        }
    }
    renderComponents = () => {
        return (
            <Box>
                <Label>Color</Label>
                <TextField
                    placeholder="Enter hex code here"
                    value={this.target ? `#${colorConverter.rgb.hex(this.target.color.r * 255, this.target.color.g * 255, this.target.color.b * 255)}` : ""}
                    onChange={(e) => {
                        if (!this.target){ return }
                        let rgb = (colorConverter.hex.rgb(e.target.value) as number[]).map((color) => { return color / 255 })
                        this.target.color = new Color3(rgb[0], rgb[1], rgb[2]);
                        this.props.tourable.config.poly.color = {r: rgb[0], g: rgb[1], b: rgb[2]};
                    }}
                />
                <Label>Title on hover</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.hoverTitle : ""}
                    onChange={(content) => {
                        if (!this.target){ return }
                        this.target.hoverTitle = content;
                    }}
                />
                <Label>Title on click</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.clickTitle : ""}
                    onChange={(content) => {
                        if (!this.target){ return }
                        this.target.clickTitle = content;
                    }}
                />
                <Label>Opacity</Label>
                <Slider
                    min={15}
                    max={100}
                    value={this.target ? this.target.opacity * 100 : 100}
                    onChange={(e, value) => {
                        if (!this.target){ return }
                        let opacity = parseFloat(`${value as number}`) / 100;
                        this.target.opacity = opacity;
                        this.props.tourable.config.poly.opacity = opacity;
                    }}
                />
            </Box>
        )
    }
}
 
export default PolyConfig;