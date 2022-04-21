import { Box } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import Fullscreen from "./Fullscreen";
import GUIToggler from "./GUIToggler";
import Info from "./Info";
import Map from "./Map";
import MusicToggler from "./MusicToggler";
import Overview from "./Overview";

export interface ToolbarProps extends GUIObjectProps {}

export interface ToolbarState extends GUIObjectState {}

class Toolbar extends GUIObject<ToolbarProps, ToolbarState> {
    constructor(props: ToolbarProps) {
        super(props);
    }
    render() {
        return (
            <Box
                sx={{
                    position: "absolute",
                    top: "calc(100vh * 40 / 1080)",
                    right: "calc(100vw * 100 / 1920)",
                    display: "flex",
                    justifyContent: "flex end",
                    alignitems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex end",
                        alignItems: "center",
                        gap: "calc(100vw * 17 / 1920)",
                    }}
                >
                    <MusicToggler tourable={this.props.tourable} />
                    <Info tourable={this.props.tourable} />
                    <Map tourable={this.props.tourable} />
                    <Overview tourable={this.props.tourable} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex end",
                        alignItems: "center",
                        marginLeft: "calc(100vw * 45 / 1920)",
                        gap: "calc(100vw * 45 / 1920)",
                    }}
                >
                    <GUIToggler tourable={this.props.tourable} />
                    <Fullscreen tourable={this.props.tourable} />
                </Box>
            </Box>
        );
    }
}

export default Toolbar;
