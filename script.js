/* REVEALS THE MAP */
const mabox = document.getElementById("mapbox"),
	  cats = document.getElementById("categories"),
	  cars = document.getElementById("caretakers"),
	  city = document.getElementById("city"),
	  carc = document.getElementById("careContainer");
document.addEventListener("click", function(evt) {
  if(evt.target.className == "tomap") {
    mabox.className += " deploy"
  } else if(evt.target.className !== "mapbox") {
    mabox.className = "mapbox"
  } 
}, false);
document.getElementById("exit").addEventListener("click", function(evt) {
  mabox.className = "mapbox"
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
var art = document.getElementsByTagName("article"),
    artl = art.length;
function sort() {
  if (cats.value == "care") {
    carc.style.display = "inline-block"
  } else {
    carc.style.display = "none"
  }
  var nb = 0;
  for(let i = 0; i < artl; i++) {
    if(art[i].getAttribute('data-hashtag').indexOf(cats.value) !== -1 && art[i].getAttribute('data-hashtag').indexOf(cars.value) !== -1 && art[i].getAttribute('data-hashtag').indexOf(city.value) !== -1) {
      art[i].style.display = "block";
      nb++
    } else {
      art[i].style.display = "none"
    }
  }
  document.getElementById("numbr").innerHTML = "("+nb+" résultats)";
  nb = 0;
}	

cats.addEventListener("change", function(){
  if (this.value !== "care") {
    cars.selectedIndex = 0
  }
  sort()
}, false);	
cars.addEventListener("change", sort, false);
city.addEventListener("change", sort, false);