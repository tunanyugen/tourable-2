import { Paper } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface LoadScreenProps extends GUIObjectProps {}

export interface LoadScreenState extends GUIObjectState {}

class LoadScreen extends GUIObject<LoadScreenProps, LoadScreenState> {
    constructor(props: LoadScreenProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: true,
        };
    }
    render() {
        return (
            <Paper
                className="tourable__load-screen"
                sx={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    transition: ".5s",
                    opacity: this.state.hidden ? "0" : "1",
                    pointerEvents: this.state.hidden ? "none" : "auto",
                    zIndex: "100",
                }}
            ></Paper>
        );
    }
}

export default LoadScreen;
