import { Button } from "@mui/material";
import GUIObject, {GUIObjectProps, GUIObjectState} from "../../GUIObject";

export interface PlayButtonProps extends GUIObjectProps{
    
}
 
export interface PlayButtonState extends GUIObjectState{
    
}
 
class PlayButton extends GUIObject<PlayButtonProps, PlayButtonState> {
    constructor(props: PlayButtonProps) {
        super(props);
    }
    render() { 
        return (
            <Button
                className="tourable__play-button"
                onClick={(e) => { this.props.tourable.clientGUI.current.hide() }}
            >
                <i className="fas fa-play"></i>
            </Button>
        );
    }
}
 
export default PlayButton;