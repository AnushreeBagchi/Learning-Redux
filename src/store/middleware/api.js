import axios from "axios";
import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }

  const { url, data, method, onStart, onSuccess, onError } = action.payload;
  if (onStart) {
    dispatch({ type: onStart });
  }
  next(action);

  
  try {
    const response = await axios.request({
      url: "http://localhost:9001/api/bugs/",
      method,
      data,
    });
    //general
    dispatch(actions.apiCallSuccess(response.data));
    //specific
    if (onSuccess) {
      dispatch({
        type: onSuccess,
        payload: response.data,
      });
    }
  } catch (error) {
    //general error action
    dispatch(actions.apiCallFailed(error));
    if (onError) {
      dispatch({
        type: onError,
        payload: error,
      });
    }
  }
};
export default api;
