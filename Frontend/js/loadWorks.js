// Selectionner l'élément ou sera la gallerie
let gallery = document.getElementById("gallery-container");

// On va creer du html pour preparer l'arriver des images dans la gallerie
async function writeGallery(works) {
  return (
    '<div class="gallery">' +
    works
      .map(
        (works) => `
  <figure>
    <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}" />
    <figcaption>${works.title}</figcaption>
    </figure>`
      )
      .join("") +
    "</div>"
  );
}

// On va obtenir tous les travaux grace a l'API
async function getWorks(location) {
  //Il s'agit l de la variable initiale
  let allWorks;
  try {
    // On appelle l'API pour recuperer les travaux
    const res = await fetch("http://localhost:5678/api/works");
    // on attends la reponse en json car c'est comme qu'est lu les resultats
    allWorks = await res.json();
    // Ecris tout ce qui concerne les travaux avec leurs fonction respectives
    const returnWorks = await writeGallery(allWorks);
    // On envoie tous le contenu sur le html pour que tout soit visible (On va aussi effacé tous ce qu'il y a au dessus)
    location.innerHTML = returnWorks;
  } catch (err) {
    console.log(err);
  }
}

getWorks(gallery);

// ----------------------------------------------------------------------------------------- //
//  -------------------------------Creation des boutons------------------------------------- //
// ----------------------------------------------------------------------------------------- //


// selectionner l'ID ou on va mettre les boutons de filtrages
let filterDiv = document.getElementById("tri");

// Fonction pour avoir les catégories qui viennent de l'API
async function getCategories(location) {
  // variable initiale
  let allCategories;

  try {
    // Obtenir toutes les catégories
    const res = await fetch("http://localhost:5678/api/categories");
    allCategories = await res.json();
    // Utiliser les catégories pour creer des boutons et les mettre dans le html
    const returnCategories = (allCategories) => {
      return allCategories
        .map(
          (allCategories) => `
            <button class="sorting-btn btn btn-typo" type="button" id="sorting-btn-${allCategories.id}">${allCategories.name}</button>`
        )
        .join("");
    };
    // Envoyer tous le contenus ecrit sur le html
    location.innerHTML += returnCategories(allCategories);

    
    //
    // ----------------------------------------------------------------------------------------- //
    // Ajouter un eventlistener a chaque bouton de filtrage et mettre le boutons "tous"
    // ----------------------------------------------------------------------------------------- //
    //


    // selectionné l'élément ou se trouve les boutons creer
    let filterBtns = document.getElementsByClassName("sorting-btn");

    //Mettre un eventlistener pour chaque catégories et afficher les eléments qui y correspond
    for (let i = 0; i < filterBtns.length; i++) {
      // Obtenir la catégorie de l'ID depuis le nom de celui-ci
      let btnCategoryId = filterBtns[i].id.charAt(filterBtns[i].id.length - 1);
      //Pour toutes les catégories
      filterBtns.item(btnCategoryId - 1).addEventListener("click", function () {
        //creer un eventlistener pour chaque boutons
        filterWorks(btnCategoryId);

        //Appel de la fonction pour filtrer et afficher ce qu'il faut par catégorie
      });
    }

    // Creer un eventlistener sur les boutons existants
    // selectionner le bouton depuis l'HTML
    let allBtn = document.getElementById("btn-all");

    // Autofocus sur tous les boutons
    allBtn.focus();
    allBtn.style.outline = "none";

    //evenlistener pour tous les boutons plus chargement des travaux
    allBtn.addEventListener("click", function () {
      // Appel de la focntion qui obtient et met en place kes travaux dans la gallerie
      getWorks(gallery);
    });
  } catch (err) {
    console.log(err);
  }
}

getCategories(filterDiv);


//
// ----------------------------------------------------------------------------------------- //
//  Filtres dans la gallerie
// ----------------------------------------------------------------------------------------- //
//


// Filtrer les travaux par catégories
async function filterWorks(id) {
  //variable initiale
  let allWorks;
  try {
    // Obtenir tous les travaux grace a l'API
    const res = await fetch("http://localhost:5678/api/works");

    allWorks = await res.json();
    // Filtrer tous les travaux
    let filteredWorks = allWorks.filter(
      // filter tous les travaux en fonction de categoriyID
      (allWorks) => allWorks.categoryId == id
    );
    // Ecris tout ce qui concerne les travaux avec leurs fonction respectives
    const returnFilteredWorks = await writeGallery(filteredWorks);
    // envoyer le contenu ecrit dans le HTML
    gallery.innerHTML = returnFilteredWorks;
  } catch (err) {
    console.log(err);
  }
}


