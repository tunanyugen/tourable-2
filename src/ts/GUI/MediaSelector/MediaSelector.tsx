import { Box, Paper, Typography } from "@mui/material";
import React from "react";

export interface MediaSelectorProps {
    medias: MediaSelectorMediaProps[];
    defaultValue: string;
    onSelect: (value: MediaSelectorMediaProps) => void;
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
        return (
            <Box
                className="tourable__media-selector"
                sx={{ display: "grid", gap: "8px", gridTemplateColumns: "repeat(auto-fit, minmax(159px, 1fr))" }}
            >
                {this.renderImages()}
            </Box>
        );
    }
    renderImages = () => {
        return this.props.medias.map((media, index) => {
            return (
                <MediaSelectorMedia
                    key={index}
                    onSelect={this.props.onSelect}
                    selected={this.state.value == media.src}
                    {...media}
                />
            );
        });
    };
}

export interface MediaSelectorMediaProps {
    label?: string;
    src: string;
    selected?: boolean;
    onSelect?: (value: MediaSelectorMediaProps) => void;
    size?: { x: number; y: number };
}

export interface MediaSelectorMediaState {}

class MediaSelectorMedia extends React.Component<MediaSelectorMediaProps, MediaSelectorMediaState> {
    static defaultProps: MediaSelectorMediaProps = {
        label: "",
        src: "",
        selected: false,
        onSelect: () => {},
        size: { x: -1, y: -1 },
    };
    constructor(props: MediaSelectorMediaProps) {
        super(props);
    }
    render() {
        return (
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "4px",
                    background: "#f1f1f1",
                    transition: ".25s",
                    cursor: "pointer",
                    ":hover": {
                        filter: "brightness(0.9)"
                    }
                }}
                onClick={(e) => {
                    this.props.onSelect(this.props);
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                        src={this.props.src}
                    />
                </Box>
                {this.renderLabel()}
            </Paper>
        );
    }
    renderLabel = () => {
        if (this.props.label.length <= 0) {
            return "";
        }
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "0 0 40px" }}>
                <Typography>{this.props.label}</Typography>
            </Box>
        );
    };
}

export default MediaSelector;
