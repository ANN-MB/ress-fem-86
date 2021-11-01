/* REVEALS THE MAP */
document.addEventListener("click", function(evt) {
	if(evt.target.className == "tomap") {
		document.getElementById("mymap").style.right = "0"
	} else if(evt.target.className !== "map") {
		document.getElementById("mymap").style.right = "-50vw"
	} else {
		return false
	}
}, false);

/* SCROLL TO TOP */
window.onscroll = function() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
	document.getElementById("totop").style.display = "block";
  } else {
	document.getElementById("totop").style.display = "none";
  }
};
document.getElementById("totop").addEventListener("click", function(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}, false);

/* SORTING FUNCTION */
var chk = document.getElementsByTagName("article"),
	chkl = chk.length,
	cats = document.getElementById("categories"),
	cars = document.getElementById("caretakers"),
	city = document.getElementById("city"),
	carc = document.getElementById("careContainer");

function sort() {
	if (cats.value == "care") {
		carc.style.display = "inline-block"
	} else {
		carc.style.display = "none"
	}
	var nb = 0;
	for(let i = 0; i < chkl; i++) {
		if(chk[i].getAttribute('data-hashtag').indexOf(cats.value) !== -1 && chk[i].getAttribute('data-hashtag').indexOf(cars.value) !== -1 && chk[i].getAttribute('data-hashtag').indexOf(city.value) !== -1) {
			chk[i].style.display = "block";
			nb++
		} else {
			chk[i].style.display = "none"
		}
	}
	document.getElementById("numbr").innerHTML = "("+nb+" résultats)";
	nb = 0;
}	

cats.addEventListener("change", sort, false);	
cars.addEventListener("change",sort, false);
city.addEventListener("change", sort, false);