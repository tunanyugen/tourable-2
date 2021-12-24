import * as React from 'react';
import Tourable from '../Tourable/Tourable';

export interface GUIObjectProps {
    tourable:Tourable
}
 
export interface GUIObjectState {
    hidden:boolean;
}
 
abstract class GUIObject<P extends GUIObjectProps, S extends GUIObjectState> extends React.Component<P, S> {
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