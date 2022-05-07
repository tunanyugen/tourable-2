import Schema from "../Interfaces/Schema";
import Tourable from "../Tourable/Tourable";
import Scene from "./Scene";
export interface SceneGroupSchema extends Schema {
    name: string;
    sceneIds: number[];
}
export default class SceneGroup implements SceneGroupSchema {
    //#region id
    private _id: number;
    public get id() {
        return this._id;
    }
    //#endregion
    //#region name
    private _name: string = `Default scene group ${new Date().getTime()}`;
    public get name() {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    //#endregion
    //#region sceneIds
    public sceneIds: number[] = [];
    //#endregion
    constructor(tourable: Tourable) {
        tourable.sceneManager.sceneGroups.push(this);
    }
    addScene = (scene: Scene) => {
        if (!this.sceneIds.includes(scene.id)) {
            this.sceneIds.push(scene.id);
        }
    };
    loadSchema = (tourable: Tourable, schema: SceneGroupSchema) => {
        this._name = schema.name;
    };
    delete = (tourable: Tourable) => {
        this.sceneIds.map((sceneID) => {
            tourable.scenes.get(sceneID).delete(tourable);
        });
    };
    export = () => {
        return {
            name: this.name,
            sceneIDs: this.sceneIds,
        };
    };
}
