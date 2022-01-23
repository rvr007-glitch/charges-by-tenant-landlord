// import "../styles/globals.css";
import "../styles/CreateSite.css";
import "../styles/generateCharges.css";
import "../styles/homepage.css";
import "../styles/Landing.css";
import "../styles/p_auth.css";
import "../styles/Profile.css";
import "../styles/EditProfile.css";
import "bootstrap/dist/css/bootstrap.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";

import "../styles/particularSite.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { StoreProvider } from "../utility/Store";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <StoreProvider>
        {/* <PayPalScriptProvider deferLoading={true}> */}
        <Component {...pageProps} />
        {/* </PayPalScriptProvider> */}
      </StoreProvider>
    </SnackbarProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const areLogsEnabled = ctx?.router?.query?.debug || "";
  global.areLogsEnabled = areLogsEnabled === "true";
  return {};
};

export default MyApp;
