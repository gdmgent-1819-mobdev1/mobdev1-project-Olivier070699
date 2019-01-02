let config = {
  apiKey: "AIzaSyDEhHIoOY8d1LTMqF7wZ5Ipi4V-j4Ho3gI",
  authDomain: "mobdev-verhuurder.firebaseapp.com",
  databaseURL: "https://mobdev-verhuurder.firebaseio.com",
  projectId: "mobdev-verhuurder",
  storageBucket: "mobdev-verhuurder.appspot.com",
  messagingSenderId: "695238747675"
};
firebase.initializeApp(config);

// GECONTACTEERDE KOTEN
function read_data(){
  let raw = firebase.database().ref("berichten");
  raw.on("value", function(snapshot){
    document.getElementById('berichten').innerHTML = "";
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
      let inhoud = "";
      let name = localStorage.getItem('name');

      if (data.to == name) {
      	let post_content = "<div><h3>" + data.from + "</h3><button id='" + childSnapshot.key + "' class='readMessageBtn'>Open chat</button></div>";
      	document.getElementById('berichten').insertAdjacentHTML('afterbegin', post_content);
      }else{
      	post_content = "";
      }     
    })
    renderButtons();
  })
}

read_data();

function renderButtons() {
    let readMessage = document.querySelectorAll('.readMessageBtn')
    for (i = 0; i < readMessage.length; i++) {
        readMessage[i].addEventListener('click', fullConversation);
    }
};

function fullConversation(event){
	let messageKey = event.currentTarget.id;
	localStorage.setItem('messageKey', messageKey);
	window.location.href = "berichtFullConversationVerhuurder.html"
}

// LOGOUT
const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  localStorage.removeItem('name');
  window.location.href = "verhuurder.html";
})
