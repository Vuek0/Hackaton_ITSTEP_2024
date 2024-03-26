const outputName = document.querySelector("#profile__name");
const outputSurname = document.querySelector("#profile__surname");
const outputEmail = document.querySelector("#profile__email");
const exitButton = document.querySelector("#profile__exit");
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