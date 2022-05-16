import GUIObject from "../../GUIObject";
import { GUIProps, GUIState } from "../../GUI";
import { Box, Fade } from "@mui/material";

export interface HotpotProps extends GUIProps {
  top: Number,
  left: Number,
  NameHotpot: string,
  show: boolean
}

export interface HotpotState extends GUIState {}

class Hotpot extends GUIObject<HotpotProps, HotpotState> {
  static defaultProps: HotpotProps = {
    tourable: null,
    top: 0,
    left: 0,
    NameHotpot: "",
    show: false
  };


  constructor(props: HotpotProps) {
      super(props);``
  }


  
  render() {
      return (
        <Fade in={this.props.show} timeout={1000}>
          <Box 
            sx= {{
              position: "absolute", 
              top: `${this.props.top}vh`,
              left: `${this.props.left}vw`,
              backgroundColor: "#3fa445",
              width: "12vw",
              height: "6.5vh",
              color: "#fff",
              textAlign: "center",
              lineHeight: "6.5vh",
              fontSize: "calc(100vw * 16 / 1280)",
              cursor: "pointer",
            }}
          >
            {this.props.NameHotpot} 

            <Box sx={{
              position: "absolute", 
              width: "calc(100vw * 40 / 1280)",
              height: "3px",
              backgroundColor: "inherit",              
              left: "28%",
              transform: "rotate(45deg)",
            }}>

            </Box>
          </Box>
        </Fade>
      );
  }
}

export default Hotpot