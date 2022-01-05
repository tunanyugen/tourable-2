export default class Config{
    constructor(
        public editMode = true,
        public fov = 70, // camera's field of view
        public cameraSpeed = 0.16, // camera movement speed
        public mouseMoveInterval = 16, // floor hotspot size
        public floorHotspotSize = 0.2, // floating hotspot size
        public floatingHotspotSize = 0.1, // info hotspot size
        public infoHotspotSize = 0.1, // pivot size
        public pivotSize = 0.05, // mouse move event runs every X milliseconds
        public poly = {
            color: {r: 1, g: 1, b: 1},
            opacity: 1
        },
        public maxClickMouseDownTime = 200, // amount of pointer down time until click is rendered invalid in milliseconds
        public consecutiveDebugInterval = 200, // how fast consecutive debugging should fire in ms 
        public assets = {
            infoHotspot: [
                "/static/info.png"
            ],
            floatingHotspot: [
                "/static/floating-hotspot.png"
            ],
            floorHotspot: [
                "/static/floor-hotspot.png",
                "/static/floor-hotspot-circle.png"
            ],
            pivot: [
                "/static/pivot.png"
            ],
            poly: [
                "/static/poly.png"
            ]
        }
    ){}
}