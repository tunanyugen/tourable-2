import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import ToolbarItem from "./ToolbarItem";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export interface MapProps extends GUIObjectProps {}

export interface MapState extends GUIObjectState {}

class Map extends GUIObject<MapProps, MapState> {
    constructor(props: MapProps) {
        super(props);
    }
    render() {
        return (
            <ToolbarItem onClick={(e) => {
                console.log("Showing map")
            }}>
                <LocationOnOutlinedIcon />
            </ToolbarItem>
        );
    }
}

export default Map;
