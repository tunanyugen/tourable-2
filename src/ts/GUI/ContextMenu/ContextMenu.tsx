import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import Tourable from "../../Tourable/Tourable";
import CalculateHeight from "../../Utilities/CalculateHeight";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface ContextMenuProps extends GUIObjectProps {}

export interface ContextMenuState extends GUIObjectState {}

abstract class ContextMenu<P extends ContextMenuProps = ContextMenuProps, S extends ContextMenuState = ContextMenuState> extends GUIObject<P, S> {
    abstract items: ContextMenuItemProps[];
    constructor(props: P) {
        super(props);
    }
    private _container:React.RefObject<HTMLDivElement> = React.createRef();
    render() {
        return (
            <Paper
                className="tourable__context-menu"
                ref={this._container}
                sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    left: this.state.left,
                    top: this.state.top,
                    transition: ".25s",
                    height: this.state.hidden ? "0px" : `${CalculateHeight(this._container.current)}px`,
                    opacity: this.state.hidden ? "0" : "1",
                    pointerEvents: this.state.hidden ? "none" : "all",
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                }}
                onPointerLeave={(e) => {
                    this.delayedHide(500);
                }}
                onPointerEnter={(e) => {
                    this.cancelHideTimeout();
                }}
                onClick={(e) => {
                    this.hide();
                }}
            >
                {this.renderItems()}
            </Paper>
        );
    }
    renderItems = () => {
        if (!this.items || this.items.length <= 0) {
            return [];
        }
        return this.items.map((item, index) => {
            return <ContextMenuItem key={index} tourable={this.props.tourable} {...item} />;
        });
    };
}
export interface ContextMenuItemProps {
    tourable?: Tourable;
    icon?: string;
    name: string;
    onSelect?: () => void;
    children?: ContextMenuItemProps[];
}

export interface ContextMenuItemState {}

class ContextMenuItem extends React.Component<ContextMenuItemProps, ContextMenuItemState> {
    static defaultProps: ContextMenuItemProps = {
        icon: "",
        name: "",
        onSelect: () => {},
        children: [],
    };
    constructor(props: ContextMenuItemProps) {
        super(props);
    }
    render() {
        return (
            <Button
                sx={{ height: "40px" }}
                onClick={() => {
                    this.props.onSelect();
                }}
            >
                <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
                    <Box sx={{ flex: "0 0 40px", height: "100%" }}>
                        <img src={this.props.icon} style={{ height: "100%", width: "auto" }} />
                    </Box>
                    <Box sx={{ flex: "1", height: "100%" }}>
                        <Typography>{this.props.name}</Typography>
                    </Box>
                </Box>
                <ContextMenu tourable={this.props.tourable} items={this.props.children} />
            </Button>
        );
    }
}

export default ContextMenu;
