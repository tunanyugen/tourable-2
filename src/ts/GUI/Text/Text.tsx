import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface TextProps extends GUIObjectProps{
    children?:React.ReactElement<any>|string;
}
 
export interface TextState extends GUIObjectState{
    content:string;
}
 
class Text extends GUIObject<TextProps, TextState> {
    private get _className(){ return this.state.hidden ? "hide" : "show" }
    constructor(props: TextProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: true,
            content: "",
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
                dangerouslySetInnerHTML={{__html: this.state.content}}
                onPointerLeave={() => { this.delayedHide(500) }}
            >
            </div>
        );
    }
    display = (x:number, y:number, content:string) => {
        this.setState({content}, () => {
            this.move(x, y, () => {
                this.show();
            })
        })
    }
}
 
export default Text;