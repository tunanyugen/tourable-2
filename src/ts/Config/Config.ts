export default class Config{
    editMode:boolean;
    fov:number; // camera's field of view
    cameraSpeed:number; // camera movement speed
    mouseMoveInterval:number; // mouse move event runs every X milliseconds
    maxClickMouseDownTime:number; // amount of pointer down time until click is rendered invalid in milliseconds
    hotspotScale:number;
    pivotScale:number;
    cursorScale:number;
    consecutiveDebugInterval:number // how fast consecutive debugging should fire in ms 
    constructor(
        editMode = true,
        fov = 70,
        cameraSpeed = 0.16,
        mouseMoveInterval = 16,
        maxClickMouseDownTime = 200,
        hotspotScale = 0.16,
        pivotScale = 0.03,
        cursorScale = 0.1,
        consecutiveDebugInterval = 200,
    ){
        this.editMode = editMode;
        this.fov = fov;
        this.cameraSpeed = cameraSpeed;
        this.mouseMoveInterval = mouseMoveInterval;
        this.maxClickMouseDownTime = maxClickMouseDownTime;
        this.hotspotScale = hotspotScale;
        this.pivotScale = pivotScale;
        this.cursorScale = cursorScale;
        this.consecutiveDebugInterval = consecutiveDebugInterval;
    }
}