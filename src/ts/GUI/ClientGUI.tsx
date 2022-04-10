import GUI, { GUIProps, GUIState } from "./GUI";
import Library from "./V2/Library/Library";

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
            <>
                <Library tourable={this.props.tourable} />
            </>
        );
    }
}

export default ClientGUI;
