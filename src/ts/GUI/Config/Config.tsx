import Button from "@tunanyugen/react-components/src/ts/Form/Button/Button";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface ConfigProps extends GUIObjectProps{
    title:string;
    hidden:boolean;
    onClose:()=>any;
    onDelete:()=>any;
}
 
export interface ConfigState extends GUIObjectState{
    
}
 
class Config extends GUIObject<ConfigProps, ConfigState> {
    static defaultProps: ConfigProps = {
        hidden: true,
        onClose: () => {},
        onDelete: () => {},
        title: "",
        tourable: null,
    }
    private get _className(){
        return this.props.hidden ? "hide" : "show";
    }
    constructor(props: ConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: true
        }
    }
    render() {
        return (
            <div className={`tourable__config ${this._className}`}>
                <div className="tourable__config__header">
                    <div className="tourable__config__title">{this.props.title}</div>
                    <Button
                        className="tourable__config__close"
                        onClick={(e) => { this.props.onClose() }}
                    >
                        <i className="fas fa-times"></i>
                    </Button>
                </div>
                <div className="tourable__config__wrapper">
                    {this.props.children}
                </div>
                <div className="tourable__config__footer">
                    <Button
                        className="tourable__config__delete"
                        onClick={this.props.onDelete}
                    >Delete</Button>
                </div>
            </div>
        );
    }
}
 
export default Config;