import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import ContextMenuComponent from "@tunanyugen/react-components/src/ts/ContextMenu/ContextMenu";
import { ContextMenuItemProps } from "@tunanyugen/react-components/src/ts/ContextMenu/ContextMenuItem";

export interface ContextMenuProps extends GUIObjectProps{
    
}
 
export interface ContextMenuState extends GUIObjectState{
    
}
 
abstract class ContextMenu<P extends ContextMenuProps, S extends ContextMenuState> extends GUIObject<P, S> {
    constructor(props: P) {
        super(props);
    }
    render() { 
        return (
            <div className="tourable__context-menu">
                <ContextMenuComponent
                    hidden={this.state.hidden}
                    itemsProps={this.renderItems()}
                />
            </div>
        );
    }
    abstract renderItems: () => ContextMenuItemProps[];
}
 
export default ContextMenu;