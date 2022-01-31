import Head from 'next/head'
import HorizontalInput from "./components/HorizontalInput";
import RadioButton from "./components/RadioButton";
import VerticalInput from "./components/VerticalInput";
import StateOptions from "./components/StateOptions";
import Header from "./components/Header";
import CreateBottomRadioPart from "./components/CreateBottomRadioPart";
import NormalBootstrapButton from "./components/NormalBootstrapButton";
import MyModal from "./components/MyModal";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utility/Store";
import axios from "axios";
import Cookies from "js-cookie";

function CreateSiteForm() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch, state } = useContext(Store);

  const [details, setDetails] = useState({
    alias_name: "",
    rent: "",
    deposit: "",
    first_line: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
    Type: "",
    charges_params: {},
  });

  //charges_params has became a local variable that can be used
  var { charges_params } = details;

  //saving the keys of the charges params object
  var charges_params_keys = Object.keys(charges_params);

  //updating the charges by the modal
  const updateCharges = (fieldName) => {
    var temp = Object.keys(fieldName)[0];
    charges_params[temp] = fieldName[temp];
    setDetails({ ...details, charges_params });
  };

  //this function updates the value of the parameters
  const pushCharges = (resultant = null) => {
    var result = Object.keys(resultant)[0];
    charges_params[`${result}`] = resultant[`${result}`];
    setDetails({ ...details, charges_params });
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  function submitHandler() {
    createSite();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(details);
  };

  //sending the backend request for saving the site

  const createSite = async () => {
    if (Cookies.get("userInfo")) {
      closeSnackbar();
      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
        },
      };
      try {
        await axios.post("/api/site", details, config).then((res) => {
          dispatch({
            type: "CREATING_SITE",
            payload: res.data,
          });
          router.push(`/landing/particularSite?id=${res.data.data._id}`);
          enqueueSnackbar("Site Created!👏🏻", { variant: "success" });
        });
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Login/Signup Required", { varient: "success" });
    }
  };

  const updateState = (inputParam) => {
    setDetails({ ...details, state: inputParam });
  };

  return (
    <>
      <Head>
        <title>Create Site</title>
      </Head>
      <section className="a-create-side-main">
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />

        <div className="a-create-site-upper">
          <div className="row">
            <div className="col-3 a-left-div"></div>
            <div className="col-9">
              <Header header="Enter Site Details" />
              <div className="container">
                <form>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <VerticalInput
                        fieldName="Alias name"
                        name="alias_name"
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group col-md-6 py-3">
                      <label htmlFor="input">Type</label>

                      <div className="container py-3">
                        <div className="row">
                          <div className="col-4">
                            <RadioButton
                              value="Room"
                              name="Room"
                              groupName="Type"
                              onChange={onChange}
                            />
                          </div>
                          <div className="col-4">
                            <RadioButton
                              value="Land"
                              name="Land"
                              groupName="Type"
                              details={details}
                              onChange={onChange}
                            />
                          </div>
                          <div className="col-4">
                            <RadioButton
                              value="Shop"
                              name="Shop"
                              groupName="Type"
                              onChange={onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <VerticalInput
                        fieldName="Rent"
                        name="rent"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <VerticalInput
                        fieldName="Deposit"
                        name="deposit"
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <div className="a-address-container">
                    <HorizontalInput
                      fieldName="Flat no:"
                      name="first_line"
                      onChange={onChange}
                    />
                    <HorizontalInput
                      fieldName="Landmark:"
                      name="landmark"
                      onChange={onChange}
                    />
                    <div className="row">
                      <div className="col-6">
                        <HorizontalInput
                          fieldName="City:"
                          name="city"
                          onChange={onChange}
                        />
                      </div>
                      <div className="col-6">
                        <HorizontalInput
                          fieldName="Pin Code:"
                          name="pincode"
                          onChange={onChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group row">
                        <div className="col-3">
                          <label htmlFor="inputState">State:</label>
                        </div>
                        <div className="col-3">
                          <StateOptions updateState={updateState} />
                        </div>
                        <div className="col-6">
                          <HorizontalInput
                            fieldName="Country:"
                            name="country"
                            onChange={onChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <Header header="Custom Bills (Monthly)" />

              <div className="a-monthly-container container">
                <div className="container a-create-bottom-radio-container">
                  {charges_params_keys.length
                    ? charges_params_keys.map((data, index) => {
                      return (
                        <CreateBottomRadioPart
                          value={data}
                          name={data}
                          pushCharges={pushCharges}
                          key={index}
                        />
                      );
                    })
                    : "Please add fields using Add Field button"}
                </div>
              </div>

              <div className="addField-container">
                {/* <NormalBootstrapButton
                name="Add Field"
                classNameProp="btn-warning a-right-align-button"
              /> */}
                <MyModal
                  buttonName="Add Field"
                  fieldName="Enter the field name:"
                  placeholderProp="Amount"
                  classNameProp="a-right-align-button"
                  updateCharges={updateCharges}
                />
              </div>
              <div className="a-finalButton-container">
                <NormalBootstrapButton
                  fieldName="Generate Site"
                  onClick={onSubmit}
                  classNameProp="btn-warning a-final-generateButton"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

export default CreateSiteForm;
