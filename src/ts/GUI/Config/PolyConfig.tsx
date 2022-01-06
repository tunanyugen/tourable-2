import CKEditor from "@tunanyugen/react-components/src/ts/Form/CKEditor/CKEditor";
import Input from "@tunanyugen/react-components/src/ts/Form/Input/Input";
import Slider from "@tunanyugen/react-components/src/ts/Form/Slider/Slider";
import { Color3 } from "babylonjs";
import Poly from "../../SceneObject/Poly/Poly";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import Config from "./Config";
const colorConverter = require("color-convert");

export interface PolyConfigProps extends GUIObjectProps{
    
}
 
export interface PolyConfigState extends GUIObjectState{
    
}
 
class PolyConfig extends GUIObject<PolyConfigProps, PolyConfigState> {
    target:Poly = null;
    constructor(props: PolyConfigProps) {
        super(props);
        // hide on click on canvas
        this.props.tourable.onLoadObservabl.Add(this._observableManager, () => {
            this.props.tourable.eventManager.mouse0.onButtonDownObservable.Add(this._observableManager, () => {
                if (!this.state.hidden){ this.hide() }
            }, false)
            this.forceUpdate()
        }, true)
    }
    componentDidUpdate(prevProps: Readonly<PolyConfigProps>, prevState: Readonly<PolyConfigState>, snapshot?: any): void {
        if (!prevState.hidden && prevState.hidden != this.state.hidden){
            this.target = null;
        }
    }
    render() { 
        return (
            <Config
                tourable={this.props.tourable}
                title="Edit poly"
                hidden={this.state.hidden}
                onClose={() => { this.hide() }}
                onDelete={() => {
                    if (!this.target){ return }
                    this.target.dispose(this.props.tourable);
                    this.hide();
                }}
            >
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
            </Config>
        );
    }
    setTarget = (poly:Poly) => {
        this.target = poly;
        this.setState({
            hidden: false,
        })
        this.show();
    }
}
 
export default PolyConfig;