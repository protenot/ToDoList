export function renderModalAfterAuth(content: any) {
  if (typeof content === "string") {
    alert(`Ошибка ${content}`);
  } else {
    //document.querySelector('.auth-icon').textContent=email
  }
  console.log("Content" + content);
}
