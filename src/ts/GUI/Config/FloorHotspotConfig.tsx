import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import Config from "./Config";
import MediaSelect from "@tunanyugen/react-components/src/ts/Form/MediaSelect/MediaSelect";
import Input from "@tunanyugen/react-components/src/ts/Form/Input/Input";
import LabeledMediaSelect from "@tunanyugen/react-components/src/ts/Form/LabeledMediaSelect/LabeledMediaSelect";
import { StandardMaterial, Texture } from "babylonjs";
import FloorHotspot from "../../SceneObject/Hotspot/FloorHotspot";
import Button from "@tunanyugen/react-components/src/ts/Form/Button/Button";
import CKEditor from "@tunanyugen/react-components/src/ts/Form/CKEditor/CKEditor";

export interface FloorHotspotConfigProps extends GUIObjectProps{
    
}
 
export interface FloorHotspotConfigState extends GUIObjectState{
    
}
 
class FloorHotspotConfig extends GUIObject<FloorHotspotConfigProps, FloorHotspotConfigState> {
    target:FloorHotspot = null;
    constructor(props: FloorHotspotConfigProps) {
        super(props);
        // hide on click on canvas
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
                onDelete={() => {
                    if (!this.target){ return }
                    this.target.dispose();
                    this.hide();
                }}
            >
                <MediaSelect
                    label="Choose the style of the hotspot"
                    images={this.props.tourable.config.assets.floorHotspot}
                    value={this.target ? (this.target.mesh.material as StandardMaterial).diffuseTexture._texture.url : ""}
                    onSelect={(src) => {
                        if (!this.target) { return }
                        this.target.texture = src;
                        // create new back hotspot
                        if (this.props.tourable.sceneManager.scenes.get(this.target.targetSceneID)){
                            this.target.createBackHotspot(this.props.tourable);
                        }
                        // refresh to see texture change effect
                        this.forceUpdate();
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
    setTarget = (floorHotspot:FloorHotspot) => {
        this.target = floorHotspot;
        this.setState({
            hidden: false,
        })
        this.show();
    }
}
 
export default FloorHotspotConfig;