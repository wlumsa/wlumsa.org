"use client"
import { Provider } from "react-redux"
import { store} from "./store"
import { PersistGate } from "redux-persist/integration/react";
import {persistor} from "./store"
export function Providers({children} : {children:React.ReactNode}){
    
    return (
        <Provider store = {store}>
            <PersistGate loading={null} persistor={persistor}>
            {children}
            </PersistGate>
        </Provider>
    )
}