import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface PopupProps extends GUIObjectProps{
    
}
 
export interface PopupState extends GUIObjectState{
    content:string;
}
 
class Popup extends GUIObject<PopupProps, PopupState> {
    private get __className(){ return this.state.hidden ? "hide" : "show" }
    constructor(props: PopupProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: false,
            content: "<h1>Hello world</h1>"
        }
    }
    render() { 
        return (
            <div
                className={`tourable__popup ${this.__className}`}
                dangerouslySetInnerHTML={{__html: this.state.content}}
            ></div>
        );
    }
}
 
export default Popup;