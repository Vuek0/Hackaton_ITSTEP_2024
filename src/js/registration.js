const form = document.querySelector(".registration__form");
const email = document.querySelector("#emailInput");
const name = document.querySelector("#nameInput");
const surname = document.querySelector("#surnameInput");
const pass = document.querySelector("#passInput");
const confirmPass = document.querySelector("#confirmPass");
const button = document.querySelector("#submit");
const regLink = document.querySelector("#registration__link");
const loginLinkLi = document.querySelector("#login__link__li");
const loginLink = document.querySelector("#login__link");

let data = {};
function getCookie(name) {
    let cookie = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }
if(localStorage.getItem("quantityOfUsers") == null){
    localStorage.setItem("quantityOfUsers", 0);
    document.cookie = "id_user=;expires=-1;"
}

function isEmailAlreadyDeclared(mail){
    for(let key in localStorage){
        let object = JSON.parse(localStorage.getItem(key));
        if (!localStorage.hasOwnProperty(key)) {
            continue; 
        }
        if(object.email === mail){
            return true;
        }
    }
}

if(getCookie("id_user")){
    regLink.style.display = "none";
    for(let key in localStorage){
        let object = JSON.parse(localStorage.getItem(key));
        if (!localStorage.hasOwnProperty(key)) {
            continue; 
        }
        if(object.identificator == getCookie("id_user")){
            loginLink.innerHTML = object.name;
            loginLink.setAttribute("href", "/profile.html");
        }
    }
    if(window.location.href.includes("/registration.html")){
        window.location.href = "/index.html";
    }
    if(window.location.href.includes("/login.html")){
        window.location.href = "/index.html";
    }
}
if(form!=null){
    
    let quantity = Number(localStorage.getItem("quantityOfUsers"));
    
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
        if(quantity > 0){
            if(isEmailAlreadyDeclared(email.value)){
                openModal();
                output.textContent = "Этот имейл уже зарегестрирован!";
                return;
            }
            
        }
        
        quantity++;
        localStorage.setItem("quantityOfUsers", quantity);

        let identificator = md5(localStorage.getItem("quantityOfUsers"));
        data = {
            name : name.value,
            surname : surname.value,
            email : email.value,
            password : md5(pass.value),
            identificator : identificator
        }

        localStorage.setItem(`user${quantity}`, JSON.stringify(data));
        let date = new Date(Date.now() + 86400e3);
        date = date.toUTCString();
        document.cookie = `id_user=${identificator}; expires=${date}`;
        window.location.href = '/index.html'
    })
}
