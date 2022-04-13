import { Box, Button, TextField } from "@mui/material";
import * as React from "react";
import Poly from "../../SceneObject/Poly/Poly";
import CKEditor from "../CKEditor/CKEditor";
import Config, { ConfigProps, ConfigState } from "./Config";
import Label from "../Label/Label";

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
        this.props.tourable.sceneManager.onSwitchSceneObservable.Add(this._observableManager, () => {
            this.remount();
        }, false)
    }
    private _nameTimeout: NodeJS.Timeout;
    private _panoramaTimeout: NodeJS.Timeout;
    private _thumbnailTimeout: NodeJS.Timeout;
    private _overviewTimeout: NodeJS.Timeout;
    renderComponents = () => {
        return (
            <React.Fragment key={this.state.key}>
                <Label>Name</Label>
                <TextField
                    {...this._textFieldProps}
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
                        if (this._nameTimeout) {
                            clearTimeout(this._nameTimeout);
                        }
                        this._nameTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.name = e.target.value;
                        }, 500);
                    }}
                />
                <Label>Panorama</Label>
                <TextField
                    {...this._textFieldProps}
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
                        if (this._panoramaTimeout) {
                            clearTimeout(this._panoramaTimeout);
                        }
                        this._panoramaTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.src = e.target.value;
                        }, 500);
                    }}
                />
                <Label>Thumbnail</Label>
                <TextField
                    {...this._textFieldProps}
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
                        if (this._thumbnailTimeout) {
                            clearTimeout(this._thumbnailTimeout);
                        }
                        this._thumbnailTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.thumbnail = e.target.value;
                        }, 500);
                    }}
                />
                <Label>Overview</Label>
                <CKEditor
                    placeholder="Overview"
                    defaultValue={
                        this.props.tourable.sceneManager.sceneToRender
                            ? this.props.tourable.sceneManager.sceneToRender.panorama.overview
                            : ""
                    }
                    onChange={(value) => {
                        // update value
                        this.props.tourable.sceneManager.sceneToRender.panorama.overview = value;
                        this.forceUpdate();
                        if (this._overviewTimeout) {
                            clearTimeout(this._overviewTimeout);
                        }
                        this._overviewTimeout = setTimeout(() => {
                            this.props.tourable.sceneManager.sceneToRender.panorama.overview = value;
                        }, 500);
                    }}
                />
            </React.Fragment>
        );
    };
}

export default PolyConfig;
