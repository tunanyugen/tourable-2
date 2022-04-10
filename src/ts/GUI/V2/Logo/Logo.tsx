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
                    width: "352px",
                    height: "87px",
                    padding: "12px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    background: "#c4c4c4",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: "0 0 116px",
                        height: "100%",
                    }}
                >
                    <img style={{ height: "100%", width: "auto" }} src={this.props.tourable.config.logo} alt="logo" />
                </Box>
                <Box sx={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div>Căn hộ cao cấp</div>
                    <div>Garden sky view</div>
                </Box>
            </Box>
        );
    }
}

export default Logo;
