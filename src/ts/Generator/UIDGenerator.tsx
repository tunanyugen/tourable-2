class UIDGenerator{
    private _uid:number = 1;
    public get uid(){ return this._uid++ }
    public set uid(value:number){ this._uid = value }
}

export default UIDGenerator;