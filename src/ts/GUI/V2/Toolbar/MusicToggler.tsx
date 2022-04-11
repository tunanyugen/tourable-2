import React from "react";
import ToolbarItem from "./ToolbarItem";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";

export interface MusicTogglerProps extends GUIObjectProps {}

export interface MusicTogglerState extends GUIObjectState {}

class MusicToggler extends GUIObject<MusicTogglerProps, MusicTogglerState> {
    constructor(props: MusicTogglerProps) {
        super(props);
    }
    render() {
        return (
            <ToolbarItem
                onClick={(e) => {
                    console.log("Toggling volume");
                }}
            >
                <VolumeUpOutlinedIcon />
            </ToolbarItem>
        );
    }
}

export default MusicToggler;
