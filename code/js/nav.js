const openMenuBtn = document.querySelector('.open_menu');
const closeMenuBtn = document.querySelector('.close_menu');

openMenuBtn.addEventListener('click', function(){
	document.querySelector('.ul').classList.remove('hide');
	closeMenuBtn.classList.remove('hide');
	openMenuBtn.classList.add('hide');
	document.querySelector('.nav').style.height = "100vh";
})

closeMenuBtn.addEventListener('click', function(){
	document.querySelector('.ul').classList.add('hide');
	closeMenuBtn.classList.add('hide');
	openMenuBtn.classList.remove('hide');
	document.querySelector('.nav').style.height = "0";
})