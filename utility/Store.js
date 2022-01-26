import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")).data
    : null,
  siteDetail: {},
  mySites: []
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload?.data };
    case "USER_SIGNUP":
      return { ...state, userInfo: action.payload?.profile };
    case "USER_INFO_FETCHING":
      return { ...state, userInfo: action.payload?.profile };
    case "CREATING_SITE":
      return {...state, siteDetail: action.payload?.data}
    case "GET_PARTICULAR_SITE":
      return {...state, siteDetail: action.payload?.data[0]}
    case "GET_ALL_SITES":
      return {...state, mySites: action.payload?.data}
    case "USER_LOGOUT":
      Cookies.remove("userInfo")
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}


/* 
{
  "sucess": true,
  "data": {
      "id": "61e7c2d92d1f9e0f41b0e50d",
      "iat": 1642865605,
      "profile": {
          "_id": "61e7c2d92d1f9e0f41b0e50d",
          "name": "Anuj",
          "username": "anujjaddhu",
          "email": "anujjaddhu@gmail.com",
          "contact": 8767924554,
          "password": "$2b$10$uM7OWENnZRad3GVxwem/a.Oq.fdn/YRd.4Vk8iRkbBpBokaKmcqEq",
          "site_list": [],
          "createdAt": "2022-01-19T07:50:49.697Z",
          "updatedAt": "2022-01-19T07:50:49.697Z",
          "__v": 0
      }
  },
 */