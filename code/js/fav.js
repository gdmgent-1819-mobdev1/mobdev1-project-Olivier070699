let config = {
  apiKey: "AIzaSyDEhHIoOY8d1LTMqF7wZ5Ipi4V-j4Ho3gI",
  authDomain: "mobdev-verhuurder.firebaseapp.com",
  databaseURL: "https://mobdev-verhuurder.firebaseio.com",
  projectId: "mobdev-verhuurder",
  storageBucket: "mobdev-verhuurder.appspot.com",
  messagingSenderId: "695238747675"
};
firebase.initializeApp(config);


// CLEAR LOCALSTORAGE BIJ BEGIN
localStorage.removeItem('favkeys');


// GET KEYS FROM FAVORITS
function read_key(){
  let raw = firebase.database().ref("favorits");
  raw.on("value", function(snapshot){
    let keys = new Array();
    let childSnapKey = new Array();
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
          if (data.name == localStorage.getItem('huurder_name')) {
              console.log(data.key);
              console.log(childSnapshot.key);
              keys.push(data.key);
              childSnapKey.push(childSnapshot.key);
          }
    });
    console.log(keys);
    localStorage.setItem('favKeys', JSON.stringify(keys));
    localStorage.setItem('childSnapKey', JSON.stringify(childSnapKey));
    read_data();
  });
}
read_key();

// GET VALUES
function read_data(){
    document.getElementById('favorieten').innerHTML = "";
    let childSnapKey = JSON.parse(localStorage.getItem('childSnapKey'));
    let key = JSON.parse(localStorage.getItem('favKeys'));
    for (let i = 0; i < key.length; i++) {
    let raw = firebase.database().ref("koten/" + key[i]);
      raw.on("value", function(snapshot){
            data = snapshot.val();
            console.log(data);
            let post_content = "<div><h3>" + data.gebouw + " - " + data.adres + "</h3><button id='" + key[i] + "' class='readmore-btn'>Lees meer</button><button id='" + childSnapKey[i] + "' class='remove-btn'>Verwijder favoriet</button></div>";
            document.getElementById('favorieten').innerHTML += post_content;
            renderButtons();
  });
}
}

// RENDER BUTTONS
function renderButtons() {
    // let favButton = document.querySelectorAll('.fav-btn');
    let readMoreButton = document.querySelectorAll('.readmore-btn')
    for (i = 0; i < readMoreButton.length; i++) {
        readMoreButton[i].addEventListener('click', readMore);
    }
    let removeButtons = document.querySelectorAll('.remove-btn');
    for (i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', remove);
    }
};

// DETAIL PAGE
function readMore(event){
  let key = event.currentTarget.id;
    localStorage.setItem('detail_key', key);
    window.location.href = 'detail_huurder.html';
}

// DELETE FAVORIET
function remove(event) {
    let key = event.currentTarget.id;
    console.log(key);
    firebase.database().ref('favorits/' + key).remove();
}

// TODO CHECKEN OP DUBBELS
