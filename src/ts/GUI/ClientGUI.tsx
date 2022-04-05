import { Box } from "@mui/material";
import GUI, { GUIProps, GUIState } from "./GUI";

export interface ClientGUIProps extends GUIProps {}

export interface ClientGUIState extends GUIState {}

class ClientGUI extends GUI<ClientGUIProps, ClientGUIState> {
    constructor(props: ClientGUIProps) {
        super(props);
        this.props.tourable.onLoadObservabl.Add(
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
            <>
            </>
        );
    }
}

export default ClientGUI;
