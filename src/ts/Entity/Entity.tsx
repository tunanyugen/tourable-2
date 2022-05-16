import Tourable from "../Tourable/Tourable";

export interface EntitySchema {
    id: number;
}

export default abstract class Entity implements EntitySchema {
    private _id: number;
    public get id() {
        return this._id;
    }
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
}
