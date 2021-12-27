require("@fortawesome/fontawesome-free/js/all.min.js");
import "./index.scss";
import Tourable from "./ts/Tourable/Tourable";

(window as any).tourable = new Tourable(
    "#tourable",
    JSON.parse('[{"id":1,"panorama":{"name":"Scene 1","src":"/static/scene1.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[{"type":"floorHotspot","id":1,"backFloorHotspotSceneID":-1,"backFloorHotspotID":-1,"targetSceneID":2,"texture":"http://localhost:8000/static/3ba420896e94ea317ab3.png","title":"","mesh":{"position":{"x":-0.7847704887390137,"y":-1,"z":0.5691325068473816},"rotation":{"x":1.5707963267948966,"y":-0.943342875036953,"z":0},"scaling":{"x":1,"y":1,"z":1}}}]},{"id":2,"panorama":{"name":"Scene 2","src":"/static/scene2.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[{"type":"floorHotspot","id":1,"backFloorHotspotSceneID":-1,"backFloorHotspotID":-1,"targetSceneID":1,"texture":"http://localhost:8000/static/3ba420896e94ea317ab3.png","title":"Scene 1","mesh":{"position":{"x":0.7847704887390137,"y":-1,"z":-0.5691325068473816},"rotation":{"x":1.5707963267948966,"y":2.19824977855284,"z":0},"scaling":{"x":1,"y":1,"z":1}}}]},{"id":3,"panorama":{"name":"Scene 3","src":"/static/scene3.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[]}]')
    // [
    //     {
    //         id: 1,
    //         sceneObjects: new Map(),
    //         panorama: {
    //             name: "Scene 1",
    //             src: "/static/scene1.jpeg",
    //             thumbnail: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
    //         }
    //     },
    //     {
    //         id: 2,
    //         sceneObjects: new Map(),
    //         panorama: {
    //             name: "Scene 2",
    //             src: "/static/scene2.jpeg",
    //             thumbnail: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
    //         }
    //     },
    //     {
    //         id: 3,
    //         sceneObjects: new Map(),
    //         panorama: {
    //             name: "Scene 3",
    //             src: "/static/scene3.jpeg",
    //             thumbnail: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
    //         }
    //     },
    // ]
)