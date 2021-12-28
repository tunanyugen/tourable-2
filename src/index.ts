require("@fortawesome/fontawesome-free/js/all.min.js");
import "./index.scss";
import Tourable from "./ts/Tourable/Tourable";

(window as any).tourable = new Tourable(
    "#tourable",
    [
        {
            id: 1,
            sceneObjects: new Map(),
            panorama: {
                name: "Scene 1",
                src: "/static/scene1.jpeg",
                thumbnail: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
            }
        },
        {
            id: 2,
            sceneObjects: new Map(),
            panorama: {
                name: "Scene 2",
                src: "/static/scene2.jpeg",
                thumbnail: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
            }
        },
        {
            id: 3,
            sceneObjects: new Map(),
            panorama: {
                name: "Scene 3",
                src: "/static/scene3.jpeg",
                thumbnail: "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg",
            }
        },
    ]
)