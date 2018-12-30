// TODO: FAV: ER VOOR ZORGEN DAT HET ZELFDE OBJECT MAAR 1X kan worden toegevoegd
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

// READ KOTEN
function read_data(){
  document.getElementById('content').innerHTML = "";
  let raw = firebase.database().ref("koten");
  raw.on("value", function(snapshot){
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
      let inhoud = "";
      let post_content = "<div class='kot_overzicht'><h3>" + data.gebouw + " - " + data.adres + "</h3><p><b>Huur: </b>€ " + data.huurprijs + "/maand, <b>Waarborg: </b>€" + data.waarborg + ", <b>Oppervlakte: </b>" + data.oppervlakte + "m²</p><button id='" + childSnapshot.key + "' class='fav-btn'>Favoriet</button><button id='" + childSnapshot.key + "' class='readmore-btn'>Lees meer</button></div>";
      document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);
    })
    renderButtons();
  })
}

read_data();


// RENDER KOTEN
function renderButtons() {
    let favButton = document.querySelectorAll('.fav-btn');
    let readMoreButton = document.querySelectorAll('.readmore-btn')
    for (i = 0; i < favButton.length; i++) {
        favButton[i].addEventListener('click', addToFav);
    }
    for (i = 0; i < readMoreButton.length; i++) {
        readMoreButton[i].addEventListener('click', readMore);
    }
};

// ADD TO FAVORITS
function addToFav(event){
	let key = event.currentTarget.id;
  console.log(key);
  let name = localStorage.getItem('huurder_name');
  firebase.database().ref("favorits").push({
    key:key,
    name:name
  })
}

// DETAIL PAGE
function readMore(event){
	let key = event.currentTarget.id;
    localStorage.setItem('detail_key', key);
    window.location.href = 'detail_huurder.html';
}


// FILTER
let typeGebouwOpenBtn = document.getElementById('typeGebouwOpen');
typeGebouwOpenBtn.addEventListener('click', function(){
  document.getElementById('typeGebouwSection').classList.remove('hide');
  document.getElementById('typeGebouwOpen').classList.add('hide');
  document.getElementById('typeGebouwClose').classList.remove('hide');
})

let typeGebouwCloseBtn = document.getElementById('typeGebouwClose');
typeGebouwCloseBtn.addEventListener('click', function(){
  document.getElementById('typeGebouwSection').classList.add('hide');
  document.getElementById('typeGebouwOpen').classList.remove('hide');
  document.getElementById('typeGebouwClose').classList.add('hide');
})

let filterGebouwBtn = document.getElementById('filterGebouw');
filterGebouwBtn.addEventListener('click', function(){
  read_data();
  let typeGebouw = document.getElementById('typeGebouw').value;
  let minPrijs = document.getElementById('minPrijs').value;
  let maxPrijs = document.getElementById('maxPrijs').value;
  let minOppervlakte = document.getElementById('minOppervlakte').value;
  console.log(typeGebouw + " " + maxPrijs + " " + minOppervlakte);
  if (typeGebouw == "Alles" && maxPrijs == "" && minOppervlakte =="") {
    read_data();
  }else{
  document.getElementById('content').innerHTML = "";
  let raw = firebase.database().ref("koten");
  raw.on("value", function(snapshot){
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
      let inhoud = "";
        
        // GEBOUW FILTER
          if (maxPrijs != "" && minPrijs != "" ) {
            if (typeGebouw == data.gebouw && data.huurprijs >= minPrijs && data.huurprijs <= maxPrijs && data.oppervlakte >= minOppervlakte) {

              let post_content = "<div class='kot_overzicht'><h3>" + data.gebouw + " - " + data.adres + "</h3><p><b>Huur: </b>€ " + data.huurprijs + "/maand, <b>Waarborg: </b>€" + data.waarborg + ", <b>Oppervlakte: </b>" + data.oppervlakte + "m²</p><button id='" + childSnapshot.key + "' class='fav-btn'>Favoriet</button><button id='" + childSnapshot.key + "' class='readmore-btn'>Lees meer</button></div>";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);      
            }else{
              post_content = "";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);

            }
          }else if (maxPrijs != "") {

            if (typeGebouw == data.gebouw && data.huurprijs <= maxPrijs && data.oppervlakte >= minOppervlakte) {
              let post_content = "<div class='kot_overzicht'><h3>" + data.gebouw + " - " + data.adres + "</h3><p><b>Huur: </b>€ " + data.huurprijs + "/maand, <b>Waarborg: </b>€" + data.waarborg + ", <b>Oppervlakte: </b>" + data.oppervlakte + "m²</p><button id='" + childSnapshot.key + "' class='fav-btn'>Favoriet</button><button id='" + childSnapshot.key + "' class='readmore-btn'>Lees meer</button></div>";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);      
            }else{
              post_content = "";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);

          }
          }else if (minPrijs != "" ) {
            if (typeGebouw == data.gebouw && data.huurprijs >= minPrijs && data.oppervlakte >= minOppervlakte) {
              let post_content = "<div class='kot_overzicht'><h3>" + data.gebouw + " - " + data.adres + "</h3><p><b>Huur: </b>€ " + data.huurprijs + "/maand, <b>Waarborg: </b>€" + data.waarborg + ", <b>Oppervlakte: </b>" + data.oppervlakte + "m²</p><button id='" + childSnapshot.key + "' class='fav-btn'>Favoriet</button><button id='" + childSnapshot.key + "' class='readmore-btn'>Lees meer</button></div>";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);      
            }else{
              post_content = "";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);
            }
          }else if (maxPrijs == "" && minPrijs == "") {
            if (typeGebouw == data.gebouw && data.oppervlakte >= minOppervlakte) {

              let post_content = "<div class='kot_overzicht'><h3>" + data.gebouw + " - " + data.adres + "</h3><p><b>Huur: </b>€ " + data.huurprijs + "/maand, <b>Waarborg: </b>€" + data.waarborg + ", <b>Oppervlakte: </b>" + data.oppervlakte + "m²</p><button id='" + childSnapshot.key + "' class='fav-btn'>Favoriet</button><button id='" + childSnapshot.key + "' class='readmore-btn'>Lees meer</button></div>";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);      
            }else{
              post_content = "";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);

            }
          }else{

            if (data.gebouw == typeGebouw && data.oppervlakte >= minOppervlakte) {
              let post_content = "<div class='kot_overzicht'><h3>" + data.gebouw + " - " + data.adres + "</h3><p><b>Huur: </b>€ " + data.huurprijs + "/maand, <b>Waarborg: </b>€" + data.waarborg + ", <b>Oppervlakte: </b>" + data.oppervlakte + "m²</p><button id='" + childSnapshot.key + "' class='fav-btn'>Favoriet</button><button id='" + childSnapshot.key + "' class='readmore-btn'>Lees meer</button></div>";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);      
            }else{
              post_content = "";
              document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);
            }
          }
      
    })
    renderButtons();
  })
  }
})

let resetFilterBtn = document.getElementById('resetFilters');
resetFilterBtn.addEventListener('click', function(){
  read_data();
})