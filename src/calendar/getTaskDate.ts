import { Months } from "./createCalendar";
export async function getTaskDate(inputDate: HTMLInputElement) {
 
  let formattedDate: string;
  if (location.pathname === "/ToDoList/list") {
    // Получаем текущую дату и время
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Плюс 1, так как месяцы начинаются с 0
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // Формируем строку даты и времени в нужном формате (год-месяц-деньTчасы:минуты)
    formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    // Устанавливаем текущую дату и время в input
    inputDate.value = formattedDate;


    console.log("Сегодня " + inputDate.value);
  } else {
    let dateForModal: string;
    const anyDay = document.querySelectorAll(".normal");
    console.log("marked  " + anyDay);
    anyDay.forEach((date: Element, key: number, parent: NodeListOf<Element>) => {
      date.addEventListener("click", async () => {
        if (date.textContent)
        dateForModal = date.textContent.padStart(2, "0");
      console.log(key)
        console.log("dateForModal " + dateForModal);
      });
    });
     const day = dateForModal;
    console.log(day);
    const tHead = document.querySelector("thead")
    if (tHead){
    const forModal = tHead.textContent?.split(" ") as string[];
    console.log("Collection"+forModal);
    const yearForModal = forModal[1];
    console.log("yearForModal " + yearForModal);
    const monthForModalLit = forModal[0];
    console.log("monthForModal " + monthForModalLit);
    const monthForModal = (
      Months.findIndex((item) => item == monthForModalLit) + 1
    )
      .toString()
      .padStart(2, "0");
    console.log(monthForModal);
    if (day) {
      formattedDate = `${yearForModal}-${monthForModal}-${day}T12:00`;
    } else {
      formattedDate = `${yearForModal}-${monthForModal}-01T12:00`;
    }
    inputDate.value = formattedDate;
  }
}}
