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
const modalCopyButton = document.querySelector("modal__copy")
function createHash(method, str){
    let hash = method(str);
    output.textContent = hash;
    navigator.clipboard.writeText(hash);
    openModal();
}
    if(encryptButton!=null){
        encryptButton.addEventListener("click", (e)=>{
            e.preventDefault();
            let str = encryptInput.value;
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