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
            hidden: true,
        }

        this.onShowObservable.Add(() => {
            this.delayedHide(1000)
        }, false)
    }
    render() { 
        return (
            <div
                className={`ck-content tourable__popup ${this.__className}`}
                onPointerEnter={() => { this.cancelHideTimeout() }}
                onPointerLeave={() => { this.hide() }}
                dangerouslySetInnerHTML={{__html: this.state.content}}
            ></div>
        );
    }
    display = (content:string) => {
        this.setState({
            content: content,
            hidden: false
        })
    }
}
 
export default Popup;