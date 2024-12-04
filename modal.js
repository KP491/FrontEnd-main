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
  formAddPicture.addEventListener('click', () => {

    const pictureFile = picture.files[0]
    const pictureTitle = picture_title.value;
    const pictureCategory = picture_category.value;

    const formData  = new FormData();

    formData.append('image', pictureFile);
    formData.append('title', pictureTitle);
    formData.append('category', parseInt(pictureCategory,10));
    
    


    alert(picture_category.value)
    
  })

