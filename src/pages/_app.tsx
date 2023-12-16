import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "~/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <Component {...pageProps} />
        <Analytics />
      </PersistGate>
    </Provider>
  );
}
