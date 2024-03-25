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
                            // let hash1 = CRC32.str(str);
                            // output.textContent = hash1;
                            // navigator.clipboard.writeText(hash);
                            openModal();
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

