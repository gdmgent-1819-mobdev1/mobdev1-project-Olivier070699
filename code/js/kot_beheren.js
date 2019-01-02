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


// READ EIGEN KOTEN
function read_data(){
  let raw = firebase.database().ref("koten");
  raw.on("value", function(snapshot){
    document.getElementById('beheren').innerHTML = "";
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
      let inhoud = "";
      let post_content = "<div><h3>" + data.gebouw + " - " + data.adres + "</h3>";
      if(data.eigenaar == localStorage.getItem('name')){
          console.log(data);
          post_content += '<button id="' + childSnapshot.key + '" class="remove-btn">Remove</button><button id="' + childSnapshot.key + '" class="edit-btn">Edit post</button><hr class="inter-post"></div>';
          localStorage.setItem( childSnapshot.key, JSON.stringify(data));
      }else{
        post_content = "";
      }
      document.getElementById('beheren').insertAdjacentHTML('afterbegin', post_content);
    });
    renderEventListeners();
  });
}

function renderEventListeners() {
    // REMOVE
    let removeButtons = document.querySelectorAll('.remove-btn');
    for (i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', remove);
    }

    // EDIT
    let editButtons = document.querySelectorAll('.edit-btn');
    for(i = 0; i < editButtons.length; i++){
        editButtons[i].addEventListener('click', edit);
}}

function edit(event){
  document.getElementById('form').innerHTML = "";
  document.getElementById('form').classList.remove('hide');
  let key = event.currentTarget.id;
  localStorage.setItem('updateKey', key);
  console.log(key);
  let raw = firebase.database().ref('koten/' + key);
  raw.on("value", function(snapshot){
      data = snapshot.val();
      document.getElementById('form').innerHTML = '<h3>Type gebouw</h3> <select id="type_gebouw"> <option value="kot">Kot</option> <option value="studio">Studio</option> <option value="appartement">Appartement</option> <option value="loft">Loft</option> </select> <h3>Adres</h3> <input value="' + data.adres + '" id="straat" type="text" placeholder="straatnaam"> <h3>Huurprijs per maand</h3> <input value="' + data.huurprijs + '" id="huurprijs" type="number" placeholder="prijs per maand"> <h3>Waarborg</h3> <input value="' + data.waarborg + '" id="waarborg" type="number" placeholder="waarborg"> <h3>Oppervlakte in m²</h3> <input value="' + data.oppervlakte +  '" id="oppervlakte" type="number" placeholder="oppervlakte"> <h3>Aantal verdiepingen</h3> <select id="verdiepingen"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5+">5+</option></select><h3>Toilet</h3> <select id="toilet"> <option value="Privé">Privé</option> <option value="Gemeenschappelijk">Gemeenschappelijk</option> <option value="Niet aanwezig">Niet aanwezig</option> </select><h3>Sanitar</h3> <select id="sanitair"> <option value="Douche">Douche</option> <option value="Bad">Bad</option> <option value="Bad & douche">Bad & douche</option> </select> <h3>Keuken</h3> <select id="keuken"> <option value="prive">Privé</option> <option value="gemeenschappelijk">Gemeenschappelijk</option> </select> <h3>Bemeubeld</h3><select id="jameubelsnee"> <option value="Ja">Ja</option> <option value="Nee">Nee</option> </select><input value="' + data.meubilair + '" id="meubilair" type="text" placeholder="aanwezig meubels"> <h3>Korte beschrijving</h3> <textarea value="" id="beschrijving" placeholder="Korte beschrijving"></textarea> <input id="kot_update" type="submit" value="Updaten">'
      document.getElementById('beschrijving').value = data.beschrijving;
      document.getElementById('beheren').style.minHeight = "30vh";
      });

  let updateBtn = document.getElementById('kot_update');
  updateBtn.addEventListener('click', function(){

      let gebouw = document.getElementById('type_gebouw').value;
      let adres = document.getElementById('straat').value;
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
      
      if (adres != "" && huurprijs != "" && waarborg != "" && oppervlakte) {
        document.getElementById('beheren').innerHTML = "";
        let key = localStorage.getItem('updateKey');
        firebase.database().ref("koten/" + key).update({

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
        read_data();
        alert(gebouw + " werd geüpdate");
        document.getElementById('form').classList.add('hide');
        document.getElementById('beheren').style.minHeight = "100vh";
    }else{
      alert("Er zijn nog lege velden");
      read_data();
    }
  })
}

function remove(event) {
    let key = event.currentTarget.id;
    console.log(key);
    firebase.database().ref('koten/' + key).remove();
    read_data();
}

read_data();

// LOGOUT
const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  localStorage.removeItem('name');
  window.location.href = "verhuurder.html";
})