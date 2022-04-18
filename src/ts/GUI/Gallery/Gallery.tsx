import { Paper } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import GalleryItem, { GalleryItemProps } from "./GalleryItem";

export interface GalleryProps extends GUIObjectProps {}

export interface GalleryState extends GUIObjectState {
    multiple: boolean;
    items: GalleryItemProps[];
}

class Gallery extends GUIObject<GalleryProps, GalleryState> {
    constructor(props: GalleryProps) {
        super(props);
        this.state = {
            ...this.state,
            multiple: false,
            items: [],
        };
    }
    render() {
        return (
            <Paper
                sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "50vw",
                    height: "50vh",
                    transform: "translate(-50%, -50%)",
                    opacity: this.state.hidden ? "0" : "1",
                    pointerEvents: this.state.hidden ? "none" : "all",
                }}
            >
                {this.renderItems()}
            </Paper>
        );
    }
    renderItems = () => {
        return this.state.items.map((props, index) => {
            return <GalleryItem {...props} key={`${props.label}-${index}`} />;
        });
    };
    display = (multiple: boolean, items: []) => {
        this.setState({ hidden: false, multiple, items });
    };
}

export default Gallery;
