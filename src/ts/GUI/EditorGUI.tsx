import * as React from "react";
import FloatingHotspotConfig from "./Config/FloatingHotspotConfig";
import FloorHotspotConfig from "./Config/FloorHotspotConfig";
import InfoHotspotConfig from "./Config/InfoHotspotConfig";
import PivotConfig from "./Config/PivotConfig";
import PolyConfig from "./Config/PolyConfig";
import GeneralContextMenu from "./ContextMenu/GeneralContextMenu";
import SceneConfig from "./Config/SceneConfig";
import GUI, { GUIProps, GUIState } from "./GUI";
import GlobalConfig from "./Config/GlobalConfig";
import SceneGroupConfig from "./Config/SceneGroupConfig";
import GridLayout from "./GridLayout/GridLayout";

export interface EditorGUIProps extends GUIProps {}

export interface EditorGUIState extends GUIState {}

class EditorGUI extends GUI<EditorGUIProps, EditorGUIState> {
    generalContextMenu: React.RefObject<GeneralContextMenu> = React.createRef();
    globalConfig: React.RefObject<GlobalConfig> = React.createRef();
    floorHotspotConfig: React.RefObject<FloorHotspotConfig> = React.createRef();
    floatingHotspotConfig: React.RefObject<FloatingHotspotConfig> = React.createRef();
    infoHotspotConfig: React.RefObject<InfoHotspotConfig> = React.createRef();
    pivotConfig: React.RefObject<PivotConfig> = React.createRef();
    polyConfig: React.RefObject<PolyConfig> = React.createRef();
    sceneConfig: React.RefObject<SceneConfig> = React.createRef();
    sceneGroupConfig: React.RefObject<SceneGroupConfig> = React.createRef();
    constructor(props: EditorGUIProps) {
        super(props);
    }
    render() {
        return (
            <>
                <GeneralContextMenu ref={this.generalContextMenu} tourable={this.props.tourable} />
                <GlobalConfig ref={this.globalConfig} tourable={this.props.tourable} />
                <FloorHotspotConfig ref={this.floorHotspotConfig} tourable={this.props.tourable} />
                <FloatingHotspotConfig ref={this.floatingHotspotConfig} tourable={this.props.tourable} />
                <InfoHotspotConfig ref={this.infoHotspotConfig} tourable={this.props.tourable} />
                <PivotConfig ref={this.pivotConfig} tourable={this.props.tourable} />
                <PolyConfig ref={this.polyConfig} tourable={this.props.tourable} />
                <SceneConfig ref={this.sceneConfig} tourable={this.props.tourable} />
                <SceneGroupConfig ref={this.sceneGroupConfig} tourable={this.props.tourable} />
                {/* <GridLayout tourable={this.props.tourable} /> */}
            </>
        );
    }
}

export default EditorGUI;
