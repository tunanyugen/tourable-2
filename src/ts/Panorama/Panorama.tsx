export interface PanoramaSchema{
    name:string;
    src:string;
    thumbnail:string;
}

export default class Panorama implements PanoramaSchema {
    constructor(
        public name:string,
        public src:string,
        public thumbnail:string
    ){}
}