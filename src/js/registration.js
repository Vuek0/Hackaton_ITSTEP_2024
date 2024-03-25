const form = document.querySelector(".registration__form");
const email = document.querySelector("#emailInput");
const name = document.querySelector("#nameInput");
const surname = document.querySelector("#surnameInput");
const pass = document.querySelector("#passInput");
const confirmPass = document.querySelector("#confirmPass");
const button = document.querySelector("#submit");
let data = {};
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(!(email.value).includes("@")){
        openModal();
        output.textContent = "в email необходим символ '@'";
        return;
    }

    if(!(email.value.split("@")[1].includes('.'))){
        openModal();
        output.textContent = "Введен некорректный email!"
        return;
    }

    if(name.value.length < 2){
        openModal();
        output.textContent = "Имя не может содержать только один символ";
        return;
    }

    if (pass.value.length < 6) {
        openModal();
        output.textContent = 'Пароль должен содержать не менее 6 символов.';
        return;
    }
    if (pass.value !== confirmPass.value) {
        openModal();
        output.textContent = 'Пароли не совпадают.';
        return;
    }
    data = {
        name : name.value,
        surname : surname.value,
        email : email.value,
        password : pass.value
    }
    alert("Вы успешно зарегестрированы, свои данные можете просмотреть в консоли.")
    console.log(data)
})