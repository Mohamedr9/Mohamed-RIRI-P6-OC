// Verifier si l'utilisateur est connecté 
const isUserConnected = localStorage.getItem("token") !== null;

// Si l'utilisateur est connecté alors mettre en place tous les éléments lié a l'édition
if (isUserConnected) {
  // Selectionner tous les éléments lié a l'édition
  // Et modifier le display pour qu'il soit visible
  document
    .querySelectorAll(".edition")
    .forEach((a) => (a.style.display = "flex"));

  // Selectionner l'élément HTML lié a la fonction login ou logout
  let loginLogoutSwitch = document.getElementById("login-logout-switch");
  // modifier le contenu du bouton
  loginLogoutSwitch.innerHTML =
    "<button class='basic-typo hidden-button' id='logout'>logout</button>";

  //Faire apparaitre la bande noir dans le header
  let blackStripEdition = document.getElementById("edition-banner");
  blackStripEdition.style.display = "flex";

  //Cacher la fonction de filtrage
  let sortingDiv = document.getElementById("tri");
  sortingDiv.style.display = "none";
  // Si l'utilisateur n'est pas connecté 
} else {
  // Selectionner tous les éléments lié a l'édition
  // Et modifier le display pour qu'ils soient invisibles
  document
    .querySelectorAll(".edition")
    .forEach((a) => (a.style.display = "none"));

// Faire disparaitre la bande noir dans le header
  let blackStripEdition = document.getElementById("edition-banner");
  blackStripEdition.style.display = "none";

  // Remettre le bouton login

  // Selectionner l'élément HTML lié a la fonction login ou logout
  let loginLogoutSwitch = document.getElementById("login-logout-switch");
  // modifier le contenu du bouton
  loginLogoutSwitch.innerHTML = "<a href='./login.html' id='login'>login</a>";
}
