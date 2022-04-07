import { Box, Button, TextField } from "@mui/material";
import * as React from "react";
import Poly from "../../SceneObject/Poly/Poly";
import Config, { ConfigProps, ConfigState } from "./Config";
import Label from "./Label";

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
                <Label>Name</Label>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Name"
                    value={
                        this.props.tourable.sceneManager.sceneToRender
                            ? this.props.tourable.sceneManager.sceneToRender.panorama.name
                            : ""
                    }
                    onChange={(e) => {
                        // update value
                        this.props.tourable.sceneManager.sceneToRender.panorama.name = e.target.value;
                        this.forceUpdate();
                        if (this.nameTimeout) {
                            clearTimeout(this.nameTimeout);
                        }
                        this.nameTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.name = e.target.value;
                        }, 500);
                    }}
                />
                <Label>Panorama</Label>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Url"
                    value={
                        this.props.tourable.sceneManager.sceneToRender
                            ? this.props.tourable.sceneManager.sceneToRender.panorama.src
                            : ""
                    }
                    onChange={(e) => {
                        // update value
                        this.props.tourable.sceneManager.sceneToRender.panorama.src = e.target.value;
                        this.forceUpdate();
                        if (this.panoramaTimeout) {
                            clearTimeout(this.panoramaTimeout);
                        }
                        this.panoramaTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.src = e.target.value;
                        }, 500);
                    }}
                />
                <Label>Thumbnail</Label>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Thumbnail"
                    value={
                        this.props.tourable.sceneManager.sceneToRender
                            ? this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail
                            : ""
                    }
                    onChange={(e) => {
                        // update value
                        this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail = e.target.value;
                        this.forceUpdate();
                        if (this.thumbnailTimeout) {
                            clearTimeout(this.thumbnailTimeout);
                        }
                        this.thumbnailTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail = e.target.value;
                        }, 500);
                    }}
                />
                <Box sx={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "40px" }}>
                    <Button fullWidth color="error" variant="contained" onClick={this.state.onDelete}>Delete</Button>
                </Box>
            </React.Fragment>
        );
    };
}

export default PolyConfig;
