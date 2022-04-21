import { Box } from "@mui/material";
import GUI, { GUIProps, GUIState } from "./GUI";
import Copyright from "./V2/Copyright/Copyright";
import Library from "./V2/Library/Library";
import Logo from "./V2/Logo/Logo";
import SceneGroupSelector from "./V2/SceneGroupSelector/SceneGroupSelector";

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
        return (
            <Box
                sx={{
                    transition: ".25s",
                    opacity: this.state.hidden ? "0" : "1",
                    pointerEvents: this.state.hidden ? "none" : "all",
                }}
            >
                <Library tourable={this.props.tourable} />
                <Copyright tourable={this.props.tourable} />
                <Logo tourable={this.props.tourable} />
                <SceneGroupSelector tourable={this.props.tourable} />
            </Box>
        );
    }
}

export default ClientGUI;
