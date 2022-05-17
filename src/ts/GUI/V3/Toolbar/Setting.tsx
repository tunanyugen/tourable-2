import React from "react";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import ToolbarItem from "./ToolbarItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, List, ListItem } from "@mui/material";
export interface SettingProps extends GUIObjectProps {}

export interface SettingState extends GUIObjectState {
    openSetting: boolean
}

class Setting extends GUIObject<SettingProps, SettingState> {
    constructor(props: SettingProps) {
        super(props);
        this.state= {
            ...this.state,
            openSetting: false
        }
    }

    render() {
        return (
            <ToolbarItem
                onClick={(e) => {
                    this.state.openSetting === true ? this.setState({openSetting: false}) : this.setState({openSetting: true})
                }}
            >
                    <MoreVertIcon sx={{
                        display: 'inline-flex',
                        verticalAlign: 'middle',
                        width: "calc(100vw * 28 / 1280)",
                        height: "calc(100vw * 28 / 1280)",
                    }}/>
            </ToolbarItem>
        );
    }
}

export default Setting;
