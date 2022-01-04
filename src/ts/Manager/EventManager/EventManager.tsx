import KeyEvent from "../../Event/KeyEvent";
import Tourable from "../../Tourable/Tourable";
import MouseButtonEvent from "../../Event/MouseButtonEvent";
import Observable from "@tunanyugen/observable";
import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";

export default class EventManager{
    protected _observableManager:ObservableManager = new ObservableManager();
    // mouse
    onMouseMoveObservable:Observable<PointerEvent> = new Observable(this._observableManager, null, false);
    onMouseScrollObservable:Observable<WheelEvent> = new Observable(this._observableManager, null, false);
    private _moving:boolean = false;
    get moving(){ return this._moving; }
    // mouse buttons
    mouse0:MouseButtonEvent;
    mouse1:MouseButtonEvent;
    mouse2:MouseButtonEvent;
    // keyboard
    one:KeyEvent;
    two:KeyEvent;
    three:KeyEvent;
    escape:KeyEvent;
    space:KeyEvent;
    delete:KeyEvent;
    shift:KeyEvent;
    g:KeyEvent;
    s:KeyEvent;
    x:KeyEvent;
    y:KeyEvent;
    p:KeyEvent;
    f:KeyEvent;
    z:KeyEvent;
    d:KeyEvent;

    constructor(tourable:Tourable){
        this.mouse0 = new MouseButtonEvent(tourable, 0);
        this.mouse1 = new MouseButtonEvent(tourable, 1);
        this.mouse2 = new MouseButtonEvent(tourable, 2);
        this.one = new KeyEvent(tourable, "1");
        this.two = new KeyEvent(tourable, "2");
        this.three = new KeyEvent(tourable, "3");
        this.escape = new KeyEvent(tourable, "Escape");
        this.space = new KeyEvent(tourable, " ");
        this.delete = new KeyEvent(tourable, "Delete");
        this.shift = new KeyEvent(tourable, "Shift");
        this.g = new KeyEvent(tourable, "g");
        this.s = new KeyEvent(tourable, "s");
        this.x = new KeyEvent(tourable, "x");
        this.y = new KeyEvent(tourable, "y");
        this.p = new KeyEvent(tourable, "p");
        this.f = new KeyEvent(tourable, "f");
        this.z = new KeyEvent(tourable, "z");
        this.d = new KeyEvent(tourable, "d");
        
        this.MouseMove(tourable);
        this.MouseScroll(tourable);
    }

    private MouseMove = (tourable:Tourable) => {
        let lastPointerEvent:PointerEvent;
        window.addEventListener('pointermove', (e:PointerEvent) => {
            this._moving = true;
            lastPointerEvent = e;
        })
        setInterval(() => {
            if (this._moving){
                this.onMouseMoveObservable.Resolve(lastPointerEvent);
                this._moving = false;
            }
        }, tourable.config.mouseMoveInterval);
    }
    private MouseScroll = (tourable:Tourable) => {
        tourable.canvas.current.addEventListener('wheel', (e:WheelEvent) => {
            this.onMouseScrollObservable.Resolve(e);
        })
    }
}