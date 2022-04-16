import { TextField } from "@mui/material";
import * as React from "react";
import Poly from "../../SceneObject/Poly/Poly";
import CKEditor from "../CKEditor/CKEditor";
import Config, { ConfigProps, ConfigState } from "./Config";
import Label from "../Label/Label";

export interface PolyConfigProps extends ConfigProps {}

export interface PolyConfigState extends ConfigState {
    name: string;
    panoramaSrc: string;
    thumbnail: string;
    overview: string;
}

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
        this.props.tourable.sceneManager.onSwitchSceneObservable.Add(
            this._observableManager,
            () => {
                this.remount();
            },
            false
        );
        this.onShowObservable.Add(
            this._observableManager,
            () => {
                this.setState({
                    name: this.props.tourable.sceneManager.sceneToRender.panorama.name,
                    panoramaSrc: this.props.tourable.sceneManager.sceneToRender.panorama.src,
                    thumbnail: this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail,
                    overview: this.props.tourable.sceneManager.sceneToRender.panorama.overview,
                });
            },
            false
        );
    }
    applySettings = () => {
        // update value
        this.props.tourable.sceneManager.sceneToRender.panorama.name = this.state.name;
        this.props.tourable.sceneManager.sceneToRender.panorama.src = this.state.panoramaSrc;
        this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail = this.state.thumbnail;
        this.props.tourable.sceneManager.sceneToRender.panorama.overview = this.state.overview;
    };
    renderComponents = () => {
        return (
            <React.Fragment key={this.state.key}>
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
                    onChange={(value) => {
                        this.setState({ overview: this.state.overview });
                    }}
                />
            </React.Fragment>
        );
    };
}

export default PolyConfig;
