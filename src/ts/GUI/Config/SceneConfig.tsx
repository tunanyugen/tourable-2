import { TextField } from "@mui/material";
import * as React from "react";
import Poly from "../../SceneObject/Poly/Poly";
import Config, { ConfigProps, ConfigState } from "./Config";

export interface PolyConfigProps extends ConfigProps {}

export interface PolyConfigState extends ConfigState {}

class PolyConfig extends Config<Poly, PolyConfigProps, PolyConfigState> {
    target: Poly = null;
    constructor(props: PolyConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit poly",
            hidden: true,
            onClose: () => {
                this.hide();
            },
            onDelete: () => {
                // dispose scene
                this.props.tourable.sceneManager.sceneToRender.delete(this.props.tourable);
                this.hide();
            },
        };
    }
    nameTimeout: NodeJS.Timeout;
    panoramaTimeout: NodeJS.Timeout;
    thumbnailTimeout: NodeJS.Timeout;
    renderComponents = () => {
        return (
            <React.Fragment>
                <TextField
                    label="Name"
                    placeholder="Name"
                    value={this.props.tourable.sceneManager.sceneToRender ? this.props.tourable.sceneManager.sceneToRender.panorama.name : ""}
                    onChange={(e) => {
                        if (this.nameTimeout) {
                            clearTimeout(this.nameTimeout);
                        }
                        this.nameTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.name = e.target.value;
                        }, 500);
                    }}
                />
                <TextField
                    label="Panorama"
                    placeholder="Url"
                    value={this.props.tourable.sceneManager.sceneToRender ? this.props.tourable.sceneManager.sceneToRender.panorama.src : ""}
                    onChange={(e) => {
                        if (this.panoramaTimeout) {
                            clearTimeout(this.panoramaTimeout);
                        }
                        this.panoramaTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.src = e.target.value;
                        }, 500);
                    }}
                />
                <TextField
                    label="thumbnail"
                    placeholder="Thumbnail"
                    value={this.props.tourable.sceneManager.sceneToRender ? this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail : ""}
                    onChange={(e) => {
                        if (this.thumbnailTimeout) {
                            clearTimeout(this.thumbnailTimeout);
                        }
                        this.thumbnailTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail = e.target.value;
                        }, 500);
                    }}
                />
            </React.Fragment>
        );
    };
}

export default PolyConfig;
