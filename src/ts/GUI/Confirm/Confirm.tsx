import { Box, Button, Paper, Typography } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface ConfirmProps extends GUIObjectProps {}

export interface ConfirmState extends GUIObjectState {
    message: string;
    onConfirm: Function;
    onCancel: Function;
}

class Confirm extends GUIObject<ConfirmProps, ConfirmState> {
    constructor(props: ConfirmProps) {
        super(props);
        this.state = {
            ...this.state,
            message: "",
        };
    }
    render() {
        return (
            <Paper
                className={`tourable__confirm`}
                sx={{
                    position: "absolute",
                    transition: ".25s",
                    opacity: this.state.hidden ? "0" : "1",
                    pointerEvents: this.state.hidden ? "none" : "all",
                }}
            >
                <Typography>{this.state.message}</Typography>
                <Box>
                    <Button
                        onClick={() => {
                            this.state.onConfirm();
                            this.hide();
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => {
                            this.state.onCancel();
                            this.hide();
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Paper>
        );
    }
    display = (message: string, onConfirm: Function, onCancel: Function) => {
        this.setState({ message, onConfirm, onCancel }, () => {
            this.show();
        });
    };
}

export default Confirm;
