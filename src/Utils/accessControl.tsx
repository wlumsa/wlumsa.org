 import { auth as fetchAuth } from "@clerk/nextjs/server";

import type { Access } from "payload";
 export const isUser: Access = async ({ req }) => {
  if( req.user?.roles?.includes('admin')) {
    return true;
  }
    const user = await fetchAuth();
    console.log('user', user)
    if(!user.userId){
      return false;
    }
   return user.userId != null ;
   };


