import GUIObject from "../../GUIObject";
import { GUIProps, GUIState } from "../../GUI";
import { Box } from "@mui/material";

export interface MenuItemProps extends GUIProps {
  NameHotpot: string
}

export interface MenuItemState extends GUIState {}

class MenuItem extends GUIObject<MenuItemProps, MenuItemState> {
  static defaultProps: MenuItemProps = {
    tourable: null,
    NameHotpot: ""
  };

  constructor(props: MenuItemProps) {
      super(props);
  }

  
  render() {
      return (
        <Box sx={{
          fontSize: "calc(100vw * 15 / 1280)", 
          color: "#fff",
          padding: "calc(100vh *20 / 680) calc(100vw * 16 / 1280)",
          backgroundColor: "#3fa445",
          borderRadius: "60px",
          marginBottom: "calc(100vh * 8 / 680)",
          textAlign: "center",
          textTransform: "uppercase",
          cursor: "pointer",
          fontWeight: "600"
        }}
        onClick={(e) => {
          console.log("changed hotpot to " +this.props.NameHotpot)
        }}
        >
          {this.props.NameHotpot}
        </Box>
      );
  }
}

export default MenuItem