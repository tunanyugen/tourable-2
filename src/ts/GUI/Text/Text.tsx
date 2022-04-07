import { Box, ClickAwayListener, Paper } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface TextProps extends GUIObjectProps {
    children?: React.ReactElement<any> | string;
}

export interface TextState extends GUIObjectState {
    content: string;
}

class Text extends GUIObject<TextProps, TextState> {
    constructor(props: TextProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: true,
            content: "",
        };
        this.props.tourable.sceneManager.onSwitchSceneObservable.Add(
            this._observableManager,
            () => {
                this.hide();
            },
            false
        );
    }
    render() {
        return (
            <ClickAwayListener
                onClickAway={(e) => {
                    this.hide();
                }}
            >
                <Paper
                    className="tourable__text"
                    sx={{
                        position: "absolute",
                        left: this.state.left,
                        top: this.state.top,
                        transition: ".25s",
                        opacity: this.state.hidden ? "0" : "1",
                        pointerEvents: "none",
                    }}
                    dangerouslySetInnerHTML={{ __html: this.state.content }}
                ></Paper>
            </ClickAwayListener>
        );
    }
    display = (x: number, y: number, content: string) => {
        this.setState({ content }, () => {
            this.move(x, y, () => {
                this.show();
            });
        });
    };
}

export default Text;
