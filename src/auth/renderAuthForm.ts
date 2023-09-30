export function renderAuthForm (){
return `
<form class ="form" id = "auth-form">
<h1>Authorization</h1>
    <div class="div-form">
        <input type = "email" id = "email">
        <label for="email"> Email</label>
    </div>

    <div class="div-form">
        <input type = "password" id = "password">
        <label for="password"> Password </label>
    </div>
    <button
    type = "submit"
    class = "auth-button">
    Press to enter
    </button>
<form/>

`

}