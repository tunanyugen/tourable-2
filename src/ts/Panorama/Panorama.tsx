import Observable from "@tunanyugen/observable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import HasSchema from "../Interfaces/HasSchema";
import Schema from "../Interfaces/Schema";
import Tourable from "../Tourable/Tourable";

export interface PanoramaSchema extends Schema {
    name: string;
    src: string;
    thumbnail: string;
    info: string;
    googleMap: string;
    overview: string;
}

export default class Panorama implements PanoramaSchema, HasSchema {
    private _observableManager: ObservableManager = new ObservableManager();
    //#region id
    private _id: number;
    public get id() {
        return this._id;
    }
    //#endregion
    //#region name
    public nameObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _name: string = "";
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
        this.nameObservable.Resolve(this.name);
    }
    //#endregion
    //#region src
    public srcObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _src: string = "";
    public get src() {
        return this._src;
    }
    public set src(value: string) {
        this._src = value;
        this.srcObservable.Resolve(this.src);
    }
    //#endregion
    //#region thumbnail
    public thumbnailObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _thumbnail: string = "";
    public get thumbnail() {
        return this._thumbnail;
    }
    public set thumbnail(value: string) {
        this._thumbnail = value;
        this.thumbnailObservable.Resolve(this.thumbnail);
    }
    //#endregion
    //#region info
    public infoObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _info: string = "";
    public get info() {
        return this._info;
    }
    public set info(value: string) {
        this._info = value;
        this.infoObservable.Resolve(this.info);
    }
    //#endregion
    //#region google map
    public googleMapObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _googleMap: string = "";
    public get googleMap() {
        return this._googleMap;
    }
    public set googleMap(value: string) {
        this._googleMap = value;
        this.googleMapObservable.Resolve(this._googleMap);
    }
    //#endregion
    //#region overview
    public overviewObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
    private _overview: string = "";
    public get overview() {
        return this._overview;
    }
    public set overview(value: string) {
        this._overview = value;
        this.overviewObservable.Resolve(this.thumbnail);
    }
    //#endregion
    constructor(tourable: Tourable, schema?: PanoramaSchema) {
        if (!schema){
            this._id = tourable.uidGenerator.uid;
        } else {
            this.loadSchema(tourable, schema);
        }
    }
    loadSchema = (tourable: Tourable, schema: PanoramaSchema) => {
        this._id = schema.id;
        this._googleMap = schema.googleMap;
        this._info = schema.info;
        this._name = schema.name;
        this._overview = schema.overview;
        this._src = schema.src;
        this._thumbnail = schema.thumbnail;
    };
    export: () => PanoramaSchema = () => {
        return {
            id: this.id,
            googleMap: this.googleMap,
            info: this.info,
            name: this.name,
            overview: this.overview,
            src: this.src,
            thumbnail: this.thumbnail,
        }
    };
    dispose = () => {
        this._observableManager.Dispose();
    };
}
