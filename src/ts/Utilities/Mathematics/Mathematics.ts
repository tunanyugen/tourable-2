import { Vector3, Vector2, Matrix, Mesh } from "babylonjs";
import Tourable from "../../Tourable/Tourable";

export default class Mathematics{
    static WorldToScreenPoint(tourable:Tourable, point:Vector3){
        let camera = tourable.sceneManager.sceneToRender.activeCamera;
        let halfW = tourable.engine.getRenderWidth() / 2;
        let halfH = tourable.engine.getRenderHeight() / 2;
        let matrix = camera.getViewMatrix().multiply(camera.getProjectionMatrix());
        let normalizedPoint = Vector3.TransformCoordinates(point, matrix);
        return new Vector2(
            halfW + normalizedPoint.x * halfW,
            halfH - normalizedPoint.y * halfH
        );
    }
    static ScreenToWorldPoint(tourable:Tourable, point:Vector2, length:number = 1){
        let camera = tourable.sceneManager.sceneToRender.activeCamera;
        let halfW = tourable.engine.getRenderWidth() / 2;
        let halfH = tourable.engine.getRenderHeight() / 2;
        point.x = (point.x - halfW) / halfW;
        point.y = -(point.y - halfH) / halfH;
        let matrix = Matrix.Invert(camera.getProjectionMatrix()).multiply(Matrix.Invert(camera.getViewMatrix()));
        return Vector3.TransformCoordinates(new Vector3(point.x, point.y, 1), matrix).normalize().multiplyByFloats(length, length, length);
    }
    static ScreenToWorldXYPlane(tourable:Tourable, point:Vector2, y:number = -1){
        let normalized = Mathematics.ScreenToWorldPoint(tourable, point);
        let lengthMultiplier = y / normalized.y;
        if (lengthMultiplier == 0) { lengthMultiplier = 1; }
        return normalized.multiplyByFloats(lengthMultiplier, lengthMultiplier, lengthMultiplier);
    }
    static WorldToLocalSpace(point:Vector3, worldMatrix:Matrix){
        return Vector3.TransformCoordinates(point, Matrix.Invert(worldMatrix));
    }
    static LocalToWorldSpace(point:Vector3, worldMatrix:Matrix){
        return Vector3.TransformCoordinates(point, worldMatrix);
    }
    static LinePlaneIntersect(p1:Vector3, p2:Vector3, p3:Vector3, vec:Vector3){
        let n = p2.subtract(p1).cross(p3.subtract(p1)); // normal
        let l = p2.subtract(p1); // line on plane
        let np1DotProduct = Vector3.Dot(n, p1);
        let nlDotProduct = Vector3.Dot(n, vec);
        // case line and plane are parallel
        if (nlDotProduct == 0){ return null; }
        // case line does intersect plane
        let t = np1DotProduct / nlDotProduct;
        return vec.multiplyByFloats(t, t, t);
    }
    static TransformPoint(tourable:Tourable, originalPos:Vector3, screenPos:Vector2, xAxis:boolean, yAxis:boolean, zAxis:boolean){
        let finalPos = Mathematics.ScreenToWorldXYPlane(tourable, screenPos, originalPos.y);
        
        let yOffset = 0;
        if (yAxis){
            let camera = tourable.sceneManager.sceneToRender.activeCamera;
            let right = Vector3.Cross(camera.getDirection(new Vector3(0, 0, 1)), Vector3.Up());
            
            yOffset = Mathematics.LinePlaneIntersect(originalPos, originalPos.add(right), originalPos.add(Vector3.Up()), finalPos).y - originalPos.y;
        }
        let x = (xAxis) ? finalPos.x : originalPos.x;
        let y = (yAxis) ? originalPos.y + yOffset : originalPos.y;
        let z = (zAxis) ? finalPos.z : originalPos.z;
        
        return new Vector3(x, y, z);
    }
    static DegToRad(deg:number){
        return deg * Math.PI / 180;
    }
    static RadToDeg(rad:number){
        return rad * 180 / Math.PI;
    }
}