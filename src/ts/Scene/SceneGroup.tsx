import Entity, { EntitySchema } from "../Entity/Entity";
import Tourable from "../Tourable/Tourable";
import Scene from "./Scene";
export interface SceneGroupSchema extends EntitySchema {
    name: string;
    sceneIds: number[];
    description: string;
}
export default class SceneGroup extends Entity implements SceneGroupSchema {
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
    //#region description
    private _description: string = "";
    public get description(){
        return this._description;
    }
    public set description(value: string){
        this._description = value;
    }
    //#endregion
    constructor(tourable: Tourable, schema?: SceneGroupSchema) {
        super(tourable, schema)
        tourable.sceneManager.sceneGroups.push(this);
        // register to tourable
        tourable.sceneGroups.set(this.id, this);
        // resolve observable upon creation
        tourable.sceneGroupObservable.Resolve();
    }
    addScene = (scene: Scene) => {
        if (!this.sceneIds.includes(scene.id)) {
            this.sceneIds.push(scene.id);
        }
    };
    loadSchema = (tourable: Tourable, schema: SceneGroupSchema) => {
        this.loadEntitySchema(tourable, schema);
        if (schema){
            this._name = schema.name;
            this.sceneIds = schema.sceneIds;
            this._description = schema.description;
        } else {
            // no logic yet
        }
    };
    delete = (tourable: Tourable) => {
        this.sceneIds.map((sceneID) => {
            tourable.scenes.get(sceneID).delete(tourable);
        });
    };
    export: () => SceneGroupSchema = () => {
        let entitySchema = this.exportEntity() as SceneGroupSchema;
        entitySchema.name = this._name;
        entitySchema.sceneIds = this.sceneIds;
        entitySchema.description = this._description;
        return entitySchema;
    };
}
