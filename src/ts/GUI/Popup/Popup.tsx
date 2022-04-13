import { Paper } from "@mui/material";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface PopupProps extends GUIObjectProps{
    
}
 
export interface PopupState extends GUIObjectState{
    content:string;
}
 
class Popup extends GUIObject<PopupProps, PopupState> {
    constructor(props: PopupProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: true,
        }
    }
    render() { 
        return (
            <Paper
                className="ck-content tourable__popup"
                sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    padding: "8px",
                    transform: "translate(-50%, -50%)",
                    transition: ".25s",
                    opacity: this.state.hidden ? "0" : "1",
                    pointerEvents: this.state.hidden ? "none" : "all",
                }}
                onPointerEnter={() => { this.cancelHideTimeout() }}
                onPointerLeave={() => { this.hide() }}
                dangerouslySetInnerHTML={{__html: this.state.content}}
            ></Paper>
        );
    }
    display = (content:string) => {
        this.setState({content}, () => {
            this.show(() => {
                this.delayedHide(1000)
            })
        })
    }
}
 
export default Popup;