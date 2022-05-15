import React from "react";
import Confirm from "./Confirm/Confirm";
import GUI, { GUIProps, GUIState } from "./GUI";
import LoadScreen from "./LoadScreen/LoadScreen";
import Notification from "./Notification/Notification";
import Popup from "./Popup/Popup";
import Text from "./Text/Text";
import Toolbar from "./V2/Toolbar/Toolbar";

export interface UncontrolledGUIProps extends GUIProps {}

export interface UncontrolledGUIState extends GUIState {}

class UncontrolledGUI extends GUI<UncontrolledGUIProps, UncontrolledGUIState> {
  text: React.RefObject<Text> = React.createRef();
  popup: React.RefObject<Popup> = React.createRef();
  confirm: React.RefObject<Confirm> = React.createRef();
  loadScreen: React.RefObject<LoadScreen> = React.createRef();
  notification: React.RefObject<Notification> = React.createRef();
  constructor(props: UncontrolledGUIProps) {
    super(props);
  }
  render() {
    return (
      <>
        {/* <Toolbar tourable={this.props.tourable} /> */}
        <Text ref={this.text} tourable={this.props.tourable} />
        <Popup ref={this.popup} tourable={this.props.tourable} />
        <Confirm ref={this.confirm} tourable={this.props.tourable} />
        <LoadScreen ref={this.loadScreen} tourable={this.props.tourable} />
        <Notification ref={this.notification} tourable={this.props.tourable} />
      </>
    );
  }
}

export default UncontrolledGUI;
