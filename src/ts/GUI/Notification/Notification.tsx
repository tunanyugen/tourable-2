import GUIObject, { GUIObjectProps, GUIObjectState } from "../GUIObject";

export interface NotificationProps extends GUIObjectProps{
    
}
 
export interface NotificationState extends GUIObjectState{
    messages:string[];
}
 
class Notification extends GUIObject<NotificationProps, NotificationState> {
    constructor(props: NotificationProps) {
        super(props);
        this.state = {
            ...this.state,
            messages: []
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
        return this.state.messages.map((message, index) => {
            return (
                <div
                    key={index}
                    className="tourable__notification__item"
                >
                    {message}
                </div>
            )
        })
    }
    notify = (message:string) => {
        this.setState({
            messages: [
                ...this.state.messages,
                message
            ]
        })
    }
}
 
export default Notification;