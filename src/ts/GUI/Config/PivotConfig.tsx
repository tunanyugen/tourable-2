import Pivot from "../../SceneObject/Pivot/Pivot";
import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";
import Config from "./Config";

export interface PivotConfigProps extends GUIObjectProps{
    
}
 
export interface PivotConfigState extends GUIObjectState{
    
}
 
class PivotConfig extends GUIObject<PivotConfigProps, PivotConfigState> {
    target:Pivot = null;
    constructor(props: PivotConfigProps) {
        super(props);
        this.state = {
            ...this.state
        }
        // hide on click on canvas
        this.props.tourable.onLoadObservabl.Add(this._observableManager, () => {
            this.props.tourable.eventManager.mouse0.onButtonDownObservable.Add(this._observableManager, () => {
                if (!this.state.hidden){ this.hide() }
            }, false)
            this.forceUpdate()
        }, true)
    }
    componentDidUpdate(prevProps: Readonly<PivotConfigProps>, prevState: Readonly<PivotConfigState>, snapshot?: any): void {
        if (!prevState.hidden && prevState.hidden != this.state.hidden){
            this.target = null;
        }
    }
    render() { 
        return (
            <Config
                tourable={this.props.tourable}
                title="Edit pivot"
                hidden={this.state.hidden}
                onClose={() => { this.hide() }}
                onDelete={() => {
                    if (!this.target){ return }
                    this.target.dispose(this.props.tourable);
                    this.hide();
                }}
            >
                
            </Config>
        );
    }
    setTarget = (pivot:Pivot) => {
        this.target = pivot;
        this.setState({
            hidden: false,
        })
        this.show();
    }
}
 
export default PivotConfig;