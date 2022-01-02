import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import Config from "./Config";
import MediaSelect from "@tunanyugen/react-components/src/ts/Form/MediaSelect/MediaSelect";
import Input from "@tunanyugen/react-components/src/ts/Form/Input/Input";
import LabeledMediaSelect from "@tunanyugen/react-components/src/ts/Form/LabeledMediaSelect/LabeledMediaSelect";
import { StandardMaterial, Texture, Vector3 } from "babylonjs";
import FloatingHotspot from "../../SceneObject/Hotspot/FloatingHotspot";
import Slider from "@tunanyugen/react-components/src/ts/Form/Slider/Slider";
import CKEditor from "@tunanyugen/react-components/src/ts/Form/CKEditor/CKEditor";

export interface FloatingHotspotConfigProps extends GUIObjectProps{
    
}
 
export interface FloatingHotspotConfigState extends GUIObjectState{
    icon:string;
}
 
class FloatingHotspotConfig extends GUIObject<FloatingHotspotConfigProps, FloatingHotspotConfigState> {
    target:FloatingHotspot = null;
    constructor(props: FloatingHotspotConfigProps) {
        super(props);
        
        this.props.tourable.onLoadObservabl.Add(() => {
            this.props.tourable.eventManager.mouse0.onButtonDownObservable.Add(() => {
                if (!this.state.hidden){ this.hide() }
            }, false)
            this.forceUpdate()
        }, true)
    }
    componentDidUpdate(prevProps: Readonly<FloatingHotspotConfigProps>, prevState: Readonly<FloatingHotspotConfigState>, snapshot?: any): void {
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
                    images={this.props.tourable.config.assets.floatingHotspot}
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
                <CKEditor
                    label="Hovering popup"
                    placeholder="Enter text here"
                    value={this.target ? this.target.hoverTitle : ""}
                    onChange={(content) => {
                        if (!this.target){ return }
                        this.target.hoverTitle = content;
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
                <LabeledMediaSelect
                    label="Pick a scene"
                    items={Array.from(this.props.tourable.sceneManager.scenes).map(([id, scene]) => {
                        return {
                            label: scene.panorama.name,
                            src: scene.panorama.thumbnail,
                            onClick: () => {
                                if (this.target){
                                    this.target.setTargetSceneID(this.props.tourable, scene.id);
                                    // create new back hotspot
                                    this.target.createBackHotspot(this.props.tourable);
                                }
                            }
                        }
                    })}
                />
            </Config>
        );
    }
    setTarget = (FloatingHotspot:FloatingHotspot) => {
        this.target = FloatingHotspot;
        this.setState({
            hidden: false,
            icon: (this.target.mesh.material as StandardMaterial).diffuseTexture._texture.url,
        })
        this.show();
    }
}
 
export default FloatingHotspotConfig;