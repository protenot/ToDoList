import { State } from "./TypesRedux";
import { Months } from "../calendar/createCalendar";

export const initialState: State = {
  tasks: [],
  user:"",
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  months: Months,
};
