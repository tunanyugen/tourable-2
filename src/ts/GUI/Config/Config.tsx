import Button from "@tunanyugen/react-components/src/ts/Form/Button/Button";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface ConfigProps extends GUIObjectProps{
}
 
export interface ConfigState extends GUIObjectState{
    title:string;
    hidden:boolean;
    onClose:()=>any;
    onDelete:()=>any;
}
 
abstract class Config<T, P extends ConfigProps, S extends ConfigState> extends GUIObject<P, S> {
    abstract target:T;
    private get _className(){
        return this.state.hidden ? "hide" : "show";
    }
    constructor(props: P) {
        super(props);
        // hide on click on canvas
        this.props.tourable.onLoadObservabl.Add(this._observableManager, () => {
            this.props.tourable.eventManager.mouse0.onButtonDownObservable.Add(this._observableManager, () => {
                if (!this.state.hidden){ this.hide() }
            }, false)
            this.forceUpdate()
        }, true)
    }
    componentDidUpdate(prevProps: Readonly<ConfigProps>, prevState: Readonly<ConfigState>, snapshot?: any): void {
        if (!prevState.hidden && prevState.hidden != this.state.hidden){
            this.target = null;
        }
    }
    render() {
        return (
            <div className={`tourable__config ${this._className}`}>
                <div className="tourable__config__header">
                    <div className="tourable__config__title">{this.state.title}</div>
                    <Button
                        className="tourable__config__close"
                        onClick={(e) => { this.state.onClose() }}
                    >
                        <i className="fas fa-times"></i>
                    </Button>
                </div>
                <div className="tourable__config__wrapper">
                    {this.renderComponents()}
                </div>
                <div className="tourable__config__footer">
                    <Button
                        className="tourable__config__delete"
                        onClick={this.state.onDelete}
                    >Delete</Button>
                </div>
            </div>
        );
    }
    setTarget = (target:T) => {
        this.target = target;
        this.setState({
            hidden: false,
        })
        this.show();
    }
    abstract renderComponents: () => JSX.Element
}
 
export default Config;