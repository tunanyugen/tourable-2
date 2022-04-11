import { Box, Typography } from "@mui/material";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";

export interface CopyrightProps extends GUIProps {}

export interface CopyrightState extends GUIState {}

class Copyright extends GUIObject<CopyrightProps, CopyrightState> {
    constructor(props: CopyrightProps) {
        super(props);
    }
    render() {
        return (
            <Box
                className="tourable__copyright"
                sx={{
                    position: "absolute",
                    right: "calc(100vw * 100 / 1920)",
                    bottom: "calc(100vh * 20 / 1920)",
                }}
            >
                <Typography color="#ffffff" fontWeight="700">
                    Virtual Tour By Anflash Technology
                </Typography>
            </Box>
        );
    }
}

export default Copyright;
