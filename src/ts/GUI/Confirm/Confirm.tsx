import GUIObject, { GUIObjectProps, GUIObjectState } from '../GUIObject';
import Button from "@tunanyugen/react-components/src/ts/Form/Button/Button";

export interface ConfirmProps extends GUIObjectProps{
    
}
 
export interface ConfirmState extends GUIObjectState{
    message:string;
    onConfirm:Function;
    onCancel:Function;
}
 
class Confirm extends GUIObject<ConfirmProps, ConfirmState> {
    private get _className(){ return this.state.hidden ? "hide" : "show" }
    constructor(props: ConfirmProps) {
        super(props);
        this.state = {
            ...this.state,
            message: ""
        }
    }
    render() { 
        return (
            <div className={`tourable__confirm ${this._className}`}>
                <div className="tourable__confirm__message">{this.state.message}</div>
                <div className="tourable__confirm__buttons">
                    <Button
                        className="tourable__confirm__confirm"
                        onClick={() => {
                            this.state.onConfirm();
                            this.hide();
                        }}
                    >Confirm</Button>
                    <Button
                        onClick={() => {
                            this.state.onCancel();
                            this.hide();
                        }}
                        className="error tourable__confirm__cancel"
                    >Cancel</Button>
                </div>
            </div>
        );
    }
    display = (message:string, onConfirm:Function, onCancel:Function) => {
        this.setState({ message, onConfirm, onCancel }, () => {
            this.show();
        })
    }
}
 
export default Confirm;