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
                    console.log("Showing info");
                }}
            >
                <InfoOutlinedIcon />
            </ToolbarItem>
        );
    }
}
 
export default Info;