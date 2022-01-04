import Observable from "@tunanyugen/observable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import Tourable from "../Tourable/Tourable";

export default class KeyEvent{
    protected _observableManager:ObservableManager = new ObservableManager(); 
    onKeyDownObservable:Observable = new Observable(this._observableManager, null, false);
    onKeyUpObservable:Observable = new Observable(this._observableManager, null, false);
    private _isDown:boolean = false;
    get isDown(){ return this._isDown; }

    constructor(tourable:Tourable, key:string){
        tourable.canvas.current.addEventListener('keydown', (e:KeyboardEvent) => {
            if (e.repeat) { return; }
            if (e.key == key){
                this.onKeyDownObservable.Resolve()
                this._isDown = true;
            }
        })
        tourable.canvas.current.addEventListener('keyup', (e:KeyboardEvent) => {
            if (e.repeat) { return; }
            if (e.key == key){
                this.onKeyUpObservable.Resolve()
                this._isDown = false;
            }
        })
    }
}