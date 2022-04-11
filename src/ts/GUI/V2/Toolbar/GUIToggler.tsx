import { Box, FormControlLabel, Switch } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
export interface GUITogglerProps extends GUIObjectProps {}

export interface GUITogglerState extends GUIObjectState {}

class GUIToggler extends GUIObject<GUITogglerProps, GUITogglerState> {
    constructor(props: GUITogglerProps) {
        super(props);
    }
    render() {
        return (
            <Box>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            className="tourable__toolbar__gui-toggler"
                            onChange={(e, checked) => {
                                console.log(checked);
                            }}
                        />
                    }
                    label="Bật/tắt công cụ"
                    labelPlacement="start"
                    sx={{
                        color: "white",
                        fontWeight: "700",
                    }}
                />
            </Box>
        );
    }
}

export default GUIToggler;
