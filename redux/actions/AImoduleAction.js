import * as ActionList from "./ActionsList";
import SEHAT from "../../API/SEHATAI";
import { ERROR, SUCCESS } from "./MessageAction";

export const PREDICTION_MODEL = (payload) => ({
  type: ActionList.PREDICTION,
  payload,
});

export const GET_PREDICTION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post(`/heart_disease`, data)
      .then((response) => {
        console.log(response.data);
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
        callback();
      });
  };
};

export const GET_4_DISEASE_PREDICTION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post(`/HVJFp`, data)
      .then((response) => {
        console.log(response.data);
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
        callback();
      });
  };
};

export const ENHANCEMENT_MODEL = (payload) => ({
  type: ActionList.ENHANCEMENT,
  payload,
});

export const GET__IMAGE_ENHANCEMENT = (data, callback, errorCb) => {
  return async (dispatch) => {
    await SEHAT.post(`/imageEnhancement`, data)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
        errorCb();
      });
  };
};

export const GET__IMAGE_REGISTRATION = (data, callback, errorCb) => {
  return async (dispatch) => {
    await SEHAT.post(`/imageRegistration`, data)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
        errorCb();
      });
  };
};

export const GET_SYMPTOM_PREDICTION = (data, callback, errorCb) => {
  return async (dispatch) => {
    await SEHAT.post(`/symptonpredicton`, data)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
        errorCb();
      });
  };
};

export const GET_GRAPHS = (callback, errorCb) => {
  return async (dispatch) => {
    await SEHAT.get(`/graphs`)
      .then((response) => {
        console.log(response.data);
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
        errorCb();
      });
  };
};
