import React from "react";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import ToolbarItem from "./ToolbarItem";
import RoomIcon from '@mui/icons-material/Room';
import { Box, Button, Typography } from "@mui/material";
export interface GPSProps extends GUIObjectProps {}

export interface GPSState extends GUIObjectState {
}

class GPS extends GUIObject<GPSProps, GPSState> {
    constructor(props: GPSProps) {
        super(props);
     
    }

    render() {
        return (
            <Button sx={{
                display: "flex",
                borderRadius: "50px",
                minWidth: "0px",
                backgroundColor: "#fff",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                color: "#053724",
                marginRight: "calc(100vw * 20 / 1280)",
                fontSize: "calc(100vw * 12 / 1280)",
                padding: "0px calc(100vw * 20 / 1280)",
                fontWeight: "800",
                "&:last-child": {
                    marginRight: "0",
                },
                
                "&:hover": {
                    backgroundColor: "#3fa445",
                    color: "#fff"
                }
            }}
                onClick={(e) => {
                    console.log("linked to GPS")
                }}
            >
                    <RoomIcon sx={{
                        display: 'inline-flex',
                        verticalAlign: 'middle',
                        width: "calc(100vw * 28 / 1280)",
                        height: "calc(100vw * 28 / 1280)",
                    }}/>

                    Góc nhìn bản đồ 
            </Button>
        );
    }
}

export default GPS;
