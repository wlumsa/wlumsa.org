import { BlockConfig } from "@payloadcms/plugin-form-builder/types";

export interface Checkboxes {
    label:string,
    limit?:number;
    value:boolean,
}

export interface CheckboxField extends BlockConfig {
    blockType: "checkbox",
    name: string,
    label?:string,
    width?:number,
    isMultipleChoice:boolean,
    checkboxes:Checkboxes[],
    required?:boolean,
}