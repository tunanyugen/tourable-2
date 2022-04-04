import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface BubbleProps extends GUIObjectProps{
    
}
 
export interface BubbleState extends GUIObjectState{
    content:string;
}
 
class Bubble extends GUIObject<BubbleProps, BubbleState> {
    constructor(props: BubbleProps) {
        super(props);
        this.state = {
            ...this.state,
            content: ""
        }
    }
    render() { 
        return (
            <div className="tourable__bubble" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
        );
    }
    display = (content:string) => {
        this.setState({content: content}, () => {
            this.show()
        })
    }
}
 
export default Bubble;