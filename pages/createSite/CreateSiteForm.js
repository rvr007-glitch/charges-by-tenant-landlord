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
    type_site: "",
    charges_params: {
      electricity: {
        fixed: false,
        value: null,
      },
      water: {
        fixed: true,
        value: 300,
      },
      internet: {
        fixed: true,
        value: 1000,
      },
    },
  });
  const [charges, setCharges] = useState({});
  var { charges_params } = details;
  useEffect(() => {
    setCharges(charges_params);
  }, [details]);

  var charges_params_keys = Object.keys(charges_params);

  const updateCharges = (fieldName) => {
    console.log(fieldName);
    var temp = Object.keys(fieldName)[0];
    charges_params[`${temp}`] = fieldName[temp];
    setCharges(charges_params);
    console.log(charges_params);
  };

  useEffect(() => {
    setDetails({ ...details, charges_params });
  }, [charges_params]);

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    // console.log(details);
  };

  function submitHandler() {
    console.log(details);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(details);
    console.log(details);
  };

  const getDetails = async () => {
    if (state.userInfo?.token) {
      closeSnackbar();
      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
        },
      };
      try {
        axios.post("/api/auth/users/login", {}, config).then((res) => {
          dispatch({
            type: "USER_INFO_FETCHING",
            payload: res.data?.data,
          });
        });

        enqueueSnackbar("Data Retrieved", { variant: "success" });
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Signup", { varient: "success" });
    }
  };

  return (
    // <!-- Bootstrap CSS -->
    // <section className="a-create-side-main text-white">
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
                            groupName="type_site"
                            onChange={onChange}
                          />
                        </div>
                        <div className="col-4">
                          <RadioButton
                            value="Land"
                            name="Land"
                            groupName="type_site"
                            details={details}
                            onChange={onChange}
                          />
                        </div>
                        <div className="col-4">
                          <RadioButton
                            value="Shop"
                            name="Shop"
                            groupName="type_site"
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
                        <StateOptions />
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
                {charges_params
                  ? charges_params_keys.map((data) => {
                      return <CreateBottomRadioPart value={data} name={data} />;
                    })
                  : ""}
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
  );
}

export default CreateSiteForm;
