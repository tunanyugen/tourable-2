import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface NotificationProps extends GUIObjectProps{
    
}
 
export interface NotificationState extends GUIObjectState{
    messages:Map<number,string>;
}
 
class Notification extends GUIObject<NotificationProps, NotificationState> {
    constructor(props: NotificationProps) {
        super(props);
        this.state = {
            ...this.state,
            messages: new Map()
        }
    }
    render() {
        return (
            <div className="tourable__notification">
                {this.renderItems()}
            </div>
        );
    }
    renderItems = () => {
        return Array.from(this.state.messages).map(([key, value], index) => {
            return (
                <div
                    key={index}
                    className="tourable__notification__item"
                >
                    {value}
                </div>
            )
        })
    }
    notify = (message:string, duration:number = 500) => {
        let id = Date.now();
        this.state.messages.set(id, message);
        this.forceUpdate();
        setTimeout(() => {
            this.state.messages.delete(id);
            this.forceUpdate();
        }, duration);
    }
}
 
export default Notification;