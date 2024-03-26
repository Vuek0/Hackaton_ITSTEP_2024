let openOrNot = 0
const burger = document.getElementById('burgerButton')
const header = document.getElementById('header')
burger.addEventListener('click', ()=>{
    if(openOrNot == 0){
        header.classList.add('open')
        burger.classList.add('active')
        openOrNot++
    }else{
        burger.classList.remove('active')
        header.classList.remove('open')
        openOrNot--
    }
})
const encryptButton = document.querySelector("#encrypt__button");
const encryptInput = document.querySelector("#encrypt__input");
const radios = document.querySelectorAll(".encrypt__radio");
const output = document.querySelector(".modal__output")
const modal__subtitle = document.querySelector(".modal__subtitle")
function createHash(method, str){
    let hash = method(str);
    output.textContent = hash;
    console.log(hash)
    navigator.clipboard.writeText(hash);
    openModal();
}
    if(encryptButton!=null){
        encryptButton.addEventListener("click", (e)=>{
            e.preventDefault();
            let str = encryptInput.value;
            if(str!==""){
                modal__subtitle.textContent = "Хэш уже в вашем буфере обмена!";
                radios.forEach(elem => {
                    if(elem.checked){
                        switch (elem.id) {
                            case "md5":
                                createHash(md5, str);
                                break;
                            case "crc32":
                                // Оно не работает :D 
                                break;
                            case "sha1":
                                createHash(sha1, str);
                                break;
                            case "sha256":
                                createHash(sha256, str);
                                break;
                            case "sha512":
                                createHash(sha512, str)
                                break;
                            default:
                                break;
                        }
                    }
                })
            }else{
                output.textContent = "Должен быть введен текст для шифрования";
                openModal();
            }
            
        })
    }


// variables

const input = document.querySelector("#passwordInput");
const generateButton = document.querySelector("#generatePassword");
const copyButton = document.querySelector("#copyPassword");
const range = document.querySelector("#passwordRange");
const highRegisterCheck = document.querySelector("#highRegisterCheck");
const lowRegisterCheck = document.querySelector("#lowRegisterCheck");
const digitsCheck = document.querySelector("#digitsCheck");
const symbolsCheck = document.querySelector("#symbolsCheck");
const passwordLength = document.querySelector("#showLength");
const symbols = "@#$%&*([]";
const digits = "123456789";
const highRegister = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowRegister = "abcdefghijklmnopqrstuvwxyz";
const modal = document.querySelector('.modal');
const modalClose = document.querySelector(".modal__close");

// code

function openModal(){
    modal.classList.add("open");
    modalClose.addEventListener("click", function closeModal(){
        modal.classList.remove("open");
        modalClose.removeEventListener("click", closeModal);
    })
}

if(passwordLength!=null){
    passwordLength.textContent = range.value
}
if(range!=null){
    range.addEventListener("input", ()=>{
        passwordLength.textContent = range.value;
    })
}
if(copyButton!=null){
    copyButton.addEventListener("click", (e)=>{e.preventDefault();});
}
if(generateButton!=null){
    generateButton.addEventListener("click", function generate(e){
        e.preventDefault();
        let result = "";
        let finalSet = "";
        if(!highRegisterCheck.checked && 
            !lowRegisterCheck.checked && 
            !digitsCheck.checked && 
            !symbolsCheck.checked){
            openModal();
        }
        else{
            if(highRegisterCheck.checked){
                finalSet+=highRegister;
            }
            if(lowRegisterCheck.checked){
                finalSet+=lowRegister;
            }
            if(digitsCheck.checked){
                finalSet+=digits;
            }
            if(symbolsCheck.checked){
                finalSet+=symbols;
            }
            console.log(Math.random());
            for(let i = 0; i<range.value ;i++){
                result+=finalSet[Math.floor(Math.random()*finalSet.length)];
            }
            input.value = result;
            copyButton.addEventListener("click", (e)=>{
                e.preventDefault();
                navigator.clipboard.writeText(result);
            })
        }
    })
}

const form1 = document.querySelector(".login__form");
if(form1!=null){
    form1.addEventListener("submit", (e)=>{
      
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
    
        let newPass = md5(pass.value);
        for(let key in localStorage){
            let object = JSON.parse(localStorage.getItem(key));
            if (!localStorage.hasOwnProperty(key)) {
                continue; 
            }
            if(object.email === email.value && object.password === newPass){
                let date = new Date(Date.now() + 86400e3);
                date = date.toUTCString()
                document.cookie = `id_user=${object.identificator}; expires=${date}`;
                window.location.href = "/index.html";
            }
        }
        if(!getCookie("id_user")){
            openModal();
            output.textContent = 'Такого аккаунта не найдено';
            email.textContent = "";
            pass.textContent = "";
            confirmPass.textContent = "";
        }
        
    })
}


const outputName = document.querySelector("#profile__name");
const outputSurname = document.querySelector("#profile__surname");
const outputEmail = document.querySelector("#profile__email");
const exitButton = document.querySelector("#profile__exit");
let userName;
let userSurname;
let userEmail;
if(outputName!=null && outputSurname!=null && outputEmail!=null){
    for(let key in localStorage){
        let object = JSON.parse(localStorage.getItem(key));
        if (!localStorage.hasOwnProperty(key)) {
            continue; 
        }
        if(object.identificator == getCookie("id_user")){
            userName = object.name;
            userSurname = object.surname;
            userEmail = object.email
            exitButton.addEventListener("click", ()=>{
                document.cookie = "id_user=;expires=-1"
                window.location.href = "/index.html"
            })
        }
    }
    outputName.textContent = `Имя: ${userName}`;
    outputSurname.textContent = `Фамилия: ${userSurname}`;
    outputEmail.textContent = `Email: ${userEmail}`;
    
}

if(userName == undefined && userSurname == undefined && userEmail == undefined){
    if(window.location.href.includes("/profile.html")){
        window.location.href = "/index.html"
    }
}
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
