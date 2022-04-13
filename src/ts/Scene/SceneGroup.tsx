import UIDGenerator from "../Generator/UIDGenerator";
import HasSchema from "../Interfaces/HasSchema";
import Schema from "../Interfaces/Schema";
import Tourable from "../Tourable/Tourable";
import Scene, { SceneSchema } from "./Scene";
export interface SceneGroupSchema extends Schema {
    id: number;
    name: string;
    scenes: SceneSchema[] | Map<number, Scene>;
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
    public uidGenerator: UIDGenerator = new UIDGenerator();
    public scenes: Map<number, Scene> = new Map();
    loadSchema = (tourable: Tourable, schema: SceneGroupSchema) => {
        this._id = schema.id;
        tourable.uidGenerator.uid = this._id + 1;
    };
    export = () => {
        return {
            id: this.id,
            name: this.name,
            scenes: Array.from(this.scenes).map(([id, scene]) => {
                return scene.export();
            }),
        };
    };
}
