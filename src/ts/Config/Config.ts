export default class Config{
    static MAX_RENDERINGGROUPS:number = 100;
    private static renderingGroupInterval:number = 2;
    constructor(
        public editMode = true,
        public fov = 70, // camera's field of view
        public cameraSpeed = 0.16, // camera movement speed
        public mouseMoveInterval = 16, // floor hotspot size
        public defaultPanorama = "/static/default-panorama.jpg",
        public name = "Căn hộ cao cấp </br> Garden sky view",
        public logo = "/static/logo.png",
        public description = "",
        public floorHotspot = {
            size: 0.2,
            renderingGroupID: Config.renderingGroupInterval,
        },
        public floatingHotspot = {
            size: 0.1,
            renderingGroupID: Config.renderingGroupInterval,
        },
        public infoHotspot = {
            size: 0.1,
            renderingGroupID: Config.renderingGroupInterval,
        },
        public poly = {
            color: {r: 1, g: 1, b: 1},
            opacity: 1,
            renderingGroupID: Config.renderingGroupInterval,
        },
        public pivot = {
            size: 0.05,
            renderingGroupID: Config.renderingGroupInterval * 10,
        },
        public maxClickMouseDownTime = 200, // amount of pointer down time until click is rendered invalid in milliseconds
        public consecutiveDebugInterval = 200, // how fast consecutive debugging should fire in ms 
        public assets = {
            infoHotspot: [
                "/static/info.png"
            ],
            floatingHotspot: [
                "/static/floating-hotspot.png",
                "/static/door-icon.png",
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