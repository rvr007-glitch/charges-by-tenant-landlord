import Head from 'next/head'
import Image from "next/image";
import Landlord from "../../public/images/Landlord.png";
import Home_fill from "../../public/images/Home_fill.png";
import Ellipse47 from "../../public/images/Ellipse47.png";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Store } from "../../utility/Store";
import axios from "axios";
import Cookies from "js-cookie";

function Lsignin() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch, state } = useContext(Store);

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  var { email, password } = details;

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    console.log([e.target.name] + " " + e.target.value);
  };

  const onSubmit = (e) => {
    console.log(details);
    e.preventDefault();
    submitHandler(details);
  };

  // const checkDetails = (details) => {
  //   id(details.email.length == 0);
  // };

  if (state.userInfo) {
    router.push("/profile/landlord");
  }

  const submitHandler = async (details) => {
    closeSnackbar();

    try {
      console.log(details);
      const res = await axios.post("/api/auth/users/signin", details);
      console.log(details);
      dispatch({ type: "USER_SIGNIN", payload: res.data });
      Cookies.set("userInfo", JSON.stringify(res.data));
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      enqueueSnackbar("User Signed In Successfully", { variant: "success" });
      router.push(redirect || "/profile/landlord");
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.response?.data?.message, { variant: "error" });
    }
  };
  return (
    <>
      <Head>
        <title>Landlord SignIn</title>
      </Head>
      <div className="main1">
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossOrigin="anonymous"
        />
        <section className="sign-in">
          <div className="container pr_container prj">
            <div className="fish1">
              <Image src={Home_fill} alt="sub" />
            </div>
            <div className="fishes1">
              <Image src={Ellipse47} alt="sub" />
            </div>
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <Image
                    src={Landlord}
                    height={350}
                    width={530}
                    alt="sing up image"
                  />
                </figure>
              </div>
              <div className="signin-form">
                <h2 className="form-title pr_form-title pr_h2">
                  Landlord Sign In
                </h2>
                <form method="POST" className="register-form" id="login-form">
                  <div className="form-group pr_form-group">
                    <label htmlFor="your_name">
                      <i className="fas fa-user"></i>
                    </label>
                    <input
                      className="pa_input"
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group pr_form-group">
                    <label htmlFor="your_pass">
                      <i className="fas fa-lock"></i>
                    </label>
                    <input
                      className="pa_input"
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="custom-control custom-checkbox pt-5">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label p_remember"
                      htmlFor="customCheck1"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div className="form-group pr_form-group form-button pr_form-button">
                    <button
                      type="submit"
                      name="signin"
                      className=" btn btn-primary pr_form-submit"
                      value="Sign In"
                      onClick={(e) => onSubmit(e)}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="p_mem">
                    Not a member?
                    <Link href="/auth/LandlordSignup">Sign Up</Link>
                  </div>
                </form>
                <div className="social-login">
                  <span className="social-label">Or login with</span>
                  <ul className="socials">
                    <li>
                      <a href="#">
                        <i className=" fab fa-facebook-square fa-3x "></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className=" fab fa-twitter fa-3x"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="zmdi-google fab fa-google fa-3x"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Lsignin;
