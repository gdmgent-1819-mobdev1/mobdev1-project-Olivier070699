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
  document.getElementById('beheren').innerHTML = "";
  let raw = firebase.database().ref("koten");
  raw.on("value", function(snapshot){
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
      let inhoud = "";
      let post_content = "<div><h3>" + data.gebouw + " - " + data.adres + "</h3>";
      if(data.eigenaar == localStorage.getItem('name')){
          console.log(data);
          post_content += '<button id="' + childSnapshot.key + '" class="remove-btn">Remove</button><button id="' + childSnapshot.key + '" class="edit-btn">Edit post</button><hr class="inter-post"></div>';
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
        editButtons[i].addEventListener('click', function(e){
          // SHOW FORM
          document.getElementById('form').classList.remove('hide');

          // SAVE EDIT
          document.getElementById('kot_update').addEventListener('click', function(){
          });
        });
    }
}

function remove(event) {
    let key = event.currentTarget.id;
    console.log(key);
    firebase.database().ref('koten/' + key).remove();
    read_data();
}

read_data();
