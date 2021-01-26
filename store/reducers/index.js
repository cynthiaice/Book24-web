import { combineReducers } from "redux";
import order from "./order";
//import hotels from "./hotels"
import {
  GET_HOTELS_DATA,
  GET_HOTELS_DATA_REQUEST,
  GET_HOTELS_DATA_SUCCESS,
  GET_HOTELS_DATA_ERROR,
  GET_CURRENT_HOTEL,
} from "../types";
const initialState = {
  hotels: [],
  loading: false,
  error: "",
  currentHotel: {},
};

function hotels(state = initialState, action = {}) {
  const newState = { ...state };
  switch (action.type) {
    case GET_HOTELS_DATA_REQUEST:
      return {
        ...state,
        hotels: [],
        loading: true,
        error: "",
      };
    case GET_HOTELS_DATA_SUCCESS:
      return {
        ...state,
        hotels: action.payload,
        loading: false,
        error: "",
      };
    case GET_HOTELS_DATA_ERROR:
      return {
        ...state,
        hotels: [],
        loading: false,
        error: action.payload,
      };

    case GET_CURRENT_HOTEL:
      return { ...state, currentHotel: action.payload };

    default:
      return initialState;
  }
}

const appReducer = combineReducers({
  order,
  hotels,
});

export default appReducer;
