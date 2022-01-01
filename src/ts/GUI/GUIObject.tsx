import Observable from '@tunanyugen/observable';
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
    onShowObservable:Observable = new Observable(null, false);
    onHideObservable:Observable = new Observable(null, false);
    private _hideTimeout:NodeJS.Timeout;
    constructor(props: P){
        super(props);
        this.state = {
            ...this.state,
            hidden: true,
            left: 0,
            top: 0
        }
    }
    move = (x:number, y:number, callback:()=>void = () => {}) => {
        this.setState({left: x, top: y})
    }
    show = (callback:()=>void = () => {}) => {
        this.setState({hidden: false}, callback);
        this.onShowObservable.Resolve();
    }
    hide = (callback:()=>void = () => {}) => {
        this.setState({hidden: true}, callback);
        this.onHideObservable.Resolve();
    }
    delayedHide = (duration:number, callback:()=>void = () => {}) => {
        this.cancelHideTimeout();
        this._hideTimeout = setTimeout(() => {
            this.hide(callback);
        }, duration);
    }
    cancelHideTimeout = () => {
        if (this._hideTimeout){ clearTimeout(this._hideTimeout) }
    }
    toggle = (callback:()=>void = () => {}) => {
        this.setState({hidden: !this.state.hidden}, callback)
    }
}
 
export default GUIObject;