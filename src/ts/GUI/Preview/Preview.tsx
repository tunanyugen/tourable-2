import GUIObject, {GUIObjectProps, GUIObjectState} from "../GUIObject";
import PreviewItem from "./PreviewItem";

export interface PreviewProps extends GUIObjectProps{
    
}
 
export interface PreviewState extends GUIObjectState{
    
}
 
class Preview extends GUIObject<PreviewProps, PreviewState> {
    constructor(props: PreviewProps) {
        super(props);
    }
    render() { 
        return (
            <div className="tourable__preview">
                {this.renderItems()}
            </div>
        );
    }
    renderItems = () => {
        let items:React.ReactElement<PreviewItem>[] = [];
        this.props.tourable.sceneManager.scenes.forEach((scene, key) => {
            items.push(
                <PreviewItem
                    tourable={this.props.tourable}
                    sceneID={scene.id}
                />
            )
        })
        return items;
    }
}
 
export default Preview;