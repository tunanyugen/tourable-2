import { GUIObjectProps, GUIObjectState }, GUIObject from "../../GUIObject";

export interface ToolbarProps extends GUIObjectProps{
    
}
 
export interface ToolbarState extends GUIObjectState{
    
}
 
class Toolbar extends GUIObject<ToolbarProps, ToolbarState> {
    constructor(props: ToolbarProps) {
        super(props);
    }
    render() { 
        return (
            <Box
        );
    }
}
 
export default Toolbar;