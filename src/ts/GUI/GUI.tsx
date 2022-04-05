import GUIObject, { GUIObjectProps, GUIObjectState } from "./GUIObject";

export interface GUIProps extends GUIObjectProps {}

export interface GUIState extends GUIObjectState {}

class GUI<P extends GUIProps = GUIProps, S extends GUIState = GUIState> extends GUIObject<P, S> {
    protected get _className() {
        return this.state.hidden ? "hide" : "show";
    }
    constructor(props: P) {
        super(props);
        this.state = {
            ...this.state,
            hidden: false,
        };
    }
}

export default GUI;
