import md5 from 'md5';
const encryptButton = document.querySelector("#encrypt__button");
const encryptInput = document.querySelector("#encrypt__input");
const radios = document.querySelectorAll(".encrypt__radio");
const output = document.querySelector(".modal__output")
if(encryptButton!=null){
    encryptButton.addEventListener("click", (e)=>{
        e.preventDefault();
        console.log("some");
        radios.forEach(elem => {
            if(elem.checked){
                switch (elem.id) {
                    case "md5":
                        output.value = md5(encryptInput.value);
                        openModal();
                        break;
                    case "crc32":
                        
                        break;
                    case "sha1":
                        
                        break;
                    case "sha256":
                        
                        break;
                    case "sha512":
                        
                        break;
                    default:
                        break;
                }
            }
        })
    })
}