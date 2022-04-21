import Observable from "@tunanyugen/observable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";

export interface PanoramaSchema {
    name: string;
    src: string;
    thumbnail: string;
    info: string;
    googleMap: string;
    overview: string;
}

export default class Panorama implements PanoramaSchema {
    private _observableManager: ObservableManager = new ObservableManager();
    // name
    public nameObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _name: string = "";
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
        this.nameObservable.Resolve(this.name);
    }
    // src
    public srcObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _src: string = "";
    public get src() {
        return this._src;
    }
    public set src(value: string) {
        this._src = value;
        this.srcObservable.Resolve(this.src);
    }
    // thumbnail
    public thumbnailObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _thumbnail: string = "";
    public get thumbnail() {
        return this._thumbnail;
    }
    public set thumbnail(value: string) {
        this._thumbnail = value;
        this.thumbnailObservable.Resolve(this.thumbnail);
    }
    // info
    public infoObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _info: string = "";
    public get info() {
        return this._info;
    }
    public set info(value: string) {
        this._info = value;
        this.infoObservable.Resolve(this.info);
    }
    // google map
    public googleMapObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _googleMap: string = "";
    public get googleMap() {
        return this._googleMap;
    }
    public set googleMap(value: string) {
        this._googleMap = value;
        this.googleMapObservable.Resolve(this._googleMap);
    }
    // overview
    public overviewObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _overview: string = "";
    public get overview() {
        return this._overview;
    }
    public set overview(value: string) {
        this._overview = value;
        this.overviewObservable.Resolve(this.thumbnail);
    }
    constructor(schema: PanoramaSchema) {
        this.name = schema.name;
        this.src = schema.src;
        this.info = schema.info;
        this.googleMap = schema.googleMap;
        this.thumbnail = schema.thumbnail;
        this.overview = schema.overview;
    }
    dispose = () => {
        this._observableManager.Dispose();
    };
}
