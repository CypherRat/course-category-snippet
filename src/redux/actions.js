import { ActionTypes } from "./types";

export const setCourse = (courseIndex) => {
  return {
    type: ActionTypes.SET_COURSE,
    payload: courseIndex,
  };
};
export const setGroup = (group) => {
  return {
    type: ActionTypes.SET_GROUP,
    payload: group,
  };
};
