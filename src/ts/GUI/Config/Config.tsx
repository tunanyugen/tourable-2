import Button from "@tunanyugen/react-components/src/ts/Form/Button";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface ConfigProps extends GUIObjectProps{
    title:string;
}
 
export interface ConfigState extends GUIObjectState{
    
}
 
class Config extends GUIObject<ConfigProps, ConfigState> {
    private get _className(){
        return this.state.hidden ? "hide" : "show";
    }
    constructor(props: ConfigProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: false
        }
    }
    render() { 
        return (
            <div className={`tourable__config ${this._className}`}>
                <div className="tourable__config__header">
                    <div className="tourable__config__title">{this.props.title}</div>
                    <Button
                        className="tourable__config__close"
                        onClick={(e) => { this.hide() }}
                    >
                        <i className="fas fa-times"></i>
                    </Button>
                </div>
                <div className="tourable__config__wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
 
export default Config;