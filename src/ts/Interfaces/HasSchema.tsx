import Tourable from "../Tourable/Tourable";
import Schema from "./Schema";

export default interface HasSchema{
    loadSchema: (tourable:Tourable, schema:Schema) => void,
    export: () => Schema,
}