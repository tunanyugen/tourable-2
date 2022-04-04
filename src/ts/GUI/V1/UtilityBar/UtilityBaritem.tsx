import GUIObject, {GUIObjectProps, GUIObjectState} from "../../GUIObject";
import Button from "@tunanyugen/react-components/src/ts/Form/Button/Button";

export interface UtilityBarItemProps extends GUIObjectProps{
    onClick:React.MouseEventHandler<HTMLButtonElement>;
}
 
export interface UtilityBarItemState extends GUIObjectState{
    
}
 
class UtilityBarItem extends GUIObject<UtilityBarItemProps, UtilityBarItemState> {
    static defaultProps:UtilityBarItemProps = {
        tourable: null,
        onClick: () => {}
    }
    constructor(props: UtilityBarItemProps) {
        super(props);
    }
    render() { 
        return (
            <Button
                className="tourable__utility-bar__item"
                onClick={this.props.onClick}
            >
                {this.props.children}
            </Button>
        );
    }
}
 
export default UtilityBarItem;