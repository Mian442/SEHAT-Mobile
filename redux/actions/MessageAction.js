import * as ActionList from "./ActionsList";
export const SUCCESS = (payload) => ({
  type: ActionList.MESSAGE,
  payload,
});
export const ERROR = (payload) => ({
  type: ActionList.MESSAGE,
  payload,
});
export const WARRING = (payload) => ({
  type: ActionList.MESSAGE,
  payload,
});
export const INFO = (payload) => ({
  type: ActionList.MESSAGE,
  payload,
});
export const NO_MESSAGE = (payload) => ({
  type: ActionList.MESSAGE_NULL,
  payload,
});