// ----------------------------------------------------------------------------------------- //
// -------------------------------Ouvrir la premiere modale -------------------------------- //
// ----------------------------------------------------------------------------------------- //


//
// ----------------------------------------------------------------------------------------- //
// Ouvrir la premiere modale et la remplir
// ----------------------------------------------------------------------------------------- //
//

// Selectionner la partie dans laquelle nous allons travailler
let editGallery = document.getElementById("gallery-edit");

async function getModal(location) {
  // Creer une gallerie dans la modale

  let allWorks;
  try {
    // Obtenir tous les travaux grace a l'API
    const res = await fetch("http://localhost:5678/api/works");
    allWorks = await res.json();
    // Ecris tout ce qui concerne les travaux et les mettre dans le html avec leurs fonction respectives
    const returnWorks = (allWorks) => {
      return (
        allWorks

          .map(
            (allWorks) => `
      
      <div class="modal-overlay-container">
      
      
      <div class="trash-can-icon" id="trash-can-icon-${allWorks.id}">
      
      <a class="delWork" data-id="${allWorks.id}" href="#">
      
      <i class="fa-regular fa-trash-can fa-sm"></i>
      
      </a>
      
      </div>
      
      
      <figure id="modal-fg-${allWorks.id}">
      
      <img id="modal-img-${allWorks.id}" crossorigin="anonymous" src="${allWorks.imageUrl}" alt="${allWorks.title}" />
      
      <figcaption>éditer</figcaption>
      
      </figure>
      
      
      <div class="size-icon" id="size-icon-${allWorks.id}">
      
      <i class="fa-solid fa-arrows-up-down-left-right"></i>
      
      </div>
      
      
      </div>`
          )

          .join("") + "</div>"
      );

    };

    // Envoyer tous le contenu ecrit dans le html
    location.innerHTML = returnWorks(allWorks);
    document.body.querySelectorAll(".delWork").forEach((element) => {
      console.log("element ==>", element);
      element.addEventListener("click", function (e) {
        console.log("e ==>", e);
        console.log("e.target.getA) ==>", element.getAttribute("data-id"));
        deleteWork(e, element.getAttribute("data-id"));
      });
    });
  } catch (err) {
    console.log(err);
  }
}

document
  .getElementById("open-first-modal")
  .addEventListener("click", function () {
    var modal = document.getElementById("modal-gallery");
    modal.style.display = "flex";

    getModal(editGallery);
  });

//
// ----------------------------------------------------------------------------------------- //
// Fermeture de la modale
// ----------------------------------------------------------------------------------------- //
//


var modal = document.getElementById("modal-gallery");
// Selectionner la span qui correspond a la fermeture de la modale
var span = document.getElementsByClassName("close")[0];
// lorsque l'utilisateur clique sur la span alors la modale se ferme
span.onclick = function () {
  modal.style.display = "none";
};


// ----------------------------------------------------------------------------------------- //
// ---------------------Supprimer un travail depuis la 1ere modale ------------------------- //
// ----------------------------------------------------------------------------------------- //

// Verification du token
function isConnected() {
  const userToken = localStorage.getItem("token");
  if (userToken) {
    return userToken;
  } else {
    console.log("Erreur, utilisateur non connecté");
    return false;
  }
}

//
// ----------------------------------------------------------------------------------------- //
// supprimer un travail
// ----------------------------------------------------------------------------------------- //
//


