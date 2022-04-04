import * as React from "react";
import ReactDOM from "react-dom";
import Tourable from "../Tourable/Tourable";
import GUIObject, { GUIObjectProps, GUIObjectState } from "./GUIObject";

export interface GUIProps extends GUIObjectProps {}

export interface GUIState extends GUIObjectState {}

class GUI<P extends GUIProps = GUIProps, S extends GUIState = GUIState> extends GUIObject<P, S> {
    private get _className() {
        return this.state.hidden ? "hide" : "show";
    }

    constructor(props: P) {
        super(props);
        this.state = {
            ...this.state,
            hidden: false,
        };
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
            <React.Fragment>
                <div className={`tourable ${this._className}`}></div>
            </React.Fragment>
        );
    }
}

export default GUI;
