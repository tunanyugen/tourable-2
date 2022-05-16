import { Box } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import Tourable from "../Tourable/Tourable";
import ClientGUI from "./ClientGUI";
import EditorGUI from "./EditorGUI";
import UncontrolledGUI from "./UncontrolledGUI";

export default class GUIRenderer {
    static render(tourable: Tourable, containerSelector: string) {
        let container = document.querySelector(containerSelector) as HTMLElement;
        container.style.width = "100%";
        container.style.height = "100%";

        let canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
        let clientGUI: React.RefObject<ClientGUI> = React.createRef();
        let editorGUI: React.RefObject<EditorGUI> = React.createRef();
        let uncontrolledGUI: React.RefObject<UncontrolledGUI> = React.createRef();

        ReactDOM.render(
            <React.Fragment>
                <canvas ref={canvas} style={{ width: "100%", height: "100%" }}></canvas>
                <Box
                    sx={{
                        position: "absolute",
                        left: "0",
                        top: "0",
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        "> *": {
                            pointerEvents: "all",
                        },
                    }}
                >
                    <ClientGUI ref={clientGUI} tourable={tourable} />
                    <EditorGUI ref={editorGUI} tourable={tourable} />
                    <UncontrolledGUI ref={uncontrolledGUI} tourable={tourable} />
                </Box>
            </React.Fragment>,
            container
        );

        return {
            clientGUI,
            editorGUI,
            uncontrolledGUI,
            canvas,
        };
    }
}
