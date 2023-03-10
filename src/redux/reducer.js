import { ActionTypes } from "./types";

const initialState = {
  course: null,
  group: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_COURSE:
      return {
        ...state,
        course: action.payload,
      };
    case ActionTypes.SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    default:
      return state;
  }
};
