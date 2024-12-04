const FormLogin = document.getElementById("FormLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");

FormLogin.addEventListener('submit', (event) => {

        event.preventDefault(); // désactive le comportement poar defaut submit

        const data = {
            "email": email.value,
            "password": password.value
          }


          fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((response) => {
            // console.log(response)
            sessionStorage.setItem("token", response.token);
            window.location.replace("/");

          }) 
})
