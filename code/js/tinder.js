let config = {
  apiKey: "AIzaSyDEhHIoOY8d1LTMqF7wZ5Ipi4V-j4Ho3gI",
  authDomain: "mobdev-verhuurder.firebaseapp.com",
  databaseURL: "https://mobdev-verhuurder.firebaseio.com",
  projectId: "mobdev-verhuurder",
  storageBucket: "mobdev-verhuurder.appspot.com",
  messagingSenderId: "695238747675"
};
firebase.initializeApp(config);

// CLEAR ALL LOCALSTORAGE
localStorage.clear();

// LOAD PROFILES
let tinderProfiles = new Array();
function data(){
  let raw = firebase.database().ref("koten");
  raw.on("value", function(snapshot){
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
      console.log(data);
      tinderProfiles.push(data);
    })
    console.log(tinderProfiles);
    localStorage.setItem("tinderProfiles", JSON.stringify(tinderProfiles));
    nextProfile();
  })
};

data();

// LOAD NEW PROFILES
let nul=0;
let active = '';

function nextProfile(){
    if (nul < tinderProfiles.length) {
        let newPerson = JSON.parse(localStorage.getItem('tinderProfiles'));
        active = newPerson[nul];
        showProfile(active);
        nul++;
    }else{
        document.getElementById('kotenFout').innerHTML = 'ER ZIJN GEEN KOTEN MEER';
    }
};

// NIEUW PROFIEL TONEN
function showProfile(gegevens){
let type = gegevens.gebouw
let adres = gegevens.adres;
let typeAdres = type + " - " + adres;
localStorage.setItem('typeAdres', typeAdres)
document.getElementById('typeAdres').innerHTML = typeAdres;

let oppervlakte = gegevens.oppervlakte + " m²";
let verdiepingen = gegevens.verdiepingen
document.getElementById('oppVerdiep').innerHTML = 'Oppervlakte: ' + oppervlakte + ", Verdiepingen " + verdiepingen;

let prijs = gegevens.huurprijs;
let waarborg = gegevens.waarborg;
document.getElementById('geld').innerHTML = "Huurprijs €" + prijs + "; Waarborg: €" + waarborg;
};

let like = new Array();
let dislike = new Array();

// LIKES
function likeButton(){
    let typeAdres = localStorage.getItem('typeAdres');
    like.push(typeAdres);
    nextProfile();
    localStorage.setItem('like', JSON.stringify(like));
    seeLikes();
};

//DISLIKE
function dislikeButton(){
    let typeAdres = localStorage.getItem('typeAdres');
    dislike.push(typeAdres);
    nextProfile();
    localStorage.setItem('dislike', JSON.stringify(dislike));
    seeDislikes();
};

function seeLikes(){
    document.getElementById('likeList').innerHTML = "";
    for (let i = 0; i < like.length; i++) {
        document.getElementById('likeList').innerHTML += "<li class='li_likes' id='" + i + "'>" + like[i] + "</li>";
    }
};

// seeDislikes
function seeDislikes(){
    document.getElementById('dislikeList').innerHTML = "";
    for (let i = 0; i < dislike.length; i++) {
        document.getElementById('dislikeList').innerHTML += "<li class='li_dislikes' id='" + i + "'>" + dislike[i] + "</li>";
    }
};

