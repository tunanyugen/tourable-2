import GUIObject, {GUIObjectProps, GUIObjectState} from "../../GUIObject";
import PreviewItem from "./PreviewItem";

export interface PreviewProps extends GUIObjectProps{
    
}
 
export interface PreviewState extends GUIObjectState{
    
}
 
class Preview extends GUIObject<PreviewProps, PreviewState> {
    constructor(props: PreviewProps) {
        super(props);

        this.props.tourable.onLoadObservabl.Add(this._observableManager, () => {
            this.forceUpdate();
        }, true)
    }
    render() { 
        return (
            <div className="tourable__preview">
                <div className="tourable__preview__wrapper">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
    renderItems = () => {
        let items:React.ReactElement<PreviewItem>[] = [];
        this.props.tourable.sceneManager.scenes.forEach((scene, key) => {
            items.push(
                <PreviewItem
                    key={`preview-item-${key}`}
                    tourable={this.props.tourable}
                    sceneID={scene.id}
                />
            )
        })
        return items;
    }
}
 
export default Preview;