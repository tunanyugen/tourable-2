import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ToolbarItem from "./ToolbarItem";

export interface ProjectMapProps extends GUIObjectProps{
    
}
 
export interface ProjectMapState extends GUIObjectState{
    
}
 
class ProjectMap extends GUIObject<ProjectMapProps, ProjectMapState> {
    constructor(props: ProjectMapProps) {
        super(props);
    }
    render() { 
        return (
            <ToolbarItem
                onClick={(e) => {
                    console.log("Showing project map");
                }}
            >
                <MapOutlinedIcon />
            </ToolbarItem>
        );
    }
}
 
export default ProjectMap;