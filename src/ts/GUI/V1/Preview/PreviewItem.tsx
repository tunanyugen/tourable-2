import GUIObject, {GUIObjectProps, GUIObjectState} from "../../GUIObject";

export interface PreviewItemProps extends GUIObjectProps{
    sceneID:number;
}
 
export interface PreviewItemState extends GUIObjectState{
    
}
 
class PreviewItem extends GUIObject<PreviewItemProps, PreviewItemState> {
    constructor(props: PreviewItemProps) {
        super(props);
    }
    render() { 
        let scene = this.props.tourable.sceneManager.scenes.get(this.props.sceneID);
        return (
            <div
                className="tourable__preview__item"
                onClick={(e) => { this.props.tourable.sceneManager.switchScene(this.props.tourable, this.props.sceneID) }}
            >
                <img src={scene.panorama.thumbnail} />
                <p className="tourable__preview__item__name">{scene.panorama.name}</p>
            </div>
        );
    }
}
 
export default PreviewItem;