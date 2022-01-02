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
import FloatingHotspotConfig from "./Config/FloatingHotspotConfig";
import InfoHotspotConfig from "./Config/InfoHotspotConfig";
import Text from "./Text/Text";
import LoadScreen from "./LoadScreen/LoadScreen";
import Popup from "./Popup/Popup";
import PivotConfig from './Config/PivotConfig';

export interface GUIProps extends GUIObjectProps{
    
}
 
export interface GUIState extends GUIObjectState{
    
}
 
class GUI extends GUIObject<GUIProps, GUIState> {
    private get _className(){ return this.state.hidden ? "hide" : "show" }
    generalContextMenu:React.RefObject<GeneralContextMenu> = React.createRef();
    floorHotspotConfig:React.RefObject<FloorHotspotConfig> = React.createRef();
    floatingHotspotConfig:React.RefObject<FloatingHotspotConfig> = React.createRef();
    infoHotspotConfig:React.RefObject<InfoHotspotConfig> = React.createRef();
    pivotConfig:React.RefObject<PivotConfig> = React.createRef();
    loadScreen:React.RefObject<LoadScreen> = React.createRef();
    text:React.RefObject<Text> = React.createRef();
    popup:React.RefObject<Popup> = React.createRef();

    constructor(props: GUIProps) {
        super(props);
        this.state = {
            ...this.state,
            hidden: false,
        }

        this.props.tourable.onLoadObservabl.Add(() => {
            this.props.tourable.eventManager.mouse0.onButtonUpObservable.Add(() => {
                if (!this.props.tourable.sceneObjectManager.pick(this.props.tourable)){
                    if (this.props.tourable.eventManager.mouse0.timeElapsed <= 110){
                        this.toggle();
                    }
                }
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
                </div>
                {/* Uncontrolled gui */}
                <Text ref={this.text} tourable={this.props.tourable} />
                <Popup ref={this.popup} tourable={this.props.tourable} />
                {/* Editor gui */}
                <GeneralContextMenu ref={this.generalContextMenu} tourable={this.props.tourable} />
                <FloorHotspotConfig ref={this.floorHotspotConfig} tourable={this.props.tourable} />
                <FloatingHotspotConfig ref={this.floatingHotspotConfig} tourable={this.props.tourable} />
                <InfoHotspotConfig ref={this.infoHotspotConfig} tourable={this.props.tourable} />
                <PivotConfig ref={this.pivotConfig} tourable={this.props.tourable} />
                <LoadScreen ref={this.loadScreen} tourable={this.props.tourable}/>
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