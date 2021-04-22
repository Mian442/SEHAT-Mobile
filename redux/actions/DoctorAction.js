import * as ActionList from "./ActionsList";
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

export const INFORMATION = (payload) => ({
  type: ActionList.USER_INFORMATION,
  payload,
});

export const GET_DOC_RECORD = (name, id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/record/${name}/${id}`)
      .then((response) => {
        console.log(response.data);
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

export const DOC_ADD_SERVICES = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddServices/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Services Added Successful!");
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

export const DOC_ADD_QUALIFICATION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddQualification/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Qualification Added Successful!");
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

export const DOC_ADD_EXPERTISE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddExpertise/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("EXPERTISE Added Successful!");
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

export const DOC_ADD_ACHIEVEMENTS = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddAchievements/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Achievements Added Successful!");
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

export const DOC_ADD_PUBLICATION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddPublications/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Publication Added Successful!");
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

export const DOC_ADD_WORK_EXPERIENCE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddWorkExperience/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Work Experience Added Successful!");
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

export const GET_DOC_ONLINE_SCHEDULE = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/onlineSchedule/${id}`)
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

export const DOC_ADD_ONLINE_SCHEDULE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/OnlineSchedule/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Online Schedule Added Successful!");
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

export const REVIEW = (payload) => ({
  type: ActionList.REVIEW,
  payload,
});

export const GET_DOC_REVIEW = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/review/${id}`)
      .then((response) => {
        dispatch(REVIEW(response.data));
        callback();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          ERROR(error.response.data.error);
        } else if (error.request) {
          ERROR("Bad Request!");
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const DOC_ADD_REVIEW = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/review/", data)
      .then((response) => {
        dispatch(GET_DOC_INFORMATION(data.id, callback));
        SUCCESS("Review Added Successful!");
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

export const DOC_INFORMATION = (payload) => ({
  type: ActionList.DOCTOR_INFORMATION,
  payload,
});

export const DOCTORS = (payload) => ({
  type: ActionList.DOCTORS,
  payload,
});

export const GET_DOC_ALL_INFORMATION = (callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/`)
      .then((response) => {
        dispatch(DOCTORS(response.data));
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

export const ALL_DOC_SOCKET_UPDATE = (data) => {
  return async (dispatch) => {
    dispatch(DOCTORS(data));
  };
};

export const GET_DOC_INFORMATION = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/` + id)
      .then((response) => {
        dispatch(DOC_INFORMATION(response.data));
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

export const GET_DOC_SINGLE_INFORMATION = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/single/` + id)
      .then((response) => {
        dispatch(INFORMATION(response.data));
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

export const DOC_INFORMATION_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put(`/doctor/`, data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Profile updated Successful!");
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

export const ADD_APPOINTMENT = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post(`/appointment/`, data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        SUCCESS("Appointment Added Successful!");
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

export const GET_APPOINTMENT = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/appointment/doctor/` + id)
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

export const STATUS = (payload) => ({
  type: ActionList.DOCTORS_STATUS,
  payload,
});

export const SPECIALTY = (payload) => ({
  type: ActionList.CATEGORY_LIST,
  payload,
});

export const GET_SPECIALTY = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/specialty/` + id)
      .then((response) => {
        dispatch(SPECIALTY(response.data));
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
