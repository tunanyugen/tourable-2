import * as React from 'react';
import CKEditor from "@tunanyugen/react-components/src/ts/Form/CKEditor/CKEditor";
import Input from "@tunanyugen/react-components/src/ts/Form/Input/Input";
import Slider from "@tunanyugen/react-components/src/ts/Form/Slider/Slider";
import { Color3 } from "babylonjs";
import Poly from "../../SceneObject/Poly/Poly";
import Config, { ConfigProps, ConfigState } from "./Config";
import Tourable from '../../Tourable/Tourable';
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
                // dispose scene
                this.props.tourable.sceneManager.sceneToRender.delete(this.props.tourable);
                this.hide();
            },
        }
    }
    renderComponents = () => {
        return (
            <React.Fragment>
                <Input
                    label="Name"
                    placeholder="Name"
                    value={this.props.tourable.sceneManager.sceneToRender ? this.props.tourable.sceneManager.sceneToRender.panorama.name : ""}
                    onFinishedTyping={(e) => {
                        this.props.tourable.sceneManager.sceneToRender.panorama.name = e.target.value;
                    }}
                />
                <Input
                    label="Panorama"
                    placeholder="Url"
                    value={this.props.tourable.sceneManager.sceneToRender ? this.props.tourable.sceneManager.sceneToRender.panorama.src : ""}
                    onFinishedTyping={(e) => {
                        this.props.tourable.sceneManager.sceneToRender.panorama.src = e.target.value;
                    }}
                />
                <Input
                    label="thumbnail"
                    placeholder="Thumbnail"
                    value={this.props.tourable.sceneManager.sceneToRender ? this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail : ""}
                    onFinishedTyping={(e) => {
                        this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail = e.target.value;
                    }}
                />
            </React.Fragment>
        )
    }
}
 
export default PolyConfig;