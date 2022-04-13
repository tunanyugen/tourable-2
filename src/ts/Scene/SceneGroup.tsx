import HasSchema from "../Interfaces/HasSchema";
import Schema from "../Interfaces/Schema";
import Tourable from "../Tourable/Tourable";
export interface SceneGroupSchema extends Schema {
    id: number;
    name: string;
    sceneIDs: number[];
}
export default class SceneGroup implements HasSchema, SceneGroupSchema {
    private _id: number = -1;
    public get id() {
        return this._id;
    }
    private _name: string = "";
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public sceneIDs: number[] = [];
    loadSchema = (tourable: Tourable, schema: SceneGroupSchema) => {
        this._id = schema.id;
        tourable.uidGenerator.uid = this._id + 1;
        this._name = schema.name;
    };
    export = () => {
        return {
            id: this.id,
            name: this.name,
            sceneIDs: this.sceneIDs,
        };
    };
}
