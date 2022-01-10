import * as React from 'react';
import CKEditor from "@tunanyugen/react-components/src/ts/Form/CKEditor/CKEditor";
import Input from "@tunanyugen/react-components/src/ts/Form/Input/Input";
import Slider from "@tunanyugen/react-components/src/ts/Form/Slider/Slider";
import { Color3 } from "babylonjs";
import Poly from "../../SceneObject/Poly/Poly";
import Config, { ConfigProps, ConfigState } from "./Config";
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
            <React.Fragment>
                <Input
                    label="Color"
                    placeholder="Enter hex code here"
                    value={this.target ? `#${colorConverter.rgb.hex(this.target.color.r * 255, this.target.color.g * 255, this.target.color.b * 255)}` : ""}
                    onChange={(e) => {
                        if (!this.target){ return }
                        let rgb = (colorConverter.hex.rgb(e.target.value) as number[]).map((color) => { return color / 255 })
                        this.target.color = new Color3(rgb[0], rgb[1], rgb[2]);
                        this.props.tourable.config.poly.color = {r: rgb[0], g: rgb[1], b: rgb[2]};
                    }}
                />
                <CKEditor
                    label="Title on hover"
                    placeholder="Enter text here"
                    value={this.target ? this.target.hoverTitle : ""}
                    onChange={(content) => {
                        if (!this.target){ return }
                        this.target.hoverTitle = content;
                    }}
                />
                <CKEditor
                    label="Title on click"
                    placeholder="Enter text here"
                    value={this.target ? this.target.clickTitle : ""}
                    onChange={(content) => {
                        if (!this.target){ return }
                        this.target.clickTitle = content;
                    }}
                />
                <Slider
                    label="Opacity"
                    min={15}
                    max={100}
                    value={this.target ? this.target.opacity * 100 : 100}
                    onChange={(e) => {
                        if (!this.target){ return }
                        let opacity = parseFloat(e.target.value) / 100;
                        this.target.opacity = opacity;
                        this.props.tourable.config.poly.opacity = opacity;
                    }}
                />
            </React.Fragment>
        )
    }
}
 
export default PolyConfig;