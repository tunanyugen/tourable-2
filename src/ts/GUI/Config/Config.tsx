import { Button, ButtonProps, Paper, TextFieldProps } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
    protected _textFieldProps: TextFieldProps = {
        fullWidth: true,
        size: "small",
    };
    constructor(props: P) {
        super(props);
        // hide on click on canvas
        this.props.tourable.onLoadObservable.Add(
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
        this.onShowObservable.Add(
            this._observableManager,
            () => {
                this.syncSettings();
            },
            false
        );
        this.onHideObservable.Add(
            this._observableManager,
            () => {
                this.applySettings();
            },
            false
        );
    }
    render() {
        return (
            <Paper
                className="tourable__config"
                sx={{
                    display: "flex",
                    gap: "8px",
                    flexDirection: "column",
                    position: "absolute",
                    width: "360px",
                    height: "100%",
                    padding: "8px 8px 0px 8px",
                    left: this.state.hidden ? "100%" : "calc(100% - 360px)",
                    top: "0",
                    transition: ".25s",
                    overflow: "auto",
                    zIndex: "99",
                }}
            >
                <Paper elevation={6} sx={{ flex: "1", overflow: "auto", padding: "8px" }}>
                    {this.renderComponents()}
                </Paper>
                <Paper elevation={6} sx={{ flex: "0 0 60px" }}>
                    {this.renderButtons()}
                </Paper>
            </Paper>
        );
    }
    renderButtons = () => {
        const buttonAttributes: ButtonProps = {
            sx: {
                flex: "1",
                height: "40px",
            },
            variant: "contained",
        };
        return (
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "0px 8px",
                    height: "100%",
                }}
            >
                <Button {...buttonAttributes} color="error" onClick={this.state.onDelete}>
                    <DeleteOutlinedIcon />
                </Button>
                <Button {...buttonAttributes} color="info" onClick={this.state.onEdit}>
                    <EditOutlinedIcon />
                </Button>
            </Paper>
        );
    };
    setTarget = (target: T) => {
        this.target = target;
        this.setState(
            {
                hidden: false,
            },
            () => {
                this.show();
            }
        );
    };
    abstract renderComponents: () => JSX.Element;
    abstract syncSettings: () => void;
    abstract applySettings: () => void;
}

export default Config;
