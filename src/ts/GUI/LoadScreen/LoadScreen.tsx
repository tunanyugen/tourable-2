import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface LoadScreenProps extends GUIObjectProps{
    
}
 
export interface LoadScreenState extends GUIObjectState{
    
}
 
class LoadScreen extends GUIObject<LoadScreenProps, LoadScreenState> {
    private get _className(){ return this.state.hidden ? "hide" : "show"}
    constructor(props: LoadScreenProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: true
        }
    }
    render() { 
        return (
            <div className={`tourable__load-screen ${this._className}`}></div>
        );
    }
}
 
export default LoadScreen;