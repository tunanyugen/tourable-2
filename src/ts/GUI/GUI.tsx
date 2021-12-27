import * as React from 'react';
import ReactDOM from 'react-dom';
import Tourable from '../Tourable/Tourable';
import GUIObject, {GUIObjectProps, GUIObjectState} from "./GUIObject";
import UtilityBar from "./UtilityBar/UtilityBar";
import UtilityBarItem from './UtilityBar/UtilityBaritem';
import Title from "./Title/Title";
import PlayButton from "./PlayButton/PlayButton";
import Preview from "./Preview/Preview";
import GeneralContextMenu from "./ContextMenu/GeneralContextMenu";
import FloorHotspotConfig from "./Config/FloorHotspotConfig";
import Text from "./Text/Text";

export interface GUIProps extends GUIObjectProps{
    
}
 
export interface GUIState extends GUIObjectState{
    text:string;
}
 
class GUI extends GUIObject<GUIProps, GUIState> {
    private get _className(){ return this.state.hidden ? "hide" : "show" }
    generalContextMenu:React.RefObject<GeneralContextMenu> = React.createRef();
    floorHotspotConfig:React.RefObject<FloorHotspotConfig> = React.createRef();
    constructor(props: GUIProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: false,
            text: "",
        }

        this.props.tourable.onLoadObservabl.Add(() => {
            this.props.tourable.eventManager.mouse0.onButtonUpObservable.Add(() => {
                if (this.props.tourable.eventManager.mouse0.timeElapsed <= 125){ this.toggle() }
            }, false)
        }, false)
    }
    render() { 
        return (
            <React.Fragment>
                {/* Client gui */}
                <div className={`tourable ${this._className}`}>
                    <UtilityBar tourable={this.props.tourable}>
                        <UtilityBarItem
                            tourable={this.props.tourable}
                            onClick={(e) => { window.innerHeight >= screen.height ? document.exitFullscreen() : document.body.requestFullscreen() }}
                        >
                            <i className="fas fa-expand"></i>
                        </UtilityBarItem>
                    </UtilityBar>
                    <Title
                        tourable={this.props.tourable}
                        title="Development tour"
                        location="Anflash Technology Company"
                    />
                    <PlayButton tourable={this.props.tourable}/>
                    <Preview tourable={this.props.tourable} />
                    <Text tourable={this.props.tourable} children={this.state.text} />
                </div>
                {/* Editor gui */}
                <GeneralContextMenu ref={this.generalContextMenu} tourable={this.props.tourable} />
                <FloorHotspotConfig ref={this.floorHotspotConfig} tourable={this.props.tourable} />
            </React.Fragment>
        );
    }
    static render(tourable:Tourable, containerSelector:string){
        let container = document.querySelector(containerSelector) as HTMLElement;
        container.style.width = "100%";
        container.style.height = "100%";

        let canvas:React.RefObject<HTMLCanvasElement> = React.createRef();
        let gui:React.RefObject<GUI> = React.createRef();

        ReactDOM.render(
            <React.Fragment>
                <canvas ref={canvas} style={{width: "100%", height: "100%"}} ></canvas>
                <GUI ref={gui} tourable={tourable} />
            </React.Fragment>
            ,
            container
        )

        return {
            gui,
            canvas,
        };
    }
}
 
export default GUI;