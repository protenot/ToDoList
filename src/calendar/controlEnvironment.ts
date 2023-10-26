import { store } from "../redux/store";
import { updateMonthUrl } from "../router/renderRouter";

export function controlEnvironment(
  newCalendar: { nextMonth: () => void; previousMonth: () => void } | undefined,
) {
  const btnNext: string = "#btnNext";
  const btnPrev: string = "#btnPrev";
  const buttonNext = document.querySelector(btnNext);

  buttonNext?.addEventListener("click", () => {
    // const newCalendar = new Calendar('divCal')

    /*  monthForStore = monthForStore + 1;
    if (monthForStore > 11) {
      monthForStore = 0;
    }
    store.dispatch({
      type: "CHANGE_MONTH",
      payload: { month: monthForStore },
    }); */

    const monthAndYear = newCalendar?.nextMonth() as unknown as string;

    console.log("Месяц из стора след" + monthAndYear);

    updateMonthUrl(monthAndYear);
  });

  const buttonPrevious = document.querySelector(btnPrev);
  buttonPrevious?.addEventListener("click", () => {
    const monthAndYear = newCalendar?.previousMonth() as unknown as string;

    console.log("Месяц из стора пред" + monthAndYear);

    updateMonthUrl(monthAndYear);
  });
}
