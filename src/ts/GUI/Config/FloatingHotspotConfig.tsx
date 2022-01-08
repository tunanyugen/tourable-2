import * as React from 'react';
import Config, { ConfigProps, ConfigState } from "./Config";
import MediaSelect from "@tunanyugen/react-components/src/ts/Form/MediaSelect/MediaSelect";
import LabeledMediaSelect from "@tunanyugen/react-components/src/ts/Form/LabeledMediaSelect/LabeledMediaSelect";
import { StandardMaterial, Texture, Vector3 } from "babylonjs";
import FloatingHotspot from "../../SceneObject/Hotspot/FloatingHotspot";
import Slider from "@tunanyugen/react-components/src/ts/Form/Slider/Slider";
import CKEditor from "@tunanyugen/react-components/src/ts/Form/CKEditor/CKEditor";

export interface FloatingHotspotConfigProps extends ConfigProps{
    
}
 
export interface FloatingHotspotConfigState extends ConfigState{
    
}
 
class FloatingHotspotConfig extends Config<FloatingHotspot, FloatingHotspotConfigProps, FloatingHotspotConfigState> {
    target:FloatingHotspot = null;
    constructor(props: FloatingHotspotConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit Hotspot",
            hidden: true,
            onClose: () => { this.hide() },
            onDelete: () => {
                if (!this.target){ return }
                this.target.dispose(this.props.tourable);
                this.hide();
            }
        }
    }
    renderComponents = () => {
        return (
            <React.Fragment>
                <MediaSelect
                    label="Choose the style of the hotspot"
                    images={this.props.tourable.config.assets.floatingHotspot}
                    value={this.target ? (this.target.mesh.material as StandardMaterial).diffuseTexture._texture.url : ""}
                    onSelect={(src) => {
                        if (!this.target) { return }
                        this.target.texture = src;
                        // create new back hotspot
                        if (this.props.tourable.sceneManager.scenes.get(this.target.targetSceneID)){
                            this.target.createBackHotspot(this.props.tourable);
                        }
                        // update to see texture change effect
                        this.forceUpdate();
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
            </React.Fragment>
        )
    }
}
 
export default FloatingHotspotConfig;