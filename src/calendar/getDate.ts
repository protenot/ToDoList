import { Months } from "./createCalendar";
export async function getDate(inputDate: HTMLInputElement) {
  //const el = document.getElementById("your-element-id");

  // Создаем input для даты
  //const inputDate = document.createElement("input");
  //  inputDate.classList.add("input-date");
  //inputDate.type = "datetime-local";
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

    // Добавляем input на страницу
    // el.appendChild(inputDate);

    console.log("Сегодня " + inputDate.value);
  } else {
    let dateForModal: string;
    const marked = document.querySelectorAll(".normal");
    console.log("marked  " + marked);
    marked.forEach((date: HTMLElement) => {
      date.addEventListener("click", () => {
        dateForModal = date.textContent.padStart(2, "0");
        console.log("dateForModal " + dateForModal);
      });
    });
    const day = dateForModal;
    console.log(day);

    const forModal = document.querySelector("thead").textContent.split(" ");
    console.log(forModal);
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
}
