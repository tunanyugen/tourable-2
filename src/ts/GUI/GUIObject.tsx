import * as React from 'react';
import Tourable from '../Tourable/Tourable';

export interface GUIObjectProps {
    tourable:Tourable
}
 
export interface GUIObjectState {
    hidden:boolean;
    left:number;
    top:number;
}
 
abstract class GUIObject<P extends GUIObjectProps, S extends GUIObjectState> extends React.Component<P, S> {
    constructor(props: P){
        super(props);
        this.state = {
            ...this.state,
            hidden: true,
            left: 0,
            top: 0
        }
    }
    move = (x:number, y:number) => {
        this.setState({left: x, top: y})
    }
    show = () => {
        this.setState({hidden: false})
    }
    hide = () => {
        this.setState({hidden: true})
    }
    toggle = () => {
        this.setState({hidden: !this.state.hidden})
    }
}
 
export default GUIObject;