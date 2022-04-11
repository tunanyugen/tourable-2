import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { Box, FormControlLabel } from "@mui/material";

export interface FullscreenProps extends GUIObjectProps {}

export interface FullscreenState extends GUIObjectState {}

class Fullscreen extends GUIObject<FullscreenProps, FullscreenState> {
    constructor(props: FullscreenProps) {
        super(props);
    }
    render() {
        return (
            <Box sx={{height: "38px"}}>
                <FormControlLabel
                    control={<FullscreenOutlinedIcon sx={{ height: "100%", width: "auto" }} />}
                    label="Fullscreen"
                    labelPlacement="start"
                    sx={{
                        height: "100%",
                        color: "white",
                        fontWeight: "700",
                    }}
                />
            </Box>
        );
    }
}

export default Fullscreen;
