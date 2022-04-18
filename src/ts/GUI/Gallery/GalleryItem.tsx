import { Paper } from "@mui/material";
import * as React from "react";

export interface GalleryItemProps {
    selected: boolean;
    thumbnail: string;
    label: string;
    onClick: () => React.MouseEventHandler<HTMLDivElement>;
}

export interface GalleryItemState {}

class GalleryItem extends React.Component<GalleryItemProps, GalleryItemState> {
    constructor(props: GalleryItemProps) {
        super(props);
    }
    render() {
        return (
            <div onClick={this.props.onClick}>
                <Paper></Paper>
            </div>
        );
    }
}

export default GalleryItem;
