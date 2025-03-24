import { BlockConfig } from "@payloadcms/plugin-form-builder/types";

export interface Checkboxes {
    label:string,
    limit?:number;
    value:boolean,
}

export interface ContactInfoField extends BlockConfig {
    blockType: "contactInfo",
    name: string,
    first_name: string,
    first_name_placeholder?: string,
    last_name_placeholder?: string, 
    last_name: string,
    email: string,
    email_placeholder?: string,
    studentID: string,
    studentID_placeholder?: string,
    label?:string,
    width?:number,
    required?:boolean,
}