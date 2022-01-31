import Head from 'next/head'
import HomePageBanner from "./components/HomePageBanner";
import Features from "./components/Features";
import GetStarted from "./components/GetStarted";
import Taskbar from "../profile/components/Taskbar";
import { useRouter } from "next/router";
import { Store } from "../../utility/Store";
import { useContext } from "react";

function HomePage() {
  const { dispatch, state } = useContext(Store);
  const router = useRouter();

  if (state.userInfo) {
    router.push("/profile/landlord");
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <HomePageBanner />
      <div className="Parent">
        <Taskbar />
        <div className="S_right">
          <Features />
          <GetStarted />
        </div>
      </div>
    </>
  );
}

export default HomePage;
