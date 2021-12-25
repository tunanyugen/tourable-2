import { PickingInfo } from "babylonjs";
import SceneObject from "../../SceneObject/SceneObject";

export default interface SceneObjectManagerPickResult{
    sceneObject:SceneObject;
    pickingInfo:PickingInfo;
}