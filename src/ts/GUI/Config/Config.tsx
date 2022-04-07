import { Box, Button, Paper } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface ConfigProps extends GUIObjectProps {}

export interface ConfigState extends GUIObjectState {
    title: string;
    hidden: boolean;
    onClose: () => any;
    onDelete: () => any;
    onEdit: () => any;
}

abstract class Config<T, P extends ConfigProps, S extends ConfigState> extends GUIObject<P, S> {
    abstract target: T;
    constructor(props: P) {
        super(props);
        // hide on click on canvas
        this.props.tourable.onLoadObservabl.Add(
            this._observableManager,
            () => {
                this.props.tourable.canvas.current.addEventListener("click", () => {
                    if (!this.state.hidden) {
                        this.hide();
                    }
                });
            },
            true
        );
    }
    componentDidUpdate(prevProps: Readonly<ConfigProps>, prevState: Readonly<ConfigState>, snapshot?: any): void {
        if (!prevState.hidden && prevState.hidden != this.state.hidden) {
            this.target = null;
        }
    }
    render() {
        return (
            <Paper
                className="tourable__config"
                sx={{
                    position: "absolute",
                    width: "360px",
                    height: "100%",
                    padding: "40px 8px 40px 8px",
                    left: this.state.hidden ? "100%" : "calc(100% - 360px)",
                    top: "0",
                    transition: ".25s",
                }}
            >
                {this.renderComponents()}
                {this.renderEditButton()}
            </Paper>
        );
    }
    renderEditButton = () => {
        if (!this.state.onEdit) {
            return "";
        }
        return <Button onClick={this.state.onEdit}>Edit</Button>;
    };
    setTarget = (target: T) => {
        this.target = target;
        this.setState({
            hidden: false,
        });
        this.show();
    };
    abstract renderComponents: () => JSX.Element;
}

export default Config;
