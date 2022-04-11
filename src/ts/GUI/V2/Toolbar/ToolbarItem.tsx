import { Button } from "@mui/material";
import React from "react";

export interface ToolbarItemProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ToolbarItemState {}

class ToolbarItem extends React.Component<ToolbarItemProps, ToolbarItemState> {
    constructor(props: ToolbarItemProps) {
        super(props);
    }
    render() {
        return (
            <Button
                sx={{
                    width: "30px",
                    height: "30px",
                    border: "2px solid #ffffff",
                    borderRadius: "4px",
                    color: "#ffffff",
                    minWidth: "0px",
                }}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </Button>
        );
    }
}

export default ToolbarItem;
