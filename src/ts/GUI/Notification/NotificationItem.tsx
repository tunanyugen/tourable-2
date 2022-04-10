import { Paper } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface NotificationItemProps extends GUIObjectProps {}

export interface NotificationItemState extends GUIObjectState {}

class NotificationItem extends GUIObject<NotificationItemProps, NotificationItemState> {
    constructor(props: NotificationItemProps) {
        super(props);
    }
    render() {
        return (
            <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60px", padding: "8px" }}>
                {this.props.children}
            </Paper>
        );
    }
}

export default NotificationItem;
