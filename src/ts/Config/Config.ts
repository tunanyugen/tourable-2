const info = require("../../assets/info.png");
const floatingHotspot = require("../../assets/floating-hotspot.png");
const floorHotspot = require("../../assets/floor-hotspot.png");

export default class Config{
    editMode:boolean;
    fov:number; // camera's field of view
    cameraSpeed:number; // camera movement speed
    floorHotspotSize:number; // floor hotspot size
    mouseMoveInterval:number; // mouse move event runs every X milliseconds
    maxClickMouseDownTime:number; // amount of pointer down time until click is rendered invalid in milliseconds
    consecutiveDebugInterval:number // how fast consecutive debugging should fire in ms 
    assets: {
        info: string,
        floatingHotspot:string
        floorHotspot:string,
    }
    constructor(
        editMode = true,
        fov = 70,
        cameraSpeed = 0.16,
        mouseMoveInterval = 16,
        floorHotspotSize = 0.2,
        maxClickMouseDownTime = 200,
        consecutiveDebugInterval = 200,
        assets = {
            info: info,
            floatingHotspot: floatingHotspot,
            floorHotspot: floorHotspot
        }
    ){
        this.editMode = editMode;
        this.fov = fov;
        this.cameraSpeed = cameraSpeed;
        this.floorHotspotSize = floorHotspotSize;
        this.mouseMoveInterval = mouseMoveInterval;
        this.maxClickMouseDownTime = maxClickMouseDownTime;
        this.consecutiveDebugInterval = consecutiveDebugInterval;
        this.assets = assets
    }
}