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


if (localStorage.getItem('detail_key') != null) {
	// READ EIGEN KOTEN
	function read_data(){
		let key = localStorage.getItem('detail_key');
	  	let raw = firebase.database().ref("koten/" + key);
	  	raw.on("value", function(snapshot){
	      		data = snapshot.val();
	     	 	let post_content = "<div><h3>" + data.gebouw + " - " + data.adres + "</h3><p><b>Huur: </b>€ " + data.huurprijs + "/maand, <b>Waarborg: </b>€" + data.waarborg + "</p><ul><li><b>Oppervlakte: </b>" + data.oppervlakte + " m²</li><li><b>Verdiepingen: </b>" + data.verdiepingen + "</li><li><b>Toilet: </b>" + data.toilet + "</li><li><b>Sanitair: </b>" + data.sanitair + "</li><li><b>Keuken: </b>" + data.keuken + "</li><li><b>Bemeubeld: </b>" + data.jameubelsnee + ": " + data.meubilair + "</li></ul><h3>Korte beschrijving</h3><p>" + data.beschrijving + "</p></div>";
      			document.getElementById('detail_blok').innerHTML = post_content;
      			localStorage.setItem('verhuurder_name', data.eigenaar);
      			let onderwerp = data.gebouw + " - " + data.adres;
      			localStorage.setItem('onderwerp', onderwerp);
	  });
	}

	read_data();
}else{
	window.location.href = "overzicht_huurder.html";
}
// BERICHTEN
let messageBtn = document.getElementById('messageBtn');
messageBtn.addEventListener('click', function(){
	document.getElementById('chatbox').classList.remove('hide');
	document.getElementById('messageBtn').classList.add('hide');

	let sendBtn = document.getElementById('sendBtn');
	sendBtn.addEventListener('click', function(){
		let bericht = document.getElementById('bericht').value;
		if (bericht != "") {
			let from = localStorage.getItem('huurder_name');
			let to = localStorage.getItem('verhuurder_name');
			let onderwerp = localStorage.getItem('onderwerp')
			console.log("from: " + from + ", to: " + to + ", onderwerp: " + onderwerp +  ", je bericht: " + bericht);

			firebase.database().ref("berichten").push({
				from:from,
				to:to,
				onderwerp: onderwerp,
				bericht:bericht
			})

			alert('Je berichten is verzonden');
			document.getElementById('bericht').value = "";
		}else{
			alert('Type een bericht');
		}
	})

	let closeChatBtn = document.getElementById('close_chat');
	closeChatBtn.addEventListener('click', function(){
		document.getElementById('chatbox').classList.add('hide');
		document.getElementById('messageBtn').classList.remove('hide');
	})
})