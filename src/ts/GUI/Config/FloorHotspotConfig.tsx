import Button from "@tunanyugen/react-components/src/ts/Form/Button";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import Config from "./Config";

export interface FloorHotspotConfigProps extends GUIObjectProps{
    
}
 
export interface FloorHotspotConfigState extends GUIObjectState{
    
}
 
class FloorHotspotConfig extends GUIObject<FloorHotspotConfigProps, FloorHotspotConfigState> {
    constructor(props: FloorHotspotConfigProps) {
        super(props);
    }
    render() { 
        return (
            <Config tourable={this.props.tourable} title="Edit Hotspot">
                <div className="tourable__config__icon-browser">
                    <Button className="tourable__config__icon-browser__icon"><img src={this.props.tourable.config.assets.floorHotspot} /></Button>
                </div>
            </Config>
        );
    }
}
 
export default FloorHotspotConfig;