import { updateMonthUrl } from "../router/renderRouter";

export function controlEnvironment(
  newCalendar: { nextMonth: () => void; previousMonth: () => void } | undefined,
) {
  const btnNext: string = "#btnNext";
  const btnPrev: string = "#btnPrev";
  const buttonNext = document.querySelector(btnNext);

  buttonNext?.addEventListener("click", () => {
    const monthAndYear = newCalendar?.nextMonth() as unknown as string;
    updateMonthUrl(monthAndYear);
  });

  const buttonPrevious = document.querySelector(btnPrev);
  buttonPrevious?.addEventListener("click", () => {
    const monthAndYear = newCalendar?.previousMonth() as unknown as string;

    updateMonthUrl(monthAndYear);
  });
}
