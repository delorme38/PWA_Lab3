if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function (reg) {

    if (reg.installing) {
      console.log('Service worker installing');
    } else if (reg.waiting) {
      console.log('Service worker installed');
    } else if (reg.active) {
      console.log('Service worker active');
    }
  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}



import Carte from "./Carte.js";
let cartes = Array();

remplireCarte();

// la fonction existe seulement pour creer un tableau de carte general pour tester l'exemple du site
// ici on pourrait avoir une base de donnee en JSON ou XML pour generer l'affichage du site.
function remplireCarte() {
  let pos;
  for (let i = 0; i < 9; i++) {
    let carte = new Carte();
    pos = (i + 1);
    carte.id = pos;
    carte.title = '<h5 class="card-title">Photo numero ' + (pos) + '</h5>';
    carte.image = '<img src="img/img-' + (pos) + '.jpg" class="card-img-top" alt="Une image">';
    carte.bouton = '<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#buttonDescription' + (pos) + '" aria-expanded="false" aria-controls="buttonDescription"> Description de l\'oeuvre </button></p><div class="collapse" id="buttonDescription' + (pos) + '"><div class="card card-body">Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.</div></div>';
    carte.desc = '<p class="card-text">Une photos pour decrire l\'image numero ' + (pos) + '</p>';
    cartes.push(carte);
  }
  createTag();
}

// avec cette fonction j'injecte les cartes une a une dans ma division du fichier index.html "carte" prevu pour les recevoir.
// c'est simple et sa pourrait etre retravailler mais sa fonctionne :). 
function createTag() {
  const affich = document.getElementById('carte');
  const sDiv = '<div class="col-md-4 my-2"><div class="card"><div class="card-body">';
  const eDiv = '</div></div></div>';
  let res = '';

  for (let i = 0; i < cartes.length; i++) {
    res += sDiv + cartes[i].image + cartes[i].title + cartes[i].desc + cartes[i].bouton + eDiv
    affich.innerHTML = res;
  }
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  toast();
  console.log(`'beforeinstallprompt'`);
  appButton.addEventListener('click', function () {
    deferredPrompt.prompt();
  })
});

// fait apparaitre la toast
function toast() {
  console.log('installApp');
  const fenetre = document.getElementById('maToast')
  const toast = new bootstrap.Toast(fenetre, { delay: 5000 }) //reste affichée 6 secondes seulement
  toast.show();
}
