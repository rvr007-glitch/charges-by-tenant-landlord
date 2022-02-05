import Head from "next/head";
import AfterEditContent from "./components/AfterEditContent";
import BeforeEditContent from "./components/BeforeEditContent";
import EditBirthday from "./components/EditBirthday";
import Taskbar from "../profile/components/Taskbar";
import Heading from "../landing/components/Heading";
import BeforeEditAddress from "./components/BeforeEditAddress";
import AfterEditAddress from "./components/AfterEditAddress";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
import AddressInput from "./components/AddressInput";
import MyModal from "./components/MyModal";
import * as ReactBootStrap from "react-bootstrap";
import { AllFormatter } from "../../utility/Functions/AllFormatter";

function EditTenant() {
  // Integration Code
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    if (Cookies.get("userInfo")) {
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
          setLoading(true);
        });
        enqueueSnackbar("Data Retrieved", { variant: "success" });
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Sign/Signup required", { varient: "success" });
    }
  };

  // Normal page code
  const [show, setShow] = useState({
    Username: true,
    Email: true,
    Name: true,
    Contact: true,
    Address: true,
    Birthday: true,
    Verification: true,
    Occupation: true,
  });

  const allTrue = () => {
    //  if cancelled, then update the data to original
    // initialiseDetails();
    // closing all the input fields
    setShow((previousState) => {
      return {
        ...previousState,
        Username: true,
        Name: true,
        Contact: true,
        Address: true,
        Birthday: true,
        Verification: true,
        Occupation: true,
        Address: true,
      };
    });
  };

  const editUsername = () => {
    allTrue();
    setShow((previousState) => {
      return { ...previousState, Username: false };
    });
  };
  const editName = () => {
    allTrue();
    setShow((previousState) => {
      return { ...previousState, Name: false };
    });
  };
  const editContact = () => {
    allTrue();
    setShow((previousState) => {
      return { ...previousState, Contact: false };
    });
  };
  const editAddress = () => {
    allTrue();
    setShow((previousState) => {
      return { ...previousState, Address: false };
    });
  };
  const editBirthday = () => {
    allTrue();
    setShow((previousState) => {
      return { ...previousState, Birthday: false };
    });
  };
  const editVerification = () => {
    allTrue();
    setShow((previousState) => {
      return { ...previousState, Verification: false };
    });
  };
  const editOccupation = () => {
    allTrue();
    setShow((previousState) => {
      return { ...previousState, Occupation: false };
    });
  };

  const cancel = () => {
    allTrue();
  };

  const save = () => {
    editHandler(details).then(allTrue());
  };

  // Initialising details
  const [details, setDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    contact: "",
    address: {
      first_line: "",
      landmark: "",
      city: "",
      state: "",
      Country: "",
      pincode: "",
    },
    DOB: "",
    occupation: "",
    verification: "",
  });

  function initialiseDetails() {
    var notProvided = "Not Provided";
    setDetails({
      ...details,
      username: state.userInfo?.username
        ? state.userInfo.username.length
          ? state.userInfo.username
          : notProvided
        : notProvided,
      name: state.userInfo?.name
        ? state.userInfo.name?.length
          ? AllFormatter(state.userInfo.name, 4)
          : notProvided
        : notProvided,
      contact: state.userInfo?.contact ? state.userInfo.contact : 0,
      address: {
        first_line: state.userInfo?.address?.first_line
          ? state.userInfo?.address?.first_line.length
            ? AllFormatter(state.userInfo?.address?.first_line, 4)
            : notProvided
          : notProvided,
        landmark: state.userInfo?.address?.landmark
          ? state.userInfo?.address?.landmark.length
            ? AllFormatter(state.userInfo?.address?.landmark, 4)
            : notProvided
          : notProvided,
        city: state.userInfo?.address?.city
          ? state.userInfo?.address?.city.length
            ? AllFormatter(state.userInfo?.address?.city, 4)
            : notProvided
          : notProvided,
        state: state.userInfo?.address?.state
          ? state.userInfo?.address?.state.length
            ? AllFormatter(state.userInfo?.address?.state, 4)
            : notProvided
          : notProvided,
        Country: state.userInfo?.address?.Country
          ? state.userInfo?.address?.Country.length
            ? AllFormatter(state.userInfo?.address?.Country, 4)
            : notProvided
          : notProvided,
        pincode: state.userInfo?.address?.pincode
          ? state.userInfo?.address?.pincode
          : 0,
      },
      DOB: state.userInfo?.DOB
        ? state.userInfo.DOB.split("T")[0]
        : "1111-11-11",
      verification: state.userInfo?.verification
        ? state.userInfo.verification.length
          ? state.userInfo.verification
          : notProvided
        : notProvided,
      occupation: state.userInfo?.occupation
        ? state.userInfo.occupation.length
          ? state.userInfo.occupation
          : notProvided
        : notProvided,
    });
  }

  useEffect(() => {
    initialiseDetails();
  }, [state.userInfo]);

  // Taking input from users
  const handleInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  // Edit details backend route
  const editHandler = async (details) => {
    closeSnackbar();
    let config = {
      headers: {
        authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
      },
    };
    try {
      axios
        .put("/api/profile/edit", details, config)
        .then((res) => {
          dispatch({
            type: "USER_INFO_UPDATING",
            payload: res.data?.data,
          });
          setLoading(true);
          initialiseDetails();
          enqueueSnackbar("Details Editted", { variant: "success" });
          getDetails();
        })
        .catch((err) => {
          enqueueSnackbar(err.response?.data?.message, { variant: "error" });
        });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  const pushAddress = async (addressInput) => {
    setDetails({ ...details, address: addressInput });
    if (details.address == addressInput) {
      save();
    } else {
      enqueueSnackbar("Click Again", { variant: "warning" });
    }
  };

  const pushBirthday = async (birthdayInput) => {
    setDetails({ ...details, DOB: birthdayInput });
    if (details.DOB == birthdayInput) {
      save();
    } else {
      enqueueSnackbar("Click Again", { variant: "warning" });
    }
  };

  const updatePassword = async (detailsWithPasswordInput) => {
    editHandler(detailsWithPasswordInput);
  };

  // Mapped data
  const allContent = [
    {
      toShow: show.Username,
      title: "Username",
      content: details.username,
      editButtonClick: editUsername,
      name: "username",
    },
    {
      toShow: show.Email,
      title: "Email",
      content: state.userInfo?.email,
    },
    {
      toShow: show.Name,
      title: "Full Name",
      content: details.name,
      editButtonClick: editName,
      name: "name",
    },
    {
      toShow: show.Contact,
      title: "Contact",
      content: details.contact,
      editButtonClick: editContact,
      name: "contact",
    },
    {
      toShow: show.Address,
      title: "Address",
      content: {
        first_line: details.address.first_line,
        landmark: details.address.landmark,
        city: details.address.city,
        state: details.address.state,
        Country: details.address.Country,
        pincode: details.address.pincode,
      },
      editButtonClick: editAddress,
      name: "address",
    },
    {
      toShow: show.Birthday,
      title: "Birthday",
      content: details.DOB,
      editButtonClick: editBirthday,
      name: "DOB",
    },
    {
      toShow: show.Verification,
      title: "Verification",
      content: details.verification,
      editButtonClick: editVerification,
      name: "verification",
    },
    {
      toShow: show.Occupation,
      title: "Occupation",
      content: details.occupation,
      editButtonClick: editOccupation,
      name: "occupation",
    },
  ];

  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      {loading ? (
        <section>
          <div className="Parent">
            <Taskbar />
            <div className="S_right">
              <Heading head="Edit Profile Page" />
              <div className="a-center">
                <div className="a-edit-container shadow-lg rounded p-3 bg-white">
                  <strong>
                    <div className="a-title">Your Information</div>
                  </strong>
                  <div className="container">
                    {allContent.map((data) => {
                      return (
                        <div key={data.title} className="a-row-content">
                          {data.toShow ? (
                            data.title == "Email" ? (
                              <BeforeEditContent
                                title={data.title}
                                content={data.content}
                              />
                            ) : data.title == "Address" ? (
                              // Address Before Editing
                              <div>
                                <div className="row a-edit-content a-row-wrapper">
                                  <div className="col-lg-11 col-sm-10">
                                    <div className="a-title-small">Address</div>
                                  </div>
                                  <div className="col-lg-1 col-sm-2">
                                    <button
                                      className="a-edit"
                                      onClick={editAddress}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </div>
                                <div className="container">
                                  <BeforeEditAddress
                                    title="First Line"
                                    content={data.content.first_line}
                                  />
                                  <BeforeEditAddress
                                    title="Landmark"
                                    content={data.content.landmark}
                                  />
                                  <BeforeEditAddress
                                    title="City"
                                    content={data.content.city}
                                  />
                                  <BeforeEditAddress
                                    title="State"
                                    content={data.content.state}
                                  />
                                  <BeforeEditAddress
                                    title="Pincode"
                                    content={data.content.pincode}
                                  />
                                  <BeforeEditAddress
                                    title="Country"
                                    content={data.content.Country}
                                    editButtonClick={data.editButtonClick}
                                  />
                                </div>
                              </div>
                            ) : (
                              <BeforeEditContent
                                title={data.title}
                                content={data.content}
                                editButtonClick={data.editButtonClick}
                              />
                            )
                          ) : data.title == "Address" ? (
                            // Address while editing
                            <AddressInput
                              details={data}
                              pushAddress={pushAddress}
                              cancelClick={cancel}
                            />
                          ) : data.title == "Birthday" ? (
                            <EditBirthday
                              title={data.title}
                              cancelClick={cancel}
                              pushBirthday={pushBirthday}
                            />
                          ) : (
                            <AfterEditContent
                              title={data.title}
                              content={data.content}
                              saveClick={save}
                              cancelClick={cancel}
                              name={data.name}
                              onChange={handleInput}
                            />
                          )}
                        </div>
                      );
                    })}

                    {/* History */}
                    <div className="row a-edit-content a-row-wrapper">
                      <div className="col-lg-4 col-sm-12">
                        <span className="a-edit-left-title">Total Sites</span>
                      </div>
                      <div className="col-lg-8 col-sm-12">
                        {state.userInfo?.site_list?.length > 0 ? (
                          <span className="a-edit-right-content a-title-small">
                            {state.userInfo?.site_list?.length}
                          </span>
                        ) : (
                          <span className="a-edit-right-content a-not-provided">
                            No Sites
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Change Password */}
                    <div className="row a-edit-content a-row-wrapper">
                      <div className="col-lg-4 col-sm-12">
                        <MyModal
                          buttonName="Change Password"
                          details={details}
                          updatePassword={updatePassword}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="p_spinner">
          <ReactBootStrap.Spinner animation="border" />
        </div>
      )}
    </>
  );
}

export default EditTenant;
