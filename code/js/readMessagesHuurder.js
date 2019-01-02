let config = {
  apiKey: "AIzaSyDEhHIoOY8d1LTMqF7wZ5Ipi4V-j4Ho3gI",
  authDomain: "mobdev-verhuurder.firebaseapp.com",
  databaseURL: "https://mobdev-verhuurder.firebaseio.com",
  projectId: "mobdev-verhuurder",
  storageBucket: "mobdev-verhuurder.appspot.com",
  messagingSenderId: "695238747675"
};
firebase.initializeApp(config);

// EERSTE ZIN
function first_message(){
  document.getElementById('firstConversation').innerHTML = "";
  let key = localStorage.getItem('messageKey');
  console.log(key);
  let raw = firebase.database().ref("berichten/" + key);
  raw.on("value", function(snapshot){
      data = snapshot.val();
      console.log(data.bericht);
      let inhoud = "";
      let post_content = "<p class='messageEigen'>" + data.bericht + "</p>";
      localStorage.setItem('verhuurder', data.to);
      document.getElementById('firstConversation').insertAdjacentHTML('afterbegin', post_content);    
  })
  conversation();
}
first_message();

// ANDERE BERICHTEN LEZEN
function conversation(){
  let raw = firebase.database().ref("conversation");
  raw.on("value", function(snapshot){
    document.getElementById('conversation').innerHTML ="";
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
      let huurder = localStorage.getItem('huurder_name');
      let verhuurder = localStorage.getItem('verhuurder');
      let inhoud = "";
      if (huurder == data.huurder && verhuurder == data.verhuurder) {
        if(data.sendedBy == huurder){
          let post_content = "<p class='messageEigen'>" + data.bericht + "</p>";
          document.getElementById('conversation').insertAdjacentHTML('beforeend', post_content);
        }else{
          let post_content = "<p class='messageAnder'>" + data.bericht + "</p>";
          document.getElementById('conversation').insertAdjacentHTML('afterbegin', post_content);
        } 
      }
    })
  })
}

conversation();

// NIEUW BERICHT VERSTUREN
let sendNewMessageBtn = document.getElementById('sendNewMessageBtn');
sendNewMessageBtn.addEventListener('click', function(){
  let bericht = document.getElementById('newMessage').value;
  let verhuurder = localStorage.getItem('verhuurder');
  let huurder = localStorage.getItem('huurder_name');
    if (bericht != "") {
      firebase.database().ref("conversation").push({
        huurder:huurder,
        verhuurder:verhuurder,
        bericht:bericht,
        sendedBy:huurder
      })
    }
    document.getElementById('newMessage').value="";
    document.getElementById('conversation').innerHTML = "";
    first_message();
})