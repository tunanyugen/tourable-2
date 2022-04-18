import HasSchema from "../Interfaces/HasSchema";
import Schema from "../Interfaces/Schema";
import Tourable from "../Tourable/Tourable";
import Scene from "./Scene";
export interface SceneGroupSchema extends Schema {
    name: string;
    sceneIDs: number[];
}
export default class SceneGroup implements HasSchema, SceneGroupSchema {
    private _name: string = "Default scene group";
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public sceneIDs: number[] = [];
    constructor(tourable:Tourable){
        tourable.sceneManager.sceneGroups.push(this);
    }
    addScene = (scene: Scene) => {
        if (!this.sceneIDs.includes(scene.id)){
            this.sceneIDs.push(scene.id);
        }
    }
    loadSchema = (tourable: Tourable, schema: SceneGroupSchema) => {
        this._name = schema.name;
    };
    delete = (tourable: Tourable) => {
        this.sceneIDs.map((sceneID) => {
            tourable.sceneManager.scenes.get(sceneID).delete(tourable);
        })
    }
    export = () => {
        return {
            name: this.name,
            sceneIDs: this.sceneIDs,
        };
    };
}
