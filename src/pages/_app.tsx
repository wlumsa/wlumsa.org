import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "~/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import  {useRouter} from "next/router"
import Navbar from "~/components/Global/Navbar";
import Footer from "~/components/Global/Footer";
import { AppProps } from "next/app";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const showNavbarFooter = !router.pathname.startsWith('/cms');
  return (
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        
        {showNavbarFooter && <Navbar />}
        <Component {...pageProps} />
        {showNavbarFooter && <Footer />}
        <Analytics />
      </PersistGate>
    </Provider>
  );
}


/*
const router = useRouter();

  // Check if the current path starts with /cms
  const showNavbarFooter = !router.pathname.startsWith('/cms');

  return (
    <>
      {showNavbarFooter && <Navbar />}
      <Component {...pageProps} />
      {showNavbarFooter && <Footer />}
    </>
  );
}

*/

