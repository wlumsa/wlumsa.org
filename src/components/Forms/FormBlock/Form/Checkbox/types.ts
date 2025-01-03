import { BlockConfig } from "@payloadcms/plugin-form-builder/types";


export interface CheckboxField extends BlockConfig {
    blockType: "checkbox",
    name: string,
    label?:string,
    width?:number,
    defaultValue?:boolean,
    limit?:number;
    required?:boolean,
}