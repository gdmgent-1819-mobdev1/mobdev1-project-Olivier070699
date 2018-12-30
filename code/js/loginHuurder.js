// START MET FUNCTION
let config = {
    apiKey: "AIzaSyCHPuYm4r6u6Mjy5U1T4sxiRbd4G8_XjV8",
    authDomain: "eind-opdracht-mobdev.firebaseapp.com",
    databaseURL: "https://eind-opdracht-mobdev.firebaseio.com",
    projectId: "eind-opdracht-mobdev",
    storageBucket: "eind-opdracht-mobdev.appspot.com",
    messagingSenderId: "19684165946"
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

  firebase.database().ref("gebruikers").push({
    voornaam:voornaam,
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
// btnLogout.addEventListener('click', e => {
//   firebase.auth().signOut();
//   localStorage.removeItem('huurder_name');
// })

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
    document.getElementById('back').classList.add('hide');
    document.querySelector('#loginDiv').classList.add('hide');
    localStorage.setItem('huurder_name', firebaseUser.email);
    window.location.href = 'overzicht_huurder.html';

  }else{
    console.log('not logged in');
    document.getElementById('back').classList.remove('hide');
    document.querySelector('#loginDiv').classList.remove('hide');
  }
});


