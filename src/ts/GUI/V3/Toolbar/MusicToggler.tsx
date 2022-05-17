import React from "react";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import ToolbarItem from "./ToolbarItem";

export interface MusicTogglerProps extends GUIObjectProps {}

export interface MusicTogglerState extends GUIObjectState {
    musicOn: boolean
}

class MusicToggler extends GUIObject<MusicTogglerProps, MusicTogglerState> {
    constructor(props: MusicTogglerProps) {
        super(props);
        this.state = {
            ...this.state,
            musicOn: true
        }
    }

    renderItem(musicOn) {
        if(musicOn == true) {
            return (
            <VolumeUpOutlinedIcon sx={{
                    display: 'inline-flex',
                    verticalAlign: 'middle',
                    width: "calc(100vw * 28 / 1280)",
                    height: "calc(100vw * 28 / 1280)",

                }} />
            )
        }  
        else {
            return (
                <VolumeOffIcon sx={{
                    display: 'inline-flex',
                    verticalAlign: 'middle',
                    width: "calc(100vw * 28 / 1280)",
                    height: "calc(100vw * 28 / 1280)",

                }}/>
        )
    }
    }
    render() {
        return (
            <ToolbarItem
                onClick={(e) => {
                    this.state.musicOn === true ? this.setState({musicOn: false}) : this.setState({musicOn: true})
                }}
            >
                {this.renderItem(this.state.musicOn)}
            </ToolbarItem>
        );
    }
}

export default MusicToggler;
