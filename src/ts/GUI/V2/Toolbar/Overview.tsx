import GUIObject, { GUIObjectProps, GUIObjectState } from "../../GUIObject";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ToolbarItem from "./ToolbarItem";

export interface OverviewProps extends GUIObjectProps {}

export interface OverviewState extends GUIObjectState {}

class Overview extends GUIObject<OverviewProps, OverviewState> {
    constructor(props: OverviewProps) {
        super(props);
    }
    render() {
        return (
            <ToolbarItem
                onClick={(e) => {
                    this.props.tourable.uncontrolledGUI.current.popup.current.display(this.renderContent());
                }}
            >
                <MapOutlinedIcon />
            </ToolbarItem>
        );
    }
    renderContent = () => {
        let overview = this.props.tourable.sceneManager.sceneToRender.panorama.overview;
        if (!overview || overview.length <= 0){
            return "No data"
        } else {
            return overview;
        }
    }
}

export default Overview;
