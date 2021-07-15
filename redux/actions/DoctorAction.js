import * as ActionList from "./ActionsList";
import SEHAT from "../../API/SEHAT";
import { ERROR, SUCCESS } from "./MessageAction";

export const INFORMATION = (payload) => ({
  type: ActionList.USER_INFORMATION,
  payload,
});

export const GET_DOC_RECORD = (name, id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/record/${name}/${id}`)
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

export const DOC_ADD_SERVICES = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddServices/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Services Added Successful!",
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

export const DOC_ADD_QUALIFICATION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddQualification/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Qualification Added Successful!",
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

export const DOC_ADD_EXPERTISE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddExpertise/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "EXPERTISE Added Successful!",
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

export const DOC_ADD_ACHIEVEMENTS = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddAchievements/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Achievements Added Successful!",
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

export const DOC_ADD_PUBLICATION = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddPublications/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Publication Added Successful!",
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

export const DOC_ADD_WORK_EXPERIENCE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/record/AddWorkExperience/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Work Experience Added Successful!",
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

export const GET_DOC_ONLINE_SCHEDULE = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/onlineSchedule/${id}`)
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

export const DOC_ADD_ONLINE_SCHEDULE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/OnlineSchedule/", data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Online Schedule Added Successful!",
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

export const DOC_ADD_REVIEW = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post("/review/", data)
      .then((response) => {
        dispatch(GET_DOC_INFORMATION(data.id, callback));
        dispatch(
          SUCCESS({
            content: "Review Added Successful!",
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

export const GET_DOC_SINGLE_INFORMATION = (id, callback) => {
  return async (dispatch) => {
    await SEHAT.get(`/doctor/single/` + id)
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

export const DOC_INFORMATION_UPDATE = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.put(`/doctor/`, data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Profile updated Successful!",
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

export const ADD_APPOINTMENT = (data, callback) => {
  return async (dispatch) => {
    await SEHAT.post(`/appointment/`, data)
      .then((response) => {
        dispatch(INFORMATION(response.data));
        dispatch(
          SUCCESS({
            content: "Appointment Added Successful!",
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
    await SEHAT.get(`/appointment/doctor/` + id)
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
