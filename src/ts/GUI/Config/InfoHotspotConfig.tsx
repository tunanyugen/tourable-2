import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import Config from "./Config";
import MediaSelect from "@tunanyugen/react-components/src/ts/Form/MediaSelect/MediaSelect";
import Input from "@tunanyugen/react-components/src/ts/Form/Input/Input";
import LabeledMediaSelect from "@tunanyugen/react-components/src/ts/Form/LabeledMediaSelect/LabeledMediaSelect";
import { StandardMaterial, Texture, Vector3 } from "babylonjs";
import InfoHotspot from "../../SceneObject/Hotspot/InfoHotspot";
import Slider from "@tunanyugen/react-components/src/ts/Form/Slider/Slider";

export interface InfoHotspotConfigProps extends GUIObjectProps{
    
}
 
export interface InfoHotspotConfigState extends GUIObjectState{
    icon:string;
}
 
class InfoHotspotConfig extends GUIObject<InfoHotspotConfigProps, InfoHotspotConfigState> {
    target:InfoHotspot = null;
    constructor(props: InfoHotspotConfigProps) {
        super(props);
        
        this.props.tourable.onLoadObservabl.Add(() => {
            this.props.tourable.eventManager.mouse0.onButtonDownObservable.Add(() => {
                if (!this.state.hidden){ this.hide() }
            }, false)
            this.forceUpdate()
        }, true)
    }
    componentDidUpdate(prevProps: Readonly<InfoHotspotConfigProps>, prevState: Readonly<InfoHotspotConfigState>, snapshot?: any): void {
        if (!prevState.hidden && prevState.hidden != this.state.hidden){
            this.target = null;
        }
    }
    render() {
        return (
            <Config
                tourable={this.props.tourable}
                title="Edit Hotspot"
                hidden={this.state.hidden}
                onClose={() => { this.hide() }}
                onDelete={() => {
                    if (!this.target){ return }
                    this.target.dispose();
                    this.hide();
                }}
            >
                <MediaSelect
                    label="Choose the style of the hotspot"
                    images={this.props.tourable.config.assets.infoHotspot}
                    value={this.state.icon}
                    onSelect={(src) => {
                        if (!this.target) { return }
                        this.setState({icon: src});
                        this.target.texture = src;
                        // create new back hotspot
                        if (this.props.tourable.sceneManager.scenes.get(this.target.targetSceneID)){
                            this.target.createBackHotspot(this.props.tourable);
                        }
                    }}
                />
                <Input
                    label="Title"
                    placeholder="Enter text here"
                    onChange={(e) => {
                        if (!this.target){ return }
                        this.target.title = e.target.value;
                    }}
                />
                <Slider
                    label="Resize hotspot"
                    min={15}
                    max={100}
                    value={this.target ? this.target.originalScaling.x * 50 : 50}
                    onChange={(e) => {
                        if (!this.target){ return }
                        let value = parseInt(e.target.value) / 50;
                        let scaling = new Vector3(value, value, value);
                        this.target.mesh.scaling = scaling.clone();
                        this.target.originalScaling = scaling.clone();
                    }}
                />
            </Config>
        );
    }
    setTarget = (InfoHotspot:InfoHotspot) => {
        this.target = InfoHotspot;
        this.setState({
            hidden: false,
            icon: (this.target.mesh.material as StandardMaterial).diffuseTexture._texture.url,
        })
        this.show();
    }
}
 
export default InfoHotspotConfig;