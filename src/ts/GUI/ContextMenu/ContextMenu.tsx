import { Box, Button, Paper, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import Tourable from "../../Tourable/Tourable";
import CalculateHeight from "../../Utilities/CalculateHeight";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface ContextMenuProps extends GUIObjectProps {
    items: ContextMenuItemProps[];
    sx: SxProps<Theme>;
}

export interface ContextMenuState extends GUIObjectState {
    items: ContextMenuItemProps[];
}

abstract class ContextMenu<
    P extends ContextMenuProps = ContextMenuProps,
    S extends ContextMenuState = ContextMenuState
> extends GUIObject<P, S> {
    static defaultProps: ContextMenuProps = {
        tourable: null,
        items: [],
        sx: {},
    };
    constructor(props: P) {
        super(props);
        this.state = {
            ...this.state,
            items: this.props.items,
        } as S;
    }
    private _container: React.RefObject<HTMLDivElement> = React.createRef();
    render() {
        return (
            <Paper
                className="tourable__context-menu"
                ref={this._container}
                sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "140px",
                    left: this.state.left,
                    top: this.state.top,
                    transition: ".25s",
                    height: this.state.hidden ? "0px" : `${CalculateHeight(this._container.current)}px`,
                    opacity: this.state.hidden ? "0" : "1",
                    pointerEvents: this.state.hidden ? "none" : "all",
                    ...this.props.sx,
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
        if (!this.state.items || this.state.items.length <= 0) {
            return [];
        }
        return this.state.items.map((item, index) => {
            return <ContextMenuItem key={index} tourable={this.props.tourable} {...item} />;
        });
    };
}
export interface ContextMenuItemProps {
    tourable?: Tourable;
    icon?: () => React.ReactNode;
    name: string;
    onSelect?: () => void;
    children?: ContextMenuItemProps[];
}

export interface ContextMenuItemState {
    contextMenuHidden: boolean;
}

class ContextMenuItem extends React.Component<ContextMenuItemProps, ContextMenuItemState> {
    static defaultProps: ContextMenuItemProps = {
        icon: () => "",
        name: "",
        onSelect: () => {},
        children: [],
    };
    constructor(props: ContextMenuItemProps) {
        super(props);
        this.state = {
            contextMenuHidden: false,
        };
    }
    private _contextMenu: React.RefObject<ContextMenu> = React.createRef();
    render() {
        return (
            <div
                onClick={() => {
                    this.props.onSelect();
                }}
                onPointerEnter={() => {
                    this._contextMenu.current.show();
                }}
                onPointerLeave={() => {
                    this._contextMenu.current.hide();
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        height: "40px",
                        cursor: "pointer",
                        padding: "0 8px",
                        transition: ".25s",
                        ":hover": { backdropFilter: "brightness(0.9)" },
                    }}
                >
                    <Box>{this.props.icon()}</Box>
                    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
                        <Typography display="flex" alignItems="center" fontSize={12}>
                            {this.props.name}
                        </Typography>
                    </Box>
                    <ContextMenu
                        ref={this._contextMenu}
                        tourable={this.props.tourable}
                        items={this.props.children}
                        sx={{ left: "100%", top: "0" }}
                    />
                </Box>
            </div>
        );
    }
}

export default ContextMenu;
