import Config, { ConfigProps, ConfigState } from "./Config";
import Tourable from "../../Tourable/Tourable";
import { Box, TextField } from "@mui/material";
import Label from "../Label/Label";

export interface GlobalConfigProps extends ConfigProps {}

export interface GlobalConfigState extends ConfigState {
    data: {
        logo: string,
    }
}

class GlobalConfig extends Config<Tourable, GlobalConfigProps, GlobalConfigState> {
    target: Tourable = null;
    constructor(props: GlobalConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Global Config",
            hidden: true,
            onClose: () => {
                this.hide();
            },
            data: {
                logo: ""
            }
        };
        // sync data on show
        this.onShowObservable.Add(this._observableManager, () => {
            this.setState({data: {
                logo: this.props.tourable.config.logo
            }})
        }, false)
        // apply settings on hide
        this.onHideObservable.Add(this._observableManager, () => {
            this.applySettings();
        }, false)
    }
    applySettings = () => {
        // update client gui
        this.props.tourable.clientGUI.current.forceUpdate();
    }
    renderComponents = () => {
        return (
            <Box>
                <Label>Logo</Label>
                <TextField
                    {...this._textFieldProps}
                    placeholder="Logo"
                    value={this.state.data.logo}
                    onChange={(e) => {
                        this.props.tourable.config.logo = e.target.value;
                        this.forceUpdate();
                    }}
                />
            </Box>
        );
    };
}

export default GlobalConfig;
