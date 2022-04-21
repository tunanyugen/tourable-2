import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import ToolbarItem from "./ToolbarItem";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface InfoProps extends GUIObjectProps{
    
}
 
export interface InfoState extends GUIObjectState{
    
}
 
class Info extends GUIObject<InfoProps, InfoState> {
    constructor(props: InfoProps) {
        super(props);
    }
    render() { 
        return (
            <ToolbarItem
                onClick={(e) => {
                    this.props.tourable.uncontrolledGUI.current.popup.current.display(this.props.tourable.sceneManager.sceneToRender.panorama.info);
                }}
            >
                <InfoOutlinedIcon />
            </ToolbarItem>
        );
    }
}
 
export default Info;