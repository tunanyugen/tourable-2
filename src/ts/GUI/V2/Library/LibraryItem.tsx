import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { GUIObjectProps, GUIObjectState } from "../../GUIObject";

export interface LibraryItemProps extends GUIObjectProps {
    label: string;
    src: string;
    onClick:React.MouseEventHandler<HTMLDivElement>;
}

export interface LibraryItemState extends GUIObjectState {}

class LibraryItem extends React.Component<LibraryItemProps, LibraryItemState> {
    static defaultProps: LibraryItemProps = {
        tourable: null,
        label: "",
        src: "",
        onClick: () => {}
    };
    constructor(props: LibraryItemProps) {
        super(props);
    }
    render() {
        return (
            <div onClick={this.props.onClick}>
                <Paper sx={{ position: "relative", flex: "0 0 220px", height: "120px", userSelect: "none", cursor: "pointer" }}>
                    <Box sx={{ width: "100%", height: "100%", cursor: "pointer" }}>
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                            src={this.props.src}
                        />
                    </Box>
                    <Box
                        sx={{
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(0deg, rgba(79,79,79,1) 0%, rgba(79,79,79,0) 100%)",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            position: "absolute",
                            left: "0px",
                            bottom: "10px",
                            color: "#ffffff",
                        }}
                    >
                        <Typography>{this.props.label}</Typography>
                    </Box>
                </Paper>
            </div>
        );
    }
}

export default LibraryItem;
