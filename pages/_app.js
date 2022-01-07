import '../styles/globals.css'
import '../styles/p_auth.css'
import '../styles/generateCharges.css'
import "../styles/Profile.css";
import "../styles/Landing.css"
// import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { useEffect } from "react";


function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap");
  // }, []);
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (ctx) => {
  const areLogsEnabled = ctx?.router?.query?.debug || "";
  global.areLogsEnabled = areLogsEnabled === "true";
  return {};
};

export default MyApp
