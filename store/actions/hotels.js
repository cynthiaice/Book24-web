import axios from "axios";
import { API_URL } from "../../components/config.js";
import {
  GET_HOTELS_DATA,
  GET_HOTELS_DATA_REQUEST,
  GET_HOTELS_DATA_SUCCESS,
  GET_HOTELS_DATA_ERROR,
  GET_CURRENT_HOTEL,
} from "../types";
const config = {
  timeout: 20000,
};
export const getHotelData = () => {
  return async (dispatch) => {
    dispatch({ type: GET_HOTELS_DATA_REQUEST });
    return await axios
      .get(API_URL + "hotels", config)
      .then((res) => {
        dispatch({ type: GET_HOTELS_DATA_SUCCESS, payload: res.data.rows });
        console.log(res.data);
      })
      .catch((err) => {
        dispatch({ type: GET_HOTELS_DATA_ERROR, payload: err.response });
      });
  };
};

export const getCurrentHotel = (payload) => {
  return {
    type: GET_CURRENT_HOTEL,
    payload,
  };
};
