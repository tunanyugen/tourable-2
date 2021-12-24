class UIDGenerator{
    private _uid:number = 1;
    public get uid(){ return this._uid++ }
}

export default UIDGenerator;