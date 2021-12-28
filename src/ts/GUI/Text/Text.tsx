import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface TextProps extends GUIObjectProps{
    children?:React.ReactElement<any>|string;
}
 
export interface TextState extends GUIObjectState{
    text:string;
}
 
class Text extends GUIObject<TextProps, TextState> {
    private get _className(){ return this.state.hidden ? "hide" : "show" }
    constructor(props: TextProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: true,
            text: "",
        }
        this.props.tourable.sceneManager.onSwitchSceneObservable.Add(() => {
            this.hide()
        }, false)
    }
    render() { 
        return (
            <div
                className={`tourable__text ${this._className}`}
                style={{
                    left: this.state.left,
                    top: this.state.top
                }}
            >
                {this.state.text}
            </div>
        );
    }
    display = (x:number, y:number, text:string) => {
        this.setState({text: text, hidden: false, left: x, top: y})
    }
}
 
export default Text;