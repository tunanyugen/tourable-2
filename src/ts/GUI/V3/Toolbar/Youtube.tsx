import React from "react";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import ToolbarItem from "./ToolbarItem";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "@mui/material";
export interface YoutubeProps extends GUIObjectProps {}

export interface YoutubeState extends GUIObjectState {
}

class Youtube extends GUIObject<YoutubeProps, YoutubeState> {
    constructor(props: YoutubeProps) {
        super(props);
     
    }

    render() {
        return (
            <ToolbarItem
                onClick={(e) => {
                    console.log("linked to youtube")
                }}
            >
                <Link sx={{color: "inherit"}} href="https://www.youtube.com/">
                    <YouTubeIcon sx={{
                        display: 'inline-flex',
                        verticalAlign: 'middle',
                        width: "calc(100vw * 28 / 1280)",
                        height: "calc(100vw * 28 / 1280)",
                    }}/>

                </Link>
            </ToolbarItem>
        );
    }
}

export default Youtube;
