require("@fortawesome/fontawesome-free/js/all.min.js");
import "./index.scss";
import Tourable from "./ts/Tourable/Tourable";

(window as any).tourable = new Tourable(
    "#tourable",
    JSON.parse('[{"id":1,"panorama":{"name":"Scene 1","src":"/static/scene1.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[{"type":"floatingHotspot","id":1,"targetSceneID":-1,"texture":"/static/floating-hotspot.png","title":"","originalScaling":{"x":0.84,"y":0.84,"z":0.84},"mesh":{"position":{"x":0.6755964159965515,"y":-0.052235204726457596,"z":-0.7354189157485962},"rotation":{"x":-0.052258987636980773,"y":-0.7430267634312218,"z":0},"scaling":{"x":0.84,"y":0.84,"z":0.84}}},{"type":"floatingHotspot","id":2,"targetSceneID":-1,"texture":"/static/floating-hotspot.png","title":"","originalScaling":{"x":1.48,"y":1.48,"z":1.48},"mesh":{"position":{"x":0.5717226266860962,"y":-0.04973846301436424,"z":-0.8189379572868347},"rotation":{"x":-0.049758992642219696,"y":-0.6094677513627387,"z":0},"scaling":{"x":1.48,"y":1.48,"z":1.48}}}]},{"id":2,"panorama":{"name":"Scene 2","src":"/static/scene2.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[]},{"id":3,"panorama":{"name":"Scene 3","src":"/static/scene3.jpeg","thumbnail":"https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg"},"sceneObjects":[]}]')
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