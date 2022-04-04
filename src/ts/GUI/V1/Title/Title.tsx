import GUIObject, {GUIObjectProps, GUIObjectState} from "../../GUIObject";

export interface TitleProps extends GUIObjectProps{
    title?:string;
    location?:string;
}
 
export interface TitleState extends GUIObjectState{
    
}
 
class Title extends GUIObject<TitleProps, TitleState> {
    static defaultProps:TitleProps = {
        tourable: null,
        title: "",
        location: "",
    }
    constructor(props: TitleProps) {
        super(props);
    }
    render() { 
        return (
            <div className="tourable__title">
                <h1 className="tourable__title__title">{this.props.title}</h1>
                <h2 className="tourable__title__location">{this.props.location}</h2>
                <h2 className="tourable__title__watermark">Virtual Tour by <a href="https://anflash.com">Anflash</a></h2>
            </div>
        );
    }
}
 
export default Title;