import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import ToolbarItem from "./ToolbarItem";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export interface MapProps extends GUIObjectProps { }

export interface MapState extends GUIObjectState { }

class Map extends GUIObject<MapProps, MapState> {
    constructor(props: MapProps) {
        super(props);
    }
    render() {
        return (
            <ToolbarItem onClick={(e) => {
                this.props.tourable.uncontrolledGUI.current.popup.current.display(this.props.tourable.panoramas.get(this.props.tourable.sceneManager.sceneToRender.panoramaId).googleMap);
            }}>
                <LocationOnOutlinedIcon />
            </ToolbarItem>
        );
    }
}

export default Map;
