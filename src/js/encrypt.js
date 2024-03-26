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

