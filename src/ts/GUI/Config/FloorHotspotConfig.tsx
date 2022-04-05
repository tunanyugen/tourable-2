import * as React from "react";
import Config, { ConfigProps, ConfigState } from "./Config";
import { StandardMaterial, Texture } from "babylonjs";
import FloorHotspot from "../../SceneObject/Hotspot/FloorHotspot";
import MediaSelector from "../Components/MediaSelector";
import Label from "./Label";
import { Box } from "@mui/material";
import CKEditor from "../Components/CKEditor";

export interface FloorHotspotConfigProps extends ConfigProps {}

export interface FloorHotspotConfigState extends ConfigState {}

class FloorHotspotConfig extends Config<FloorHotspot, FloorHotspotConfigProps, FloorHotspotConfigState> {
    target: FloorHotspot = null;
    constructor(props: FloorHotspotConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit Hotspot",
            hidden: true,
            onClose: () => {
                this.hide();
            },
            onDelete: () => {
                if (!this.target) {
                    return;
                }
                this.target.dispose(this.props.tourable);
                this.hide();
            },
        };
    }
    renderComponents = () => {
        return (
            <Box>
                <Label>Choose the style of the hotspot</Label>
                <MediaSelector
                    medias={this.props.tourable.config.assets.floorHotspot.map((src) => {
                        return { src };
                    })}
                    defaultValue={this.target ? (this.target.mesh.material as StandardMaterial).diffuseTexture._texture.url : ""}
                    onSelect={(src) => {
                        if (!this.target) {
                            return;
                        }
                        this.target.texture = src;
                        // refresh to see texture change effect
                        this.forceUpdate();
                    }}
                />
                <Label>Title on hover</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.hoverTitle : ""}
                    onChange={(content) => {
                        if (!this.target) {
                            return;
                        }
                        this.target.hoverTitle = content;
                    }}
                />
                <Label>Title on click</Label>
                <CKEditor
                    placeholder="Enter text here"
                    defaultValue={this.target ? this.target.clickTitle : ""}
                    onChange={(content) => {
                        if (!this.target) {
                            return;
                        }
                        this.target.clickTitle = content;
                    }}
                />
                <Label>Pick a scene</Label>
                <MediaSelector
                    medias={Array.from(this.props.tourable.sceneManager.scenes).map(([id, scene]) => {
                        return {
                            label: scene.panorama.name,
                            src: scene.panorama.thumbnail,
                            onSelect: () => {
                                if (this.target) {
                                    this.target.setTargetSceneID(this.props.tourable, scene.id);
                                }
                            },
                        };
                    })}
                />
            </Box>
        );
    };
}

export default FloorHotspotConfig;
