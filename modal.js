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

    option1.innerText = "choisir une Catégorie";
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

  const displayPreviewPicture = () => {

    const img_preview = document.querySelector('.img_preview');
    const img_container = document.querySelector('.img_container');
    const new_picture = document.querySelector('.new_picture');

    const pictureFile = picture.files[0];   

    if(pictureFile)
    {
      new_picture.src = URL.createObjectURL(pictureFile);
      img_preview.classList.remove('hidden');
      img_container.classList.add('hidden');
    
    }
    else{

      img_preview.classList.add('hidden');
      img_container.classList.remove('hidden');
      
    }
  }

  const verifDataForm = () => {

    const pictureFile = picture.files[0]
    const pictureTitle = picture_title.value;
    const pictureCategory = picture_category.value;

    if(pictureTitle && pictureCategory != '0' && pictureFile)
    {
        formAddPicture.disabled = false;
        formAddPicture.classList.add('btnFiltreActive');
        formAddPicture.classList.remove('disabled');
        console.log('btn active')
    }
    else
    {
        formAddPicture.disabled = true;
        formAddPicture.classList.add('disabled');
        formAddPicture.classList.remove('btnFiltreActive');
        console.log('btn desactive')
    }


  }

  picture.addEventListener('change', () => {
    
    displayPreviewPicture();
    verifDataForm();

  });
  picture_title.addEventListener('keyup', verifDataForm);
  picture_category.addEventListener('change', verifDataForm);

  verifDataForm ();

  