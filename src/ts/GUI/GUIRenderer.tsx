import React from 'react'
import ReactDOM from "react-dom";
import Tourable from "../Tourable/Tourable";
import EditorGUI from "./EditorGUI";
import GUI from "./GUI";
import UncontrolledGUI from "./UncontrolledGUI";

export default class GUIRenderer {
  static render(tourable: Tourable, containerSelector: string) {
    let container = document.querySelector(containerSelector) as HTMLElement;
    container.style.width = "100%";
    container.style.height = "100%";

    let canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    let gui: React.RefObject<GUI> = React.createRef();
    let editorGUI: React.RefObject<EditorGUI> = React.createRef();
    let uncontrolledGUI: React.RefObject<UncontrolledGUI> = React.createRef();

    ReactDOM.render(
      <React.Fragment>
        <canvas ref={canvas} style={{ width: "100%", height: "100%" }}></canvas>
        <div className={`tourable show`}>
          <GUI ref={gui} tourable={tourable} />
          <EditorGUI ref={editorGUI} tourable={tourable} />
          <UncontrolledGUI ref={uncontrolledGUI} tourable={tourable} />
        </div>
      </React.Fragment>,
      container
    );

    return {
      gui,
      editorGUI,
      uncontrolledGUI,
      canvas,
    };
  }
}
