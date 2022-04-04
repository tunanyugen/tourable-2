import Observable from "@tunanyugen/observable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";

export interface PanoramaSchema {
  name: string;
  src: string;
  thumbnail: string;
}

export default class Panorama implements PanoramaSchema {
  private _observableManager: ObservableManager = new ObservableManager();
  public nameObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
  public srcObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
  public thumbnailObservable: Observable<string> = new Observable<string>(this._observableManager, null, false);
  private _name: string = "";
  public get name() {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    this.nameObservable.Resolve(this.name);
  }
  private _src: string = "";
  public get src() {
    return this._src;
  }
  public set src(value: string) {
    this._src = value;
    this.srcObservable.Resolve(this.src);
  }
  private _thumbnail: string = "";
  public get thumbnail() {
    return this._thumbnail;
  }
  public set thumbnail(value: string) {
    this._thumbnail = value;
    this.thumbnailObservable.Resolve(this.thumbnail);
  }
  constructor(name: string, src: string, thumbnail: string) {
      this.name = name;
      this.src = src;
      this.thumbnail = thumbnail;
  }
  dispose = () => {
    this._observableManager.Dispose();
  }
}
