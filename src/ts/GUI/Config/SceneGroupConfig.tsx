import { TextField } from "@mui/material";
import SceneGroup from "../../Scene/SceneGroup";
import Label from "../Label/Label";
import Config, { ConfigProps, ConfigState } from "./Config";

export interface SceneGroupConfigProps extends ConfigProps {}

export interface SceneGroupConfigState extends ConfigState {
    name: string;

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
    }
    syncSettings = () => {};
    applySettings = () => {};
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
                <Label>Scenes</Label>
                
            </>
        );
    };
}

export default SceneGroupConfig;
