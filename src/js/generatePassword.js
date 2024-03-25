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

// code

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
            alert("Должен быть отмечен хотя бы один пункт.");
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
