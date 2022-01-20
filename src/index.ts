require("@fortawesome/fontawesome-free/js/all.min.js");
import "./index.scss";
import Tourable from "./ts/Tourable/Tourable";

(window as any).tourable = new Tourable(
    "#tourable",
    JSON.parse('[{"id":1,"panorama":{"name":"Phong Gym","src":"https://tunacoding.com/public/phong-gym.jpg","thumbnail":"https://tunacoding.com/public/phong-gym-thumbnail.jpg"},"sceneObjects":[{"type":"floatingHotspot","id":1,"sceneID":1,"targetSceneID":2,"texture":"/static/door-icon.png","hoverTitle":"Khu Cafe","clickTitle":"","originalScaling":{"x":1,"y":1,"z":1},"mesh":{"position":{"x":0.21001896500036615,"y":0.021351459290341206,"z":-0.9774641423225445},"rotation":{"x":-0.03061097643558501,"y":-0.305097137816458,"z":0},"scaling":{"x":1,"y":1,"z":1}}}]},{"id":2,"panorama":{"name":"Khu Cafe","src":"https://tunacoding.com/public/Khu cf.jpg","thumbnail":"https://tunacoding.com/public/Khu cf-thumbnail.jpg"},"sceneObjects":[{"type":"floatingHotspot","id":1,"sceneID":2,"targetSceneID":1,"texture":"/static/door-icon.png","hoverTitle":"Phong Gym","clickTitle":"","originalScaling":{"x":1,"y":1,"z":1},"mesh":{"position":{"x":-0.9825480206358437,"y":-0.031211954435278955,"z":-0.18337175639916728},"rotation":{"x":-0.03783553003489771,"y":1.483345005114021,"z":0},"scaling":{"x":1,"y":1,"z":1}}}]}]')
)