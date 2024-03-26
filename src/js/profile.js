const outputName = document.querySelector("#profile__name");
const outputSurname = document.querySelector("#profile__surname");
const outputEmail = document.querySelector("#profile__email");
const exitButton = document.querySelector("#profile__exit");
const deleteButton = document.querySelector("#profile__delete");
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

if(deleteButton!=null){
    deleteButton.addEventListener("click", ()=>{
        for(let key in localStorage){
            let object = JSON.parse(localStorage.getItem(key));
            if (!localStorage.hasOwnProperty(key)) {
                continue; 
            }
            if(object.email == userEmail){
                localStorage.removeItem(key);
                document.cookie = "id_user=;expires=-1;"
                window.location.href = "/index.html"
            }
        }
    })
}