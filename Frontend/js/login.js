// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ---------------- REGEX - Test pour voir si l'email est valide --------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}



formConnect.onsubmit = async (e) => {
  // empecher la page de se recharger
  e.preventDefault();
  // Clean the old error messages displayed if applicable
  let errMessage = document.getElementById("error");
  errMessage.innerHTML = "";
  //Checking if the user email input is valid using REGEX
  // si l'email est valide
  if (validateEmail(document.getElementById("email").value)) {
    // obtenir le contenu des input pour la verification
    let loginUser = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      // Appel de la fonction post de l'API pour verifier la correspondance du mail et du mot de passe
      const res = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // conversion du js vers du JSON pour qu'il soit compréhensible pour l'API
        body: JSON.stringify(loginUser),
      });

      // Les messages d'erreurs 
      if (res.status === 401 || res.status === 404) {
        errMessage.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
        // Si il n'y a pas de message d'erreur alors la connection est autorisé
      } else if (res.status === 200) {
        // Creation d'une variable pour donner le permission a l'utalisateur
        let user = await res.json();
        // envoyer l'ID ainsi que le token dans le local storage
        localStorage.setItem("id", user.userId);
        localStorage.setItem("token", user.token);

        // Chargement de la page principale
        location.href = "./index.html";
      }
    } catch (err) {
      console.log(err);
    }
    // Si l'email est invalide ou le mot de passe:
  } else {
    errMessage.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
  }
};
