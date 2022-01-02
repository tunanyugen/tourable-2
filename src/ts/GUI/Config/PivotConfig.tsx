import Pivot from "../../SceneObject/Pivot/Pivot";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import Config from "./Config";

export interface PivotConfigProps extends GUIObjectProps{
    
}
 
export interface PivotConfigState extends GUIObjectState{
    
}
 
class PivotConfig extends GUIObject<PivotConfigProps, PivotConfigState> {
    target:Pivot = null;
    constructor(props: PivotConfigProps) {
        super(props);
    }
    render() { 
        return (
            <Config
                tourable={this.props.tourable}
                title="Edit pivot"
                hidden={this.state.hidden}
                onClose={() => { this.hide() }}
                onDelete={() => {
                    if (!this.target){ return }
                    this.target.dispose();
                    this.hide();
                }}
            >

            </Config>
        );
    }
    setTarget = (pivot:Pivot) => {
        this.target = pivot;
        this.setState({
            hidden: false,
        })
        this.show();
    }
}
 
export default PivotConfig;