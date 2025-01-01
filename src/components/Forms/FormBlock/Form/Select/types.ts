import { BlockConfig } from "@payloadcms/plugin-form-builder/types";

export interface Options {
    label:string,
    value:string;
    limit?:number;
}


export type SelectField = {
    blockType: 'select',
    name: string,
    label?:string,
    width?:number,
    defaultValue?:string,
    options:Options[],
    required?:boolean,
}