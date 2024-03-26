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

