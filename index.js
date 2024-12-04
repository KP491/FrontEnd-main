let works = [];
let categories = [];


const FiltresBtns = document.querySelector('#FiltresBtns');
const BtnModifier = document.querySelector('#BtnModifier');
const BtnLogin = document.querySelector('#BtnLogin');

const isLogin = () => {

    return sessionStorage.getItem("token") ? true : false
} 

if(isLogin()) {    
    // si on est connecté
    FiltresBtns.style.display = "none"
    BtnModifier.style.display = "inline" 
    BtnLogin.innerHTML="Logout"
}


BtnLogin.addEventListener('click', () => {

    if(isLogin()) {    
        sessionStorage.clear();
        BtnLogin.innerHTML="Login";
        FiltresBtns.style.display = "block"
        BtnModifier.style.display = "none" 

    }
    else
    {
        window.location.replace("/login.html");
    }
    

})


const getWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works'); 
    works = await response.json();

     console.log(works)
    displayWorks(0);
    displayModalGallery();

}

getWorks()

const displayWorks = (id) => {

    const worksContainer = document.querySelector('.gallery');

    worksContainer.innerHTML="";

    works.forEach(work => {
        if(work.categoryId == id || id == 0){

            const workElement = document.createElement('figure');

            workElement.classList.add('work-item');
            workElement.innerHTML = `        
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            `;
            worksContainer.appendChild(workElement);
        }
    
});
}

// recupertaion des categiries et affichage dynamiques des boutons

const getCategory = async () => {
    const response = await fetch('http://localhost:5678/api/categories'); 
    categories = await response.json();

     console.log(categories)
     displayFiltres();
     addCategoryOptions();

}

getCategory();

const displayFiltres = () => {

    const btnTous = document.createElement('button');

    btnTous.innerText = "Tous";
    btnTous.classList.add("btnFiltre");
    btnTous.classList.add("btnFiltreActive");

    btnTous.addEventListener('click', () => {
        displayWorks(0);
        document.querySelector(".btnFiltreActive").classList.remove("btnFiltreActive");
        btnTous.classList.add("btnFiltreActive");

    })    

    FiltresBtns.appendChild(btnTous)

    categories.forEach(cat => {
    const btnFiltre = document.createElement('button');

    btnFiltre.innerText = cat.name;
    btnFiltre.classList.add("btnFiltre");

    btnFiltre.addEventListener('click', () => {
        displayWorks(cat.id);
        document.querySelector(".btnFiltreActive").classList.remove("btnFiltreActive");
        btnFiltre.classList.add("btnFiltreActive");

    })

    FiltresBtns.appendChild(btnFiltre);
        
});
}