async function deleteWork(e, id) {
  console.log("Deleting");
  e.preventDefault();

  // verifier le token avec le fonction creer plus haut
  let token = isConnected();

  if (!token) {
    console.log("Utilisateur non connecté");
    return false;
  }

  try {
    //appel de l'API
    const res = await fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Mise en place de message d'erreur si erreur il y a
    if (res.status === 401) {
      window.alert("Erreur, manoeuvre non autorisée");
      // Si il n'y a pas d'erreur alors autoriser l'opération
    } else if (res.status === 500) {
      window.alert(
        "Une erreur est survenue, veuillez réessayer ultérieurement"
      );
    } else {
      console.log(res.status);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

// ----------------------------------------------------------------------------------------- //
// ----------------------------- Ouverture de la seconde modale ---------------------------- //
// ----------------------------------------------------------------------------------------- //

// Obtenir le html de l'imput des images
let input = document.querySelector("input");
// obtenir le html de l'output des images pour preparer la preview 
let output = document.querySelector("output");
// Creer un array vide pour contenir l'image
let imagesArray = [];

document
  .getElementById("open-second-modal")
  .addEventListener("click", function () {
    // Selectionner la modale dans le HTML et l'afficher grace un display
    let modalAddPicture = document.getElementById("modal-add-picture");
    modalAddPicture.style.display = "flex";

    // réisinialise le display
    invalidImageChanges();
    // Enlever les precedents input
    document.getElementById("title").value = "";
    document.getElementById("category").selectedIndex = 0;

    // Fermer la premiere modale
    document.getElementById("modal-gallery").style.display = "none";
  });

//
// ----------------------------------------------------------------------------------------- //
// Obtenir les catégories pour les mettre dans le déroulé
// ----------------------------------------------------------------------------------------- //
//

// Obtenir les categories qui viennent de l'API
async function getListCategories(location) {
  // Variable initiale
  let allCategories;

  try {
    // Obtenir toutes les catégories grace a l'API
    const res = await fetch("http://localhost:5678/api/categories");
    allCategories = await res.json();
    // Utiliser les catégories pour creer des boutons et les envoyer sur la page HTML

    const returnCategories = (allCategories) => {
      return allCategories
        .map(
          (allCategories) => `
            <option value="${allCategories.id}">${allCategories.name}</option>`
        )
        .join("");
    };
    // Envoyer le contenu ecrit sur la page HTML
    location.innerHTML += returnCategories(allCategories);
  } catch (err) {
    console.log(err);
  }
}

// Selectionner la partie du HTML qui correspond a la section des catégories
let selectOption = document.getElementById("category");

getListCategories(selectOption);


//
// ----------------------------------------------------------------------------------------- //
// Fermeture de la seconde modale
// ----------------------------------------------------------------------------------------- //
//


// Obtenir la div qui contient le display des images
let modalAddPicture = document.getElementById("modal-add-picture");
// Selectionner la span qui correspond a la fermeture de la modale
var span = document.getElementsByClassName("close")[1];
// lorsque l'utilisateur clique sur la span alors la modale se ferme
span.onclick = function () {
  modalAddPicture.style.display = "none";
};

// Quand l'utilisateur clique a l'extérieur de la modale, alors elle se ferme
window.onclick = function (event) {
  if (event.target == modal || event.target == modalAddPicture) {
    modalAddPicture.style.display = "none";
    modal.style.display = "none";
  }
};


//
// ----------------------------------------------------------------------------------------- //
// Fleche qui permet de revenir sur la premiere modale
// ----------------------------------------------------------------------------------------- //
//


// Selctionner la fleche dans le HTML
var returnArrow = document.getElementsByClassName("close-arrow")[0];
// Quand un utilisateur clique sur la fleche alors on revient sur la premiere modale
returnArrow.onclick = function () {
  modal.style.display = "flex";
  modalAddPicture.style.display = "none";
};

// ----------------------------------------------------------------------------------------- //
// -------------------------------- Ajouter une image -------------------------------------- //
// ----------------------------------------------------------------------------------------- //



// Preparation des display au cas ou il n'y a pas d'image ou que l'image est incorrect
async function invalidImageChanges() {
  // Obtenir la div ou se trouve la zone de l'image
  let photoDisplayArea = document.getElementById("img-display-area");
  // Obtenir la zone ou l'image est display
  let imagePreview = document.getElementById("image-preview");
  // Obtenir le bouton de validation
  let validateBtnSendPicture = document.getElementById("btn-valid-add-picture");

  // Clean le display et supprimer l'image précedente
  photoDisplayArea.style.display = "flex";
  imagePreview.style.display = "none";

  // mettre en place le bouton grisé et changer son apparence
  validateBtnSendPicture.disabled = true;
  // mise en place du bouton grisé
  validateBtnSendPicture.className = "btn-typo btn-disabled";

  // Obtenir le bouton qui permet d'ajouter une image
  let addPictureButton = document.getElementById("add-picture-button");
  // On modifie le texte, en fonction de la presence ou non d'une image, ici elle est pas présente
  addPictureButton.textContent = "+ Ajouter photo";
}

//
// ---------------------------------- ERROR MANAGEMENT ---------------------------------//
//

// reunir toutes les messages d'erreurs 
function errorManagement(file) {
  // supprime tous les messages précedents 
  let errMessage = document.getElementById("error-size-format");
  errMessage.innerHTML = "";

  // Verifier si la taille du fichier ne depasse pas 4 Mo
  if (file[0].size > 4000000) {
    invalidImageChanges();
    // Message d'erreur
    errMessage.innerHTML = "Fichier trop volumineux";
    return false;
  }

  // Fichier autorisés
  let validFileExtensions = ["jpg", "jpeg", "png"];

  // recupere l'extension upload
  let fileExtension = file[0].name.split(".")[1].toLowerCase();

  // Verifier si le fichier correponds au format demander
  if (validFileExtensions.includes(fileExtension) != true) {
    invalidImageChanges();
    errMessage.innerHTML = "Format non supporté";
    return false;
  }
}

//
// ------------------------------ eventlister pour les champs de l'image -------------------------------//
//

// Eventlistener sur l'input
input.addEventListener("change", function () {
  // Obtenir le bouton qui correspond a l'ajout d'une image qui se trouve dans le HTML
  let addPictureButton = document.getElementById("add-picture-button");
  // Ajout du texte
  addPictureButton.textContent = "+ Ajouter photo";

  // Obtenir la fichier mis par l'utilisateur
  const file = input.files;

  // Appel de la fonction pour la gestion des erreurs, Si les resultats sont incorrects, alors il y a une erreur dans la taille ou dans le format du fichier
  if (errorManagement(file) == false) {
    return false;
  }

  // Mettre le fichier dans le array
  imagesArray[0] = file[0];
  // Fonction pour ajouter un display a l'image
  displayPicture();

  // obtenir le bouton dans le HTML qui valide l'ajout
  let validateBtnSendPicture = document.getElementById("btn-valid-add-picture");
  // enlever l'option grisée
  validateBtnSendPicture.disabled = false;
  // Mise en place du bouton validé
  validateBtnSendPicture.className =
    "btn-typo btn-disabled btn-disabled-activated";
});

//
// ------------------------------------ Display de l'image -----------------------------------//
//

// Mettre un display sur l'image pour que l'utilisateur puisse la voir dans le preveiw
function displayPicture() {
  let images = "";
  // Pour chaque image il faut creer une div qui permet de la display

  imagesArray.forEach((image) => {
    images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
              </div>`;
  });
  // envoie du code html dans l'output et suppression du code précédent
  output.innerHTML = images;

  // Selectionner les éléments HTML qui contiennent le logo quand il n y a pas d'image
  let photoDisplayArea = document.getElementById("img-display-area");
  // Obtenir l'élément html qui correspond a la prévisualisation de l'image
  let imagePreview = document.getElementById("image-preview");
  // Enlever le logo
  photoDisplayArea.style.display = "none";
  // display de l'image
  imagePreview.style.display = "flex";

  // Selectionner le bouton qui correpond a ajouter une image
  let addPictureButton = document.getElementById("add-picture-button");
  // Modifier le texte, lorsque qu'une image est présente
  addPictureButton.textContent = "Modifier";
}

//
// --------------------------------- Envoie de l'image vers le serveur --------------------------------//
//

// Lors de la validation du formulaire
formElem.onsubmit = async (e) => {
  // Empecher la page de se reactualiser
  e.preventDefault();

  // Verification token
  let token = isConnected();

  if (!token) {
    console.log("Utilisateur non connecté");
    return false;
  }

  // Obtenir l'élément HTML qui correspond a la forme des elements
  let formElem = document.getElementById("formElem");

  try {
    // Appel de la fonction post de l'API
    const res = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      // convertir le javascript en formdata pour qu'il soit lisible 
      body: new FormData(formElem),
    });

    // Message d'erreur
    if (res.status === 401 || res.status === 404) {
      console.log("erreur 401 ou 404");
      // On change le style de la div ou le message d'erreur se trouve pour l'afficher
    } else if (res.status === 201) {
      // Mettre a jour la gallerie
      getWorks(gallery);
      // Fermer la modale
      modalAddPicture.style.display = "none";
    }
  } catch (err) {
    console.log(err);
  }
};
