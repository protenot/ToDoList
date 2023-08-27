import { Calendar } from "../calendar/createCalendar";

export const render = async () => {
  const route = window.location.pathname;
  if (route.match("/ToDoList/calendar")) {
    await new Calendar("divCal");
  }
  document.getElementById("root").innerHTML = `<h2>"${route} page"</h2>`;
  console.log("1" + route);
};

// 1. Handle initial page load

window.addEventListener("load", () => {
  render(); // 👈
  console.log("2");
});

// 2. Handle history navigations. alternative "window.onpopstate"
window.addEventListener("popstate", (event) => {
  render();
  console.log("35");
});

// 3. Catch <a> tag clicks + trigger change handler
document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url =
    event.target && (event.target as HTMLElement).getAttribute("href");
  history.pushState({ foo: "bar", url }, document.title, url);
  console.log(history.state);
  // history.replaceState({ foo: "bar" }, url, url);
  render(); // 👈
  console.log("3");
});
