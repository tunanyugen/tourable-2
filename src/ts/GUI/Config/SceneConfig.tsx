import { TextField } from "@mui/material";
import * as React from "react";
import CKEditor from "../CKEditor/CKEditor";
import Config, { ConfigProps, ConfigState } from "./Config";
import Label from "../Label/Label";
import Scene from "../../Scene/Scene";

export interface SceneConfigProps extends ConfigProps {}

export interface SceneConfigState extends ConfigState {
    name: string;
    panoramaSrc: string;
    thumbnail: string;
    overview: string;
}

class SceneConfig extends Config<Scene, SceneConfigProps, SceneConfigState> {
    target: Scene = null;
    constructor(props: SceneConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit scene",
            hidden: true,
            onClose: () => {
                this.hide();
            },
            onDelete: () => {
                // dispose scene
                this.target.delete(this.props.tourable);
                this.hide();
            },
        };
    }
    syncSettings = () => {
        let panorama = this.props.tourable.panoramas.get(this.props.tourable.sceneManager.sceneToRender.panoramaId);
        this.setState({
            name: panorama.name,
            panoramaSrc: panorama.src,
            thumbnail: panorama.thumbnail,
            overview: panorama.overview,
        });
    };
    applySettings = () => {
        let panorama = this.props.tourable.panoramas.get(this.props.tourable.sceneManager.sceneToRender.panoramaId);
        panorama.name = this.state.name;
        panorama.src = this.state.panoramaSrc;
        panorama.thumbnail = this.state.thumbnail;
        panorama.overview = this.state.overview;
        this.applySettingsObservable.Resolve(this.state);
    };
    renderComponents = () => {
        return (
            <React.Fragment>
                <Label>Name</Label>
                <TextField
                    {...this._textFieldProps}
                    placeholder="Name"
                    value={this.state.name || ""}
                    onChange={(e) => {
                        this.setState({ name: e.target.value });
                    }}
                />
                <Label>Panorama</Label>
                <TextField
                    {...this._textFieldProps}
                    placeholder="Url"
                    value={this.state.panoramaSrc || ""}
                    onChange={(e) => {
                        this.setState({ panoramaSrc: e.target.value });
                    }}
                />
                <Label>Thumbnail</Label>
                <TextField
                    {...this._textFieldProps}
                    placeholder="Thumbnail"
                    value={this.state.thumbnail || ""}
                    onChange={(e) => {
                        this.setState({ thumbnail: e.target.value });
                    }}
                />
                <Label>Overview</Label>
                <CKEditor
                    placeholder="Overview"
                    defaultValue={this.state.overview || ""}
                    onBlur={(value) => {
                        this.setState({ overview: value });
                    }}
                />
            </React.Fragment>
        );
    };
}

export default SceneConfig;
