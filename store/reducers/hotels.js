import {
    GET_HOTELS_DATA,
  GET_HOTELS_DATA_REQUEST,
  GET_HOTELS_DATA_SUCCESS,
  GET_HOTELS_DATA_ERROR,
  } from "../types";
  const initialState = {
  data:[],
   loading:false,
   error:"",
  };
  
  export default (state=initialState, action={})=>{
      switch (action.type) {
          case GET_HOTELS_DATA_REQUEST: 
          return {
              ...state,
             data:[],
             loading:true,
             error:""
            };
            case GET_HOTELS_DATA_SUCCESS: 
            return {
                ...state,
               data:action.payload,
               loading:false,
               error:""
              }; 
              case GET_HOTELS_DATA_ERROR: 
              return {
                  ...state,
                 data:[],
                 loading:false,
                 error:action.payload
                };
                default:
                    return initialState;
            }
  };
