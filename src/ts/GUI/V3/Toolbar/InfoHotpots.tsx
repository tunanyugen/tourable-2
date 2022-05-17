import React from "react";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import ToolbarItem from "./ToolbarItem";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from "@mui/material";
export interface InfoHotpotsProps extends GUIObjectProps {}

export interface InfoHotpotsState extends GUIObjectState {
}

class InfoHotpots extends GUIObject<InfoHotpotsProps, InfoHotpotsState> {
    constructor(props: InfoHotpotsProps) {
        super(props);
     
    }

    render() {
        return (
            <ToolbarItem
                onClick={(e) => {
                    console.log("open Info")
                }}
            >
                    <InfoOutlinedIcon sx={{
                        display: 'inline-flex',
                        verticalAlign: 'middle',
                        width: "calc(100vw * 28 / 1280)",
                        height: "calc(100vw * 28 / 1280)",
                    }}/>
            </ToolbarItem>
        );
    }
}

export default InfoHotpots;
