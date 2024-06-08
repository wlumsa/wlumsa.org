import { Access,FieldAccess } from "payload/types";

export const isAdmin:Access<any,User> = ({req : {user}}) => {
    
    return Boolean(user?.roles?.includes('admin'))
}