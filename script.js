/* REVEALS THE MAP */
const mbox = document.getElementById("mapbox"),
	  cats = document.getElementById("categories"),
	  cars = document.getElementById("caretakers"),
	  city = document.getElementById("city"),
	  carc = document.getElementById("careContainer"),
	  ttop = document.getElementById("totop");

document.addEventListener("click", function(evt) {
  if(evt.target.className == "tomap") {
    mbox.className += " deploy"
  } else if(evt.target.className !== "mapbox") {
    mbox.className = "mapbox"
  }
}, false);

document.getElementById("exit").addEventListener("click", function() {
  mbox.className = "mapbox"
}, false);

/* SCROLL TO TOP */
window.onscroll = function() {
  document.body.scrollTop > 600 || document.documentElement.scrollTop > 600 ? ttop.style.display="block" : ttop.style.display="none";
};
ttop.addEventListener("click", function(){
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}, false);

/* SORTING FUNCTION */
var art = document.getElementsByTagName("article"),
    artl = art.length;
function sort() {
  "care" == cats.value ? carc.style.display = "inline-block" : carc.style.display = "none";
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
  "care" !== this.value && (cars.selectedIndex = 0);
  sort()
}, false);	
cars.addEventListener("change", sort, false);
city.addEventListener("change", sort, false);

window.addEventListener("DOMContentLoaded", function(){
   document.getElementById("numbr").innerHTML = "("+artl+" résultats)";
});
