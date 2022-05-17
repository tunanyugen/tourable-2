
import GUI, { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import { Box, Icon } from "@mui/material";
import MusicToggler from "./MusicToggler";
import Youtube from "./Youtube";
import InfoHotpots from "./InfoHotpots";
import Setting from "./Setting";
import GPS from "./GPS";

export interface DialProps extends GUIProps {}

export interface DialState extends GUIState {}

class Dial extends GUI<DialProps, DialState> {
    constructor(props: DialProps) {
        super(props);
      
    }
    render() {
        return (
            <Box sx={{
                position: "absolute",
                display: "flex",
                bottom: "calc(100vh * 32 / 680)",
                right: "calc(100vw * 36 / 1280)",
            }}>
                  <MusicToggler tourable={this.props.tourable}/>
                  <Youtube tourable={this.props.tourable}/>
                  <GPS tourable={this.props.tourable}/>
                  <InfoHotpots tourable={this.props.tourable}/>
                  <Setting tourable={this.props.tourable}/>
            </Box>
              
        );
    }
}

export default Dial;
