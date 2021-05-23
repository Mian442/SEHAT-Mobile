import * as ActionList from "./ActionsList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SEHAT from "../../API/SEHAT";
import { Toast } from "native-base";

const SUCCESS = (msg) => {
  return Toast.show({
    text: msg,
    style: { margin: 10, borderRadius: 7 },
    textStyle: { textAlign: "center" },
    type: "success",
  });
};

const ERROR = (msg) => {
  return Toast.show({
    text: msg,
    type: "danger",
    style: { margin: 10, borderRadius: 7 },
    textStyle: { textAlign: "center" },
  });
};

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
    await SEHAT.post("/auth/signup", data)
      .then((response) => {
        dispatch(USER(response.data));
        SUCCESS("Registration Successful");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const USER_STATUS_LOGIN = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/auth/login/", data)
      .then((response) => {
        SUCCESS("Login Successful");
        dispatch(USER(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
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
        console.log(response.data.user);
        dispatch(INFORMATION(response.data));

        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
      });
  };
};

export const ADD_USER_INFORMATION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/information/add", data)
      .then((response) => {
        console.log(response.data);
        dispatch(INFORMATION(response.data));
        dispatch(TOKEN(response.data.user));
        SUCCESS("Information Updated Successful!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const USER_INFORMATION_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/information/update", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(TOKEN(response.data.user));
        SUCCESS("Information Updated Successful!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
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
        console.log(response.data.vitals);
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
        console.error(error.message);
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
      });
  };
};

export const ADD_USER_MEDICAL_HISTORY = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/medicalHistory/add", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Medical History Added Successful!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const USER_MEDICAL_HISTORY_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/medicalHistory/update", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Medical History Updated Successful!");
        callback();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const ADD_USER_VITAL = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/vitals/add/", data)
      .then((response) => {
        console.log(response.data);
        dispatch(GET_USER_VITALS(data.id, callback));
        SUCCESS("Vital Added Successful!");
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const USER_VITAL_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/vitals/update/", data)
      .then((response) => {
        dispatch(VITALS(response.data.vitals[response.data.vitals.length - 1]));
        SUCCESS("Vital Added Successful!");
        callback();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const ADD_MEDICAL_STATUS = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/medicineStatus/add", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Medical Status Added Successful!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
      });
  };
};

export const USER_MEDICAL_STATUS_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/medicineStatus/update", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Medical Status Added Successful!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const USER_MEDICAL_STATUS_CHANGE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put("/medicineStatus/change", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Medical Status Delete Successful!");
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const DOCTOR_VERIFICATION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/admin/", data)
      .then((response) => {
        dispatch(USER(response.data));
        SUCCESS("Your Request is Approved!");
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
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
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};

export const DELETE_APPOINTMENT = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put(`/appointment/delete/`, data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Appointment is Canceled!");
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
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
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
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
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
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
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR("Network Error!");
        }
        callback();
      });
  };
};
