require("@fortawesome/fontawesome-free/js/all.min.js");
import "./index.scss";
import Tourable from "./ts/Tourable/Tourable";

(window as any).tourable = new Tourable(
    "#tourable",
    // JSON.parse('{"panoramaSchemas":[{"id":1,"googleMap":"","info":"","name":"New scene","overview":"","src":"/static/default-panorama.jpg","thumbnail":"/static/default-panorama.jpg"}],"sceneSchemas":[{"id":2,"panoramaId":1}]}')
)