import * as React from 'react';
import Pivot from "../../SceneObject/Pivot/Pivot";
import Config, { ConfigProps, ConfigState } from "./Config";

export interface PivotConfigProps extends ConfigProps{
    
}
 
export interface PivotConfigState extends ConfigState{
    
}
 
class PivotConfig extends Config<Pivot, PivotConfigProps, PivotConfigState> {
    target:Pivot = null;
    constructor(props: PivotConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            title: "Edit pivot",
            hidden: true,
            onClose: () => { this.hide() },
            onDelete: () => {
                if (!this.target){ return }
                this.target.dispose(this.props.tourable);
                this.hide();
            }
        }
    }
    renderComponents = () => {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}
 
export default PivotConfig;