import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import ContextMenuComponent from "@tunanyugen/react-components/src/ts/ContextMenu/ContextMenu";
import { ContextMenuItemProps } from "@tunanyugen/react-components/src/ts/ContextMenu/ContextMenuItem";

export interface ContextMenuProps extends GUIObjectProps{
    
}
 
export interface ContextMenuState extends GUIObjectState{
    
}
 
abstract class ContextMenu<P extends ContextMenuProps, S extends ContextMenuState> extends GUIObject<P, S> {
    private get _className(){ return this.state.hidden ? "hide" : "show" }
    private _hideTimeout:NodeJS.Timeout;
    constructor(props: P) {
        super(props);
    }
    render() { 
        return (
            <div
                className={`tourable__context-menu ${this._className}`}
                style={{
                    left: this.state.left,
                    top: this.state.top,
                }}
                onContextMenu={(e) => { e.preventDefault() }}
                onPointerLeave={(e) => {
                    this._hideTimeout = setTimeout(() => {
                        this.hide()
                    }, 500)
                }}
                onPointerEnter={(e) => { this._hideTimeout ? clearTimeout(this._hideTimeout) : null }}
                onClick={(e) => { this.hide() }}
            >
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