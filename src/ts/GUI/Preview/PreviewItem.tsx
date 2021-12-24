import GUIObject, {GUIObjectProps, GUIObjectState} from "../GUIObject";

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
            <div className="tourable__preview__item">
                <img src={scene.panorama.src} />
                <p className="tourable__preview__item__name">{scene.panorama.name}</p>
            </div>
        );
    }
}
 
export default PreviewItem;