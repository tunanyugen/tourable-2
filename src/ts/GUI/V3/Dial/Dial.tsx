
import GUI, { GUIProps, GUIState } from "../../GUI";
import GUIObject from "../../GUIObject";
import { Box, Icon } from "@mui/material";

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
                top: "calc(100vh * 32 / 680)",
                right: "calc(100vw * 40 / 1280)",
                // backgroundColor: "red"
            }}>
                   <img style={{ 
                        width: "calc(100vw * 80 / 1280)",
                        height: "calc(100vw * 80 / 1280)",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                    }}src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Simple_compass_rose.svg/600px-Simple_compass_rose.svg.png" alt="" /> 
            </Box>
              
        );
    }
}

export default Dial;
