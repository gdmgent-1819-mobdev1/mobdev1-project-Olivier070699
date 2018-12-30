// Initialize Firebase
let config = {
  apiKey: "AIzaSyDEhHIoOY8d1LTMqF7wZ5Ipi4V-j4Ho3gI",
  authDomain: "mobdev-verhuurder.firebaseapp.com",
  databaseURL: "https://mobdev-verhuurder.firebaseio.com",
  projectId: "mobdev-verhuurder",
  storageBucket: "mobdev-verhuurder.appspot.com",
  messagingSenderId: "695238747675"
};
firebase.initializeApp(config);

// TOEVOEGEN AAN FIREBASE
let toevoegen = document.getElementById('kot_toevoegen');

toevoegen.addEventListener('click', function(){
  let gebouw = document.getElementById('type_gebouw').value;
  let straat = document.getElementById('straat').value;
  let huisnummer = document.getElementById('huisnummer').value
  let stad = document.getElementById('stad').value;
  let adres = straat + " " + huisnummer + ", " + stad;
  let huurprijs = document.getElementById('huurprijs').value;
  let waarborg = document.getElementById('waarborg').value;
  let oppervlakte = document.getElementById('oppervlakte').value;
  let verdiepingen = document.getElementById('verdiepingen').value;
  let toilet = document.getElementById('toilet').value
  let sanitair = document.getElementById('sanitair').value;
  let keuken = document.getElementById('keuken').value;
  let jameubelsnee = document.getElementById('jameubelsnee').value;
  let meubilair = document.getElementById('meubilair').value;
  let beschrijving = document.getElementById('beschrijving').value;
  let eigenaar = localStorage.getItem('name');


  firebase.database().ref("koten").push({

    gebouw:gebouw,
    adres:adres,
    huurprijs:huurprijs,
    waarborg:waarborg,
    oppervlakte:oppervlakte,
    verdiepingen:verdiepingen,
    sanitair:sanitair,
    toilet:toilet,
    keuken:keuken,
    jameubelsnee:jameubelsnee,
    meubilair:meubilair,
    beschrijving:beschrijving,
    eigenaar:eigenaar

  })
  alert(gebouw + ' werd toegevoegd');
});
// READ KOTEN
//document.getElementById('koten').innerHTML = "<div><h3>" + gebouw + " - " + adres + "</h3><p><b>Huur: </b>€ " + huurprijs + "/maand, <b>Waarborg: </b>€" + waarborg + "</p><ul><li><b>Oppervlakte: </b>" + oppervlakte + " m²</li><li><b>Verdiepingen: </b>" + verdiepingen + "</li><li><b>Sanitair: </b>" + sanitair + "</li><li><b>Keuken: </b>" + keuken + "</li><li><b>Bemeubeld: </b>" + meubilair + "</li></ul><h3>Korte beschrijving</h3><p>" + beschrijving + "</p></div>";
