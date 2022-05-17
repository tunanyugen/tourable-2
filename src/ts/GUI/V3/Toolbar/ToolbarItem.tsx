import { Box, Button } from "@mui/material";
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
                    display: "flex",
                    width: "calc(100vw * 40 / 1280)",
                    height: "calc(100vw * 40 / 1280)",
                    borderRadius: "50%",
                    minWidth: "0px",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#053724",
                    marginRight: "calc(100vw * 20 / 1280)",

                    "&:last-child": {
                        marginRight: "0",
                    },
                    
                    "&:hover": {
                        backgroundColor: "#3fa445",
                        color: "#fff"
                    }
                }}
                onClick={this.props.onClick}
            >
                
                {this.props.children}
            </Button>
        );
    }
}

export default ToolbarItem;
