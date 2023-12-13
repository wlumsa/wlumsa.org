import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from '@vercel/analytics/react';
import "~/styles/globals.css";
import {Provider} from "react-redux"
import { store,persistor } from "~/redux/store";
import { PersistGate } from 'redux-persist/integration/react'
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor = {persistor}> 
        <Component {...pageProps} />
        <Analytics />
      </PersistGate>
      
    </Provider>
  );
};

export default MyApp;