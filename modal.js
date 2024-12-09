const CloseBtn1 = document.getElementById("CloseBtn1")
const modalContainer = document.getElementById("modalContainer")

const addPhotoBtn = document.getElementById("addPhotoBtn");

const modalGallery = document.getElementById("modalGallery");
const modalForm = document.getElementById("modalForm");

const BackBtn = document.getElementById("BackBtn");

const category_option = document.getElementById("category_option");

const formAddPicture = document.querySelector('#valid_button')
const picture = document.querySelector('#picture')
const picture_title = document.querySelector('#picture_title')

BtnModifier.addEventListener('click', () => {

    modalContainer.style.display="flex"
    
})

CloseBtn1.addEventListener('click', () => {

    modalContainer.style.display="none"
    
})

const displayModalGallery = () => {

    const galleryModal = document.querySelector('#galleryModal');

    galleryModal.innerHTML="";

    works.forEach(work => {       

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = work.imageUrl;

        const i = document.createElement('i');
        i.classList.add('fa');
        i.classList.add('fa-trash');

        i.addEventListener('click', () => {
            if (confirm("Etes vous sûr de vouloir supprimer cette Photo!") == true) {
                deleteWork(work.id)
              }
            
        })

       
        card.appendChild(img);
        card.appendChild(i); 
        
        galleryModal.appendChild(card)
    
});
}

  const deleteWork = async (id) => {
    const res = await fetch(`http://localhost:5678/api/works/${id}`, { //chemin suppression des photos
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('token'),
      },
    });
    
   if (res.status === 204){
    getWorks();
   }
    
  }


  addPhotoBtn.addEventListener('click', () => {

    modalGallery.style.display="none";
    modalForm.style.display="flex";

  })

  BackBtn.addEventListener('click', () => {

    modalGallery.style.display="flex";
    modalForm.style.display="none";

  })


  const addCategoryOptions = () => {

    const option1 = document.createElement('option');

    option1.innerText = "choisir une Categori";
    option1.setAttribute('value', 0);

    

    category_option.appendChild(option1)

    categories.forEach(cat => {
      const option = document.createElement('option');

        option.innerText = cat.name;
        option.setAttribute('value', cat.id);
      
        category_option.appendChild(option);
  })

  }

  // Ajout d'une Photo
  formAddPicture.addEventListener('click', async () => {

    const pictureFile = picture.files[0]
    const pictureTitle = picture_title.value;
    const pictureCategory = picture_category.value;

    const formData  = new FormData();

    formData.append('image', pictureFile);
    formData.append('title', pictureTitle);
    formData.append('category', parseInt(pictureCategory,10));
    
    // alert(picture_category.value)

    const res = await fetch(`http://localhost:5678/api/works`, { //chemin suppression des photos
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('token'),
      },
      body: formData
    });
    
   if (res.status === 201){
    getWorks();
   }

    //    if (response.ok) {
    //     const result = await response.json();
    //     console.log("Image uploadée avec succès :", result);
    //     alert("L'image a été envoyée avec succès !");
    // } else {
    //     console.error("Erreur lors de l'envoi :", response.statusText);
    //     alert("Une erreur est survenue lors de l'envoi de l'image.");
    // }
    // } catch (error) {
    // console.error("Erreur réseau :", error);
    // alert("Une erreur réseau s'est produite.");
    // }
    // });
    
  })

  const verifDataForm = () => {

    const pictureFile = picture.files[0]
    const pictureTitle = picture_title.value;
    const pictureCategory = picture_category.value;

    if(pictureTitle && pictureCategory != '0' && pictureFile)
    {
        formAddPicture.disabled = false;
        console.log('btn active')
    }
    else
    {
        formAddPicture.disabled = true;
        console.log('btn desactive')
    }


  }

  picture.addEventListener('change', verifDataForm);
  picture_title.addEventListener('keyup', verifDataForm);
  picture_category.addEventListener('change', verifDataForm);

  verifDataForm ();

  document.addEventListener("DOMContentLoaded", () => {
    const pictureInput = document.getElementById("picture"); // Champ input pour le fichier
    const newPicture = document.querySelector(".new_picture"); // Élément img pour prévisualisation
    const imgContainer = document.querySelector(".img_container"); // Conteneur de l'input

    // Écouter le changement sur le champ input
    pictureInput.addEventListener("change", (event) => {
        const file = event.target.files[0]; // Récupération du premier fichier sélectionné

        if (file) {
            // Vérifier le type de fichier
            if (!file.type.startsWith("image/")) {
                alert("Veuillez sélectionner un fichier image (jpg, png).");
                return;
            }

            // Vérifier la taille du fichier (4 Mo max)
            const maxSize = 4 * 1024 * 1024; // 4 Mo en octets
            if (file.size > maxSize) {
                alert("La taille de l'image ne doit pas dépasser 4 Mo.");
                return;
            }

            // Lire le fichier et afficher la prévisualisation
            const reader = new FileReader();
            reader.onload = (e) => {
                newPicture.src = e.target.result; // Assigner la source de l'image
                newPicture.classList.remove("hidden"); // Rendre l'image visible
                imgContainer.style.display = "none"; // Masquer l'interface de chargement
            };
            reader.readAsDataURL(file); // Lire le fichier en tant qu'URL de données
        } else {
            // Si aucun fichier n'est sélectionné, restaurer l'état initial
            newPicture.src = "";
            newPicture.classList.add("hidden");
            imgContainer.style.display = "flex"; // Restaurer l'interface de chargement
        }
    });
});