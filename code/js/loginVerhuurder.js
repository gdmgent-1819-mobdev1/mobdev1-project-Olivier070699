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

// GET ELEMENTS
const txtEmail = document.getElementById('mail');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('signin');
const btnSignUp = document.getElementById('signup');
const btnLogout = document.getElementById('logout');
const btnNieuw = document.getElementById('nieuweGebruiker');
const btnAlAccount = document.getElementById('alAccount');
const navBtn = document.querySelector('.nav');


// Add login event
btnLogin.addEventListener('click', e =>{
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  // SIGN IN
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message)); //MELDING
  promise.catch(e => document.getElementById('fouten').innerHTML = e.message);
})

// SIGN UP
btnSignUp.addEventListener('click', e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  let voornaam = document.getElementById('voornaam').value;
  let achternaam = document.getElementById('achternaam').value;
  let straatnaam = document.getElementById('straat').value;
  let huisnummer = document.getElementById('nummer').value;
  let stad = document.getElementById('stad').value;
  let adres = straatnaam + " " + huisnummer + ", " + stad;
  let gsm = document.getElementById('gsm').value;

    voornaam:voornaam,
  firebase.database().ref("gebruikers").push({
    achternaam:achternaam,
    adres:adres,
    gsm:gsm
  })

  // SIGN IN
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise
    .catch(e => console.log(e.message)) //MELDING
    .catch(e => document.getElementById('fouten').innerHTML = e.message);

})

// LOGOUT
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  localStorage.removeItem('name');
})

// NIEUWE GEBRUIKER
btnNieuw.addEventListener('click', function(){
  btnLogin.classList.add('hide');
  btnNieuw.classList.add('hide');
  btnSignUp.classList.remove('hide');
  btnAlAccount.classList.remove('hide');
  document.getElementById('nieuwForm').classList.remove('hide');
})

btnAlAccount.addEventListener('click', function(){
  btnLogin.classList.remove('hide');
  btnNieuw.classList.remove('hide');
  btnSignUp.classList.add('hide');
  btnAlAccount.classList.add('hide');
  document.getElementById('nieuwForm').classList.add('hide');
})

// REALTIME LISTENER
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log(firebaseUser);
    btnLogout.classList.remove('hide');
    document.getElementById('back').classList.add('hide');
    document.querySelector('#loginDiv').classList.add('hide');
    document.getElementById('content').classList.remove('hide');
    navBtn.classList.remove('hide');
    localStorage.setItem('name', firebaseUser.email);
    document.querySelector('.loginCenter').style.display = "none";

  }else{
    console.log('not logged in');
    btnLogout.classList.add('hide');
    document.getElementById('back').classList.remove('hide');
    document.querySelector('#loginDiv').classList.remove('hide');
    document.getElementById('content').classList.add('hide');
    localStorage.removeItem('name');
    navBtn.classList.add('hide');
    document.querySelector('.loginCenter').style.display = "flex";
  }
})

// READ KOTEN
function read_data(){
  document.getElementById('content').innerHTML = "";
  let raw = firebase.database().ref("koten");
  raw.on("value", function(snapshot){
    snapshot.forEach(function (childSnapshot){
      data = childSnapshot.val();
      let inhoud = "";
      let post_content = "<div><h3>" + data.gebouw + " - " + data.adres + "</h3><p><b>Huur: </b>€ " + data.huurprijs + "/maand, <b>Waarborg: </b>€" + data.waarborg + "</p><ul><li><b>Oppervlakte: </b>" + data.oppervlakte + " m²</li><li><b>Verdiepingen: </b>" + data.verdiepingen + "</li><li><b>Toilet: </b>" + data.toilet + "</li><li><b>Sanitair: </b>" + data.sanitair + "</li><li><b>Keuken: </b>" + data.keuken + "</li><li><b>Bemeubeld: </b>" + data.jameubelsnee + ": " + data.meubilair + "</li></ul><h3>Korte beschrijving</h3><p>" + data.beschrijving + "</p></div>";
      document.getElementById('content').insertAdjacentHTML('afterbegin', post_content);
    })
  })
}

read_data();