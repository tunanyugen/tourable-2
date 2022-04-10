import { Box } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import NotificationItem from "./NotificationItem";

export interface NotificationProps extends GUIObjectProps {}

export interface NotificationState extends GUIObjectState {
    messages: Map<number, string>;
}

class Notification extends GUIObject<NotificationProps, NotificationState> {
    constructor(props: NotificationProps) {
        super(props);
        this.state = {
            ...this.state,
            messages: new Map(),
        };
    }
    render() {
        return (
            <Box
                className="tourable__notification"
                sx={{ display: "flex", flexDirection: "column", gap: "8px", position: "absolute", right: "8px", bottom: "8px" }}
            >
                {this.renderItems()}
            </Box>
        );
    }
    renderItems = () => {
        return Array.from(this.state.messages).map(([key, value], index) => {
            return (
                <NotificationItem key={`${new Date().getTime()}-${key}`} tourable={this.props.tourable}>
                    {value}
                </NotificationItem>
            );
        });
    };
    notify = (message: string, duration: number = 500) => {
        let id = Date.now();
        this.state.messages.set(id, message);
        this.forceUpdate();
        setTimeout(() => {
            this.state.messages.delete(id);
            this.forceUpdate();
        }, duration);
    };
}

export default Notification;
