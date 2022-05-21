import GUIObject from "../../GUIObject";
import { GUIProps, GUIState } from "../../GUI";
import { Box } from "@mui/material";

export interface MenuItemProps extends GUIProps {
    sceneGroupId: number;
    onClick: () => void;
}

export interface MenuItemState extends GUIState {}

class MenuItem extends GUIObject<MenuItemProps, MenuItemState> {
    static defaultProps: MenuItemProps = {
        tourable: null,
        sceneGroupId: -1,
        onClick: () => {},
    };

    constructor(props: MenuItemProps) {
        super(props);
    }

    render() {
        return (
            <Box
                sx={{
                    fontSize: "calc(100vw * 15 / 1280)",
                    color: "#fff",
                    padding: "calc(100vh *20 / 680) calc(100vw * 16 / 1280)",
                    backgroundColor: "#3fa445",
                    borderRadius: "60px",
                    marginBottom: "calc(100vh * 8 / 680)",
                    textAlign: "center",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontWeight: "600",
                    backdropFilter:
                        this.props.tourable.sceneManager.currentSceneGroup &&
                        this.props.tourable.sceneManager.currentSceneGroup.id == this.props.sceneGroupId
                            ? "brightness(0.8)"
                            : null,
                }}
                onClick={this.props.onClick}
            >
                {this.props.tourable.sceneGroups.get(this.props.sceneGroupId).name}
            </Box>
        );
    }
}

export default MenuItem;
