import { store } from "../redux/store";

export function controlEnvironment(
  newCalendar: { nextMonth: () => void; previousMonth: () => void } | undefined,
) {
  let monthForStore: number = store.getState().month;
  const btnNext: string = "#btnNext";
  const btnPrev: string = "#btnPrev";
  const buttonNext = document.querySelector(btnNext);

  buttonNext?.addEventListener("click", () => {
    // const newCalendar = new Calendar('divCal')
    monthForStore = monthForStore + 1;
    if (monthForStore > 11) {
      monthForStore = 0;
    }
    store.dispatch({
      type: "CHANGE_MONTH",
      payload: { month: monthForStore },
    });

    newCalendar?.nextMonth();
    console.log("Месяц из стора след" + store.getState().month);
  });

  const buttonPrevious = document.querySelector(btnPrev);
  buttonPrevious?.addEventListener("click", () => {
    monthForStore = monthForStore - 1;
    if (monthForStore < 0) {
      monthForStore = 11;
    }
    store.dispatch({
      type: "CHANGE_MONTH",
      payload: { month: monthForStore },
    });
    newCalendar?.previousMonth();
    console.log("Месяц из стора предыд" + store.getState().month);
  });
}
