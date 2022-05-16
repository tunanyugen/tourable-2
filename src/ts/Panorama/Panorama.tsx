import Observable from "@tunanyugen/observable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import Entity, { EntitySchema } from "../Entity/Entity";
import Tourable from "../Tourable/Tourable";

export interface PanoramaSchema extends EntitySchema {
    name: string;
    src: string;
    thumbnail: string;
    info: string;
    googleMap: string;
    overview: string;
}

export default class Panorama extends Entity implements PanoramaSchema {
    private _observableManager: ObservableManager = new ObservableManager();
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
        super(tourable, schema);
        this.loadSchema(tourable, schema);
        // register to tourable
        tourable.panoramas.set(this.id, this);
    }
    loadSchema = (tourable: Tourable, schema: PanoramaSchema) => {
        this.loadEntitySchema(tourable, schema);
        if (schema){
            this._googleMap = schema.googleMap;
            this._info = schema.info;
            this._name = schema.name;
            this._overview = schema.overview;
            this._src = schema.src;
            this._thumbnail = schema.thumbnail;
        } else {
            // no logic yet
        }
    };
    export: () => PanoramaSchema = () => {
        let entitySchema = this.exportEntity() as PanoramaSchema;
        entitySchema.googleMap = this.googleMap;
        entitySchema.info = this.info;
        entitySchema.name = this.name;
        entitySchema.overview = this.overview;
        entitySchema.src = this.src;
        entitySchema.thumbnail = this.thumbnail;
        return entitySchema;
    };
    dispose = () => {
        this._observableManager.Dispose();
    };
}
