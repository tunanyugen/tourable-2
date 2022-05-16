import { Box, SxProps, Theme } from "@mui/material";
import * as React from "react";
import GridLayout from "./GridLayout";

export interface GridLayoutItemProps {
    image: string;
    label: string;
    index: number;
    sx: SxProps<Theme>;
}

export interface GridLayoutItemState {}

class GridLayoutItem extends React.Component<GridLayoutItemProps, GridLayoutItemState> {
    constructor(props: GridLayoutItemProps) {
        super(props);
    }
    render() {
        return (
            <Box
                className="tourable__grid-layout__item"
                sx={this.props.sx}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        flex: `0 0 ${GridLayout.imageHeight}`,
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={this.props.image}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <Box
                        className="tourable__grid-layout__item__index"
                        sx={{
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            opacity: "0",
                            color: "white",
                            transition: "0.25s",
                        }}
                    >
                        {this.props.index}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: "0 0 $labelHeight",
                    }}
                >
                    {this.props.label}
                </Box>
            </Box>
        );
    }
}

export default GridLayoutItem;
