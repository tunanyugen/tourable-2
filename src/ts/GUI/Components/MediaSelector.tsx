import { Box, Typography } from "@mui/material";
import React from "react";

export interface MediaSelectorProps {
    medias: MediaSelectorMediaProps[];
    defaultValue: string;
    onSelect: (value: string) => void;
}

export interface MediaSelectorState {
    value: string;
}

class MediaSelector extends React.Component<MediaSelectorProps, MediaSelectorState> {
    static defaultProps: MediaSelectorProps = {
        medias: [],
        defaultValue: "",
        onSelect: () => {},
    };
    constructor(props: MediaSelectorProps) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
        };
    }
    render() {
        return <Box className="tourable__media-selector">{this.renderImages()}</Box>;
    }
    renderImages = () => {
        return this.props.medias.map((media, index) => {
            return <MediaSelectorMedia key={index} onSelect={this.props.onSelect} selected={this.state.value == media.src} {...media} />;
        });
    };
}

export interface MediaSelectorMediaProps {
    label?: string;
    src: string;
    selected?: boolean;
    onSelect?: (value: string) => void;
}

export interface MediaSelectorMediaState {}

class MediaSelectorMedia extends React.Component<MediaSelectorMediaProps, MediaSelectorMediaState> {
    static defaultProps: MediaSelectorMediaProps = {
        label: "",
        src: "",
        selected: false,
        onSelect: () => {},
    };
    constructor(props: MediaSelectorMediaProps) {
        super(props);
    }
    render() {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onClick={(e) => {
                    this.props.onSelect(this.props.src);
                }}
            >
                <Box sx={{ flex: "1" }}>
                    <img src={this.props.src} />
                </Box>
                {this.renderLabel()}
            </Box>
        );
    }
    renderLabel = () => {
        if (this.props.label.length <= 0) {
            return "";
        }
        return (
            <Box sx={{ flex: "0 0 40px" }}>
                <Typography>{this.props.label}</Typography>
            </Box>
        );
    };
}

export default MediaSelector;
