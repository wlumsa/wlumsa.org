import { BlockConfig } from "@payloadcms/plugin-form-builder/types";

export interface Options {
    label:string,
    value:string;
    limit?:number;
}


export interface SelectField extends BlockConfig {
    blockType: 'select',
    name: string,
    label?:string,
    width?:number,
    defaultValue?:string,
    options:Options[],
    required?:boolean,
}