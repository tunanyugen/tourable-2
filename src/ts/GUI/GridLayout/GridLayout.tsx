import { Box, Paper } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import GridLayoutItem from "./GridLayoutItem";

export interface GridLayoutProps extends GUIObjectProps {}

export interface GridLayoutState extends GUIObjectState {
    title: string;
    widthCount: number;
}

class GridLayout extends GUIObject<GridLayoutProps, GridLayoutState> {
    static titleHeight = 40;
    static imageWidth = 240;
    static imageHeight = 120;
    static labelHeight = 20;
    static gap = 8;
    static padding = 4;
    static scrollBarWidth = 16;
    static image = "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png";
    constructor(props: GridLayoutProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: false,
            title: "Title",
            widthCount: Math.floor(
                (window.innerWidth - GridLayout.padding * 2 - GridLayout.scrollBarWidth) / (GridLayout.imageWidth + GridLayout.gap)
            ),
        };
        window.addEventListener("resize", () => {
            if (!this.state.hidden) {
                this.setState({
                    widthCount: Math.floor(
                        (window.innerWidth - GridLayout.padding * 2 - GridLayout.scrollBarWidth) / (GridLayout.imageWidth + GridLayout.gap)
                    ),
                });
            }
        });
    }
    render() {
        return (
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    width:
                        this.state.widthCount * GridLayout.imageWidth +
                        (this.state.widthCount - 1) * GridLayout.gap +
                        GridLayout.padding * 2 +
                        GridLayout.scrollBarWidth,
                    height: "90vh",
                    transition: ".25s",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        flex: `0 0 ${GridLayout.titleHeight}`,
                    }}
                >
                    {this.state.title}
                </Box>
                <Box
                    sx={{
                        position: "relative",
                        flex: "1",
                        overflow: "auto",
                    }}
                >
                    {this.renderItems()}
                </Box>
            </Paper>
        );
    }
    renderItems = () => {
        let items = [];
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < this.state.widthCount; x++) {
                let index = y * this.state.widthCount + x;
                items.push(
                    <GridLayoutItem
                        key={`${x}-${y}`}
                        image={GridLayout.image}
                        index={index}
                        label={`item-${index}`}
                        sx={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            width: GridLayout.imageWidth,
                            height: GridLayout.imageHeight + GridLayout.labelHeight,
                            left: GridLayout.padding + GridLayout.imageWidth * x + x * GridLayout.gap,
                            top: (GridLayout.imageHeight + GridLayout.labelHeight) * y,
                            userSelect: "none",
                            transition: ".25s",
                        }}
                    />
                );
            }
        }
        return items;
    };
}

export default GridLayout;
