export function getDate(inputDate:HTMLInputElement){
    //const el = document.getElementById("your-element-id");

    // Создаем input для даты
    //const inputDate = document.createElement("input");
  //  inputDate.classList.add("input-date");
    //inputDate.type = "datetime-local";
    if (location.pathname==="/ToDoList/list"){

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
    
    // Добавляем input на страницу
   // el.appendChild(inputDate);
    
    console.log("Сегодня " + inputDate.value);

}else{

    
}

}