import React from "react";
import GUIObject, {GUIObjectProps, GUIObjectState} from "../GUIObject";
import UtilityBarItem from "./UtilityBaritem";

export interface UtilityBarProps extends GUIObjectProps{
    children?:React.ReactElement<UtilityBarItem>|React.ReactElement<UtilityBarItem>[];
    direction?:"vertical"|"horizontal";
}
 
export interface UtilityBarState extends GUIObjectState{
    
}
 
class UtilityBar extends GUIObject<UtilityBarProps, UtilityBarState> {
    private get _direction(){ return this.props.direction == "vertical" ? "right" : "top" }
    constructor(props: UtilityBarProps) {
        super(props);
    }
    render() { 
        return (
            <div className={`tourable__utility-bar--${this._direction}`}>
                {this.props.children}
            </div>
        );
    }
}
 
export default UtilityBar;