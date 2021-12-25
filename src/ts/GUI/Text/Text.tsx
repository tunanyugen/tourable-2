import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface TextProps extends GUIObjectProps{
    children?:React.ReactElement<any>|string;
}
 
export interface TextState extends GUIObjectState{
    
}
 
class Text extends GUIObject<TextProps, TextState> {
    constructor(props: TextProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: true
        }
    }
    render() { 
        return (
            <div className="tourable__text">
                {this.props.children}
            </div>
        );
    }
}
 
export default Text;