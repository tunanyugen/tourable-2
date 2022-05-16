import { Box } from "@mui/material";
import React from "react";
import GUI, { GUIProps, GUIState } from "./GUI";
import Copyright from "./V3/Copyright/Copyright";
import Hotpots from "./V3/Hotpots/Hotpots";
// import Library from "./V2/Library/Library";
// import Logo from "./V2/Logo/Logo";
// import SceneGroupSelector from "./V2/SceneGroupSelector/SceneGroupSelector";
import Menu from "./V3/Menu/Menu"

export interface ClientGUIProps extends GUIProps {}

export interface ClientGUIState extends GUIState {}

class ClientGUI extends GUI<ClientGUIProps, ClientGUIState> {
    constructor(props: ClientGUIProps) {
        super(props);
        this.props.tourable.onLoadObservable.Add(
            this._observableManager,
            () => {
                this.props.tourable.canvas.current.addEventListener("dblclick", () => {
                    this.toggle();
                });
            },
            false
        );
    }
    render() {
        let menuClient: React.RefObject<Menu> = React.createRef();
        return (
            <Box
                sx={{
                    transition: ".25s",
                    opacity: this.state.hidden ? "0" : "1",
                    pointerEvents: this.state.hidden ? "none" : "all",
                }}
                >
                <Copyright tourable={this.props.tourable} />
                <Menu  tourable={this.props.tourable}/>
                <Hotpots tourable={this.props.tourable}></Hotpots>
                {/* <Library tourable={this.props.tourable} />
                <Logo tourable={this.props.tourable} />
                <SceneGroupSelector tourable={this.props.tourable} /> */}
            </Box>
        );
    }
}

export default ClientGUI;
