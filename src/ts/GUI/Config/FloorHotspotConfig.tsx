import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import Config from "./Config";
import MediaSelect from "@tunanyugen/react-components/src/ts/Form/MediaSelect/MediaSelect";
import Input from "@tunanyugen/react-components/src/ts/Form/Input/Input";
import LabeledMediaSelect from "@tunanyugen/react-components/src/ts/Form/LabeledMediaSelect/LabeledMediaSelect";
import { StandardMaterial, Texture } from "babylonjs";
import FloorHotspot from "../../SceneObject/FloorHotspot/FloorHotspot";

export interface FloorHotspotConfigProps extends GUIObjectProps{
    
}
 
export interface FloorHotspotConfigState extends GUIObjectState{
    icon:string;
}
 
class FloorHotspotConfig extends GUIObject<FloorHotspotConfigProps, FloorHotspotConfigState> {
    target:FloorHotspot = null;
    constructor(props: FloorHotspotConfigProps) {
        super(props);
        
        this.props.tourable.onLoadObservabl.Add(() => {
            this.props.tourable.eventManager.mouse0.onButtonDownObservable.Add(() => {
                if (!this.state.hidden){ this.hide() }
            }, false)
            this.forceUpdate()
        }, true)
    }
    componentDidUpdate(prevProps: Readonly<FloorHotspotConfigProps>, prevState: Readonly<FloorHotspotConfigState>, snapshot?: any): void {
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
            >
                <MediaSelect
                    label="Choose the style of the hotspot"
                    images={this.props.tourable.config.assets.floorHotspot}
                    value={this.state.icon}
                    onSelect={(src) => {
                        if (!this.target) { return }
                        this.setState({icon: src});
                        this.target.texture = src;
                    }}
                />
                <Input
                    label="Title"
                    placeholder="Enter text here"
                />
                <LabeledMediaSelect
                    label="Pick a scene"
                    items={Array.from(this.props.tourable.sceneManager.scenes).map(([id, scene]) => {
                        return {
                            label: scene.panorama.name,
                            src: scene.panorama.thumbnail,
                            onClick: () => {
                                if (this.target){
                                    this.target.targetSceneID = scene.id;
                                    // create new one
                                    this.target.createBackHotspot(this.props.tourable);
                                }
                            }
                        }
                    })}
                />
            </Config>
        );
    }
    setTarget = (floorHotspot:FloorHotspot) => {
        this.target = floorHotspot;
        this.setState({
            hidden: false,
            icon: (this.target.mesh.material as StandardMaterial).diffuseTexture._texture.url,
        })
        this.show();
    }
}
 
export default FloorHotspotConfig;