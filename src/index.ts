require("@fortawesome/fontawesome-free/js/all.min.js");
import "./index.scss";
import Tourable from "./ts/Tourable/Tourable";

(window as any).tourable = new Tourable(
    "#tourable",
    JSON.parse('[{"id":1,"panorama":{"name":"Scene 1","src":"/static/scene1.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[{"type":"floorHotspot","id":1,"backFloorHotspotID":1,"targetSceneID":2,"texture":"/static/floor-hotspot.png","title":"Scene 2","mesh":{"position":{"x":-0.7001392245292664,"y":-1,"z":0.3525303304195404},"rotation":{"x":1.5707963267948966,"y":-1.1043409733581804,"z":0},"scaling":{"x":1,"y":1,"z":1}}}]},{"id":2,"panorama":{"name":"Scene 2","src":"/static/scene2.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[{"type":"floorHotspot","id":1,"backFloorHotspotID":-1,"targetSceneID":1,"texture":"/static/floor-hotspot.png","title":"Scene 1","mesh":{"position":{"x":0.7001392245292664,"y":-1,"z":-0.3525303304195404},"rotation":{"x":1.5707963267948966,"y":2.0372516802316127,"z":0},"scaling":{"x":1,"y":1,"z":1}}},{"type":"floorHotspot","id":2,"backFloorHotspotID":1,"targetSceneID":3,"texture":"/static/floor-hotspot-circle.png","title":"Custom title","mesh":{"position":{"x":-1.6268069859326633,"y":-1,"z":0.09283710507395714},"rotation":{"x":1.5707963267948966,"y":-1.7188099582991967,"z":0},"scaling":{"x":1,"y":1,"z":1}}}]},{"id":3,"panorama":{"name":"Scene 3","src":"/static/scene3.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[{"type":"floorHotspot","id":1,"backFloorHotspotID":-1,"targetSceneID":2,"texture":"/static/floor-hotspot-circle.png","title":"Scene 2","mesh":{"position":{"x":1.6268069859326633,"y":-1,"z":-0.09283710507395714},"rotation":{"x":1.5707963267948966,"y":1.4227826952905964,"z":0},"scaling":{"x":1,"y":1,"z":1}}}]}]')
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