import { Box } from "@mui/material";
import { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";

export interface LogoProps extends GUIProps {}

export interface LogoState extends GUIState {}

class Logo extends GUIObject<LogoProps, LogoState> {
    constructor(props: LogoProps) {
        super(props);
    }
    render() {
        return (
            <Box
                sx={{
                    position: "absolute",
                    left: "0px",
                    top: "24px",
                    display: "flex",
                    height: "72px",
                    padding: "12px",
                    borderTopRightRadius: "16px",
                    borderBottomRightRadius: "16px",
                    background: "#c4c4c4",
                }}
            >
                <img style={{ height: "100%", width: "auto" }} src={this.props.tourable.config.logo} alt="logo" />
            </Box>
        );
    }
}

export default Logo;
