import Config, { ConfigProps, ConfigState } from "./Config";
import Tourable from "../../Tourable/Tourable";
import { Box, TextField } from "@mui/material";
import Label from "../Label/Label";

export interface GlobalConfigProps extends ConfigProps {}

export interface GlobalConfigState extends ConfigState {
    logo: string;
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
            logo: "",
        };
    }
    syncSettings = () => {
        this.setState({ logo: this.props.tourable.config.logo });
    };
    applySettings = () => {
        // update client gui
        this.props.tourable.clientGUI.current.forceUpdate();
    };
    renderComponents = () => {
        return (
            <Box>
                <Label>Logo</Label>
                <TextField
                    {...this._textFieldProps}
                    placeholder="Logo"
                    value={this.state.logo}
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
