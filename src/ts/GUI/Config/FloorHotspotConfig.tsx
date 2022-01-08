import * as React from 'react';
import Config, { ConfigProps, ConfigState } from "./Config";
import MediaSelect from "@tunanyugen/react-components/src/ts/Form/MediaSelect/MediaSelect";
import LabeledMediaSelect from "@tunanyugen/react-components/src/ts/Form/LabeledMediaSelect/LabeledMediaSelect";
import { StandardMaterial, Texture } from "babylonjs";
import FloorHotspot from "../../SceneObject/Hotspot/FloorHotspot";
import CKEditor from "@tunanyugen/react-components/src/ts/Form/CKEditor/CKEditor";

export interface FloorHotspotConfigProps extends ConfigProps{
    
}
 
export interface FloorHotspotConfigState extends ConfigState{
    
}
 
class FloorHotspotConfig extends Config<FloorHotspot, FloorHotspotConfigProps, FloorHotspotConfigState> {
    target:FloorHotspot = null;
    constructor(props: FloorHotspotConfigProps) {
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
 
export default FloorHotspotConfig;