import { ObservableManager } from "@tunanyugen/observable/src/ts/ObservableManager";
import Tourable from "../Tourable/Tourable";

export interface EntitySchema {
    id: number;
}

export default abstract class Entity implements EntitySchema {
    protected _observableManager: ObservableManager = new ObservableManager();
    //#region id
    private _id: number;
    public get id() {
        return this._id;
    }
    //#endregion
    constructor(tourable: Tourable, schema?: EntitySchema) {
        this.loadEntitySchema(tourable, schema);
        // register to tourable
        tourable.entities.set(this._id, this);
    }
    protected loadEntitySchema = (tourable: Tourable, schema: EntitySchema) => {
        if (schema) {
            this._id = schema.id;
        } else {
            this._id = tourable.uidGenerator.uid;
        }
    };
    protected exportEntity: () => EntitySchema = () => {
        return {
            id: this.id,
        };
    };
    protected disposeEntity = () => {
        // for some reason some observables will not be resolved if run the following command without delay
        setTimeout(() => {
            this._observableManager.Dispose();
        }, 16);
    }
}
