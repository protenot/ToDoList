export async function formatTodayDateToString(inputDate: HTMLInputElement) {
 // let formattedDate: string ;

  // Получаем текущую дату и время
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Плюс 1, так как месяцы начинаются с 0
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  // Формируем строку даты и времени в нужном формате (год-месяц-деньTчасы:минуты)
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  // Устанавливаем текущую дату и время в input
  inputDate.value = formattedDate;
}
