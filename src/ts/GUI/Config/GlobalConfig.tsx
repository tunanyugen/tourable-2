import Config, { ConfigProps, ConfigState } from "./Config";
import Tourable from "../../Tourable/Tourable";
import { Box, TextField } from "@mui/material";
import Label from "../Label/Label";

export interface GlobalConfigProps extends ConfigProps {}

export interface GlobalConfigState extends ConfigState {}

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
        };
        this.onHideObservable.Add(this._observableManager, () => {
            // update client gui on hide
            this.props.tourable.clientGUI.current.forceUpdate();
        }, false)
    }
    renderComponents = () => {
        return (
            <Box>
                <Label>Logo</Label>
                <TextField
                    {...this._textFieldProps}
                    placeholder="Logo"
                    value={this.props.tourable.config.logo}
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
