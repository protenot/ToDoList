import { initialState } from "./state";
import { State, Reducer, Action } from "./TypesRedux";

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CHANGE_MONTH":
      return { ...state, ...action.payload };

    case "CHANGE_YEAR":
      return { ...state, ...action.payload };

    case "LOAD_TASKS":
      return { ...state, ...action.payload };

    case "CHANGE_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
