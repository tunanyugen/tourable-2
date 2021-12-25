import Tourable from "../Tourable/Tourable";
import Observable from "@tunanyugen/observable";

export default class MouseButtonEvent{
    onButtonDownObservable:Observable<PointerEvent> = new Observable(null, false);
    onButtonUpObservable:Observable<PointerEvent> = new Observable(null, false);
    private _isDown:boolean = false;
    get isDown(){ return this._isDown; }
    private _startElapseTime:number;
    private _timeElapsed:number;
    get timeElapsed(){ return this._timeElapsed; }

    constructor(tourable:Tourable, index:number){
        tourable.canvas.current.addEventListener('pointerdown', (e:PointerEvent) => {
            if (e.button == index){
                this._isDown = true;
                this._startElapseTime = (new Date()).getTime();
                this.onButtonDownObservable.Resolve(e)
            }
        })
        tourable.canvas.current.addEventListener('pointerup', (e:PointerEvent) => {
            if (e.button == index){
                this._isDown = false;
                this._timeElapsed = (new Date()).getTime() - this._startElapseTime;
                this.onButtonUpObservable.Resolve(e)
            }
        })
    }
}