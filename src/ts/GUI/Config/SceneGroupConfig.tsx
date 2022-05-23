import { TextField } from "@mui/material";
import SceneGroup from "../../Scene/SceneGroup";
import CKEditor from "../CKEditor/CKEditor";
import Label from "../Label/Label";
import Config, { ConfigProps, ConfigState } from "./Config";

export interface SceneGroupConfigProps extends ConfigProps {}

export interface SceneGroupConfigState extends ConfigState {
    name: string;
    description: string;
}

class SceneGroupConfig extends Config<SceneGroup, SceneGroupConfigProps, SceneGroupConfigState> {
    target: SceneGroup = null;
    constructor(props: SceneGroupConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit scene group",
            hidden: true,
            onClose: () => {
                this.hide();
            },
            onDelete: () => {
                // dispose scene group
                this.target.delete(this.props.tourable);
                this.hide();
            },
        };
        this.onShowObservable.Add(
            this._observableManager,
            () => {
                this.setState({
                    name: this.props.tourable.sceneManager.currentSceneGroup.name,
                    description: this.props.tourable.sceneManager.currentSceneGroup.description,
                });
            },
            false
        );
    }
    syncSettings = () => {};
    applySettings = () => {
        this.props.tourable.sceneManager.currentSceneGroup.name = this.state.name;
        this.props.tourable.sceneManager.currentSceneGroup.description = this.state.description;
        this.applySettingsObservable.Resolve(this.state);
    };
    renderComponents = () => {
        return (
            <>
                <Label>Name</Label>
                <TextField
                    {...this._textFieldProps}
                    placeholder="Name"
                    value={this.state.name || ""}
                    onChange={(e) => {
                        this.setState({ name: e.target.value });
                    }}
                />
                <Label>Description</Label>
                <CKEditor
                    placeholder="Description"
                    defaultValue={this.state.description || ""}
                    onBlur={(value) => {
                        this.setState({ description: value });
                    }}
                />
                <Label>Scenes</Label>
            </>
        );
    };
}

export default SceneGroupConfig;
