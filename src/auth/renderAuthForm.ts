export function renderAuthForm() {
  return `

    
        
    
    <form class ="form" id = "auth-form">
        <span class="close-button">×</span>
        <h1>SIGN IN</h1>
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
        Login
        </button>
    <form/>


`;
}
