import { createModal } from "./createModal";

export function renderModalControl() {
  const table = document.querySelector("table") as HTMLTableElement;

  table?.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).matches(".normal")) {
      const monthFormatted = (
        Number((event.target as HTMLElement).getAttribute("data-month")) + 1
      )
        .toString()
        .padStart(2, "0");

      const dataStr: string = `${(event.target as HTMLElement).getAttribute(
        "data-year",
      )}-${monthFormatted}-${(event.target as HTMLElement)
        .getAttribute("data-date")
        ?.padStart(2, "0")}T12:00`;
      createModal(table, dataStr);
    }
  });
}
