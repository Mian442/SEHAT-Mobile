import * as ActionList from "./ActionsList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SEHAT from "../../API/SEHAT";
import { ERROR, SUCCESS } from "./MessageAction";
import axios from "axios";

export const IS_LOGGED_IN = () => ({
  type: ActionList.IS_LOGGED_IN,
});

export const IS_LOGGED_OUT = () => ({
  type: ActionList.IS_LOGGED_OUT,
});

export const TOKEN = (payload) => ({
  type: ActionList.USER_TOKEN,
  payload,
});

export const USER_STATUS_REGISTER = (data, callback) => {
  return async (dispatch) => {
    console.log("ff")
    await SEHAT.post("/auth/signup", data)
      .then((response) => {
        dispatch(USER(response.data));
        dispatch(
          SUCCESS({ content: "Registration Successful!", type: "success" })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const USER_STATUS_LOGIN = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/auth/login/", data)
      .then((response) => {
        dispatch(SUCCESS({ content: "Login Successful", type: "success" }));
        dispatch(USER(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const USER = (data) => {
  return async (dispatch) => {
    await AsyncStorage.setItem("Token", JSON.stringify(data));
    dispatch(TOKEN(data));
    dispatch(IS_LOGGED_IN());
  };
};

export const USER_STATUS_IN = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("Token");
    if (token !== null) {
      dispatch(TOKEN(JSON.parse(token)));
      dispatch(GET_USER_VITALS(JSON.parse(token)._id, () => {}));
      dispatch(IS_LOGGED_IN());
    }
  };
};

export const USER_STATUS_OUT = () => {
  return async (dispatch) => {
    dispatch(IS_LOGGED_OUT());
    await AsyncStorage.removeItem("Token");
  };
};

export const INFORMATION = (payload) => ({
  type: ActionList.USER_INFORMATION,
  payload,
});

export const USER_INFORMATION = (type, id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/user/${type}/${id}`)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
      });
  };
};

export const ADD_USER_INFORMATION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/information/add", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(TOKEN(response.data.user));
        dispatch(
          SUCCESS({ content: "Information Added Successful!", type: "success" })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const USER_INFORMATION_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/information/update", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        let d = {
          pic: response.data.user.pic,
          name: response.data.user.name,
          email: response.data.user.email,
          gender: response.data.user.gender,
          _id: response.data.user._id,
          role: response.data.user.role,
        };
        dispatch(USER(d));
        dispatch(
          SUCCESS({
            content: "Information Updated Successful!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const VITALS = (payload) => ({
  type: ActionList.USER_VITAL,
  payload,
});

export const GET_USER_VITALS = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/user/vitals/${id}`)
      .then((response) => {
        dispatch(
          VITALS(
            response.data.vitals
              ? response.data.vitals[response.data.vitals.length - 1]
              : null
          )
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
      });
  };
};

export const ADD_USER_MEDICAL_HISTORY = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/medicalHistory/add", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Medical History Added Successful!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const USER_MEDICAL_HISTORY_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/medicalHistory/update", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Medical History Updated Successful!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const ADD_USER_VITAL = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/vitals/add/", data)
      .then((response) => {
        dispatch(GET_USER_VITALS(data.id, callback));
        dispatch(
          SUCCESS({
            content: "Vital Added Successful!",
            type: "success",
          })
        );
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const USER_VITAL_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/vitals/update/", data)
      .then((response) => {
        dispatch(VITALS(response.data.vitals[response.data.vitals.length - 1]));
        dispatch(
          SUCCESS({
            content: "Vital Updated Successful!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const ADD_MEDICAL_STATUS = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/medicineStatus/add", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Medical Status Added Successful!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
        } else if (error.request) {
          a.content = "Bad Request!";
        } else {
          a.content = error.message;
        }
        dispatch(ERROR(a));
      });
  };
};

export const USER_MEDICAL_STATUS_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/medicineStatus/update", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Medical Status Updated Successful!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const USER_MEDICAL_STATUS_CHANGE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/medicineStatus/change", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Medical Status Delete Successful!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const DOCTOR_VERIFICATION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/admin/", data)
      .then((response) => {
        dispatch(USER(response.data));
        dispatch(
          SUCCESS({
            content: "Your Request is Approved",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const GET_APPOINTMENT = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/appointment/user/` + id)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const DELETE_APPOINTMENT = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put(`/appointment/delete/`, data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Appointment is Canceled!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const CHAT = (payload) => ({
  type: ActionList.CHAT_LIST,
  payload,
});

export const GET_CHAT_LIST = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/user/chatList/` + id)
      .then((response) => {
        dispatch(CHAT(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const MESSAGE = (payload) => ({
  type: ActionList.MESSAGE_LIST,
  payload,
});

export const GET_MESSAGE_LIST = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/user/messages/` + id)
      .then((response) => {
        dispatch(MESSAGE(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const GET_MESSAGE_BY_IDS = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/user/MessagesByIds/` + JSON.stringify(data))
      .then((response) => {
        dispatch(MESSAGE(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const WALLET = (payload) => ({
  type: ActionList.WALLET,
  payload,
});

export const GET_WALLET = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/wallet/${id}`)
      .then((response) => {
        dispatch(WALLET(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const ADD_WALLET = (data, msg, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/wallet/", data)
      .then((response) => {
        dispatch(WALLET(response.data));
        console.log(response.data);
        dispatch(
          SUCCESS({
            content: "Balance is Added to wallet!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const PAYMENT_WITH_API = (id, data, callback) => {
  return async (dispatch) => {
    await axios
      .post(
        "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction",
        data
      )
      .then((response) => {
        console.log(response.data);
        console.log(typeof response.data.pp_Amount);
        if (response.data.pp_ResponseCode === "000") {
          let d = {
            user: id,
            amount: parseInt(response.data.pp_Amount) / 100,
            transaction_id: response.data.pp_TxnRefNo,
            method: response.data.pp_TxnType,
          };
          dispatch(ADD_WALLET(d, response.data.pp_ResponseMessage, callback));
        } else {
          dispatch(
            ERROR({
              content: response.data.pp_ResponseMessage,
              type: "error",
            })
          );
          callback();
        }
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const USER_FAVORITE = (payload) => ({
  type: ActionList.FAVORITE,
  payload,
});
export const USER_FAVORITE_LIST = (payload) => ({
  type: ActionList.FAVORITE_LIST,
  payload,
});

export const ADD_FAVORITE = (id, data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/user/add-favorite/" + id, data)
      .then(async (response) => {
        console.log(response.data.favorite);
        await AsyncStorage.setItem(
          "favorite",
          JSON.stringify(response.data.favorite)
        );
        dispatch(USER_FAVORITE(response.data.favorite));
        console.log(response.data);
        dispatch(
          SUCCESS({
            content: "Added to Favorite!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const REMOVE_FAVORITE = (id, data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/user/remove-favorite/" + id, data)
      .then(async (response) => {
        await AsyncStorage.setItem(
          "favorite",
          JSON.stringify(response.data.favorite)
        );
        dispatch(USER_FAVORITE(response.data.favorite));
        console.log(response.data);
        dispatch(
          SUCCESS({
            content: "Removed From Favorite!",
            type: "success",
          })
        );
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const GET_FAVORITE = () => {
  return async (dispatch) => {
    let favorite = await AsyncStorage.getItem("favorite");
    console.log(favorite);
    if (favorite) {
      dispatch(USER_FAVORITE(JSON.parse(favorite)));
    }
  };
};

export const GET_FAVORITES_DB = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get("/user/favorite/" + id)
      .then(async (response) => {
        dispatch(USER_FAVORITE_LIST(response.data));
        console.log("direct", response.data);
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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

export const GET_USER_PERCEPTION = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get("/perception/" + id)
      .then(async (response) => {
        dispatch(INFORMATION(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        let a = { content: "", type: "error" };
        if (error.response) {
          a.content = error.response.data.error;
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
