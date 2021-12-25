import { ContextMenuItemProps } from "@tunanyugen/react-components/src/ts/ContextMenu/ContextMenuItem";
import ContextMenu, { ContextMenuProps, ContextMenuState } from "./ContextMenu";
import FloorHotspot from "../../SceneObject/FloorHotspot/FloorHotspot";

export interface GeneralContextMenuProps extends ContextMenuProps{
    
}
 
export interface GeneralContextMenuState extends ContextMenuState{
    
}
 
class GeneralContextMenu extends ContextMenu<GeneralContextMenuProps, GeneralContextMenuState> {
    constructor(props: GeneralContextMenuProps) {
        super(props);
        this.props.tourable.onLoadObservabl.Add(() => {
            this.props.tourable.eventManager.mouse2.onButtonUpObservable.Add((e) => {
                let result = this.props.tourable.sceneObjectManager.pick(this.props.tourable)
                if (!result){
                    this.move(e.clientX, e.clientY);
                    this.show();
                }
            }, false)
        }, true)
        this.state = {
            ...this.state,
            hidden: true
        }
    }
    renderItems = ():ContextMenuItemProps[] => {
        return [
            {
                icon: "",
                name: "Hotspot",
                contextMenuProps: {
                    itemsProps: [
                        {
                            icon: "",
                            name: "Create floor hotspot",
                            onClick: () => {
                                let hotspot = new FloorHotspot(this.props.tourable, this.props.tourable.sceneManager.sceneToRender.id);
                            }
                        }
                    ]
                }
            }
        ]
    }
}
 
export default GeneralContextMenu;