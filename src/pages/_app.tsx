import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "~/redux/store";
import { PersistGate } from "redux-persist/integration/react";


import { AppProps } from "next/app";
import ThemeToggleButton from "~/components/ThemeToggleButton";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <div className="flex min-h-screen flex-col">
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
        </div>
        <Analytics />
      </PersistGate>
    </Provider>
  );
}