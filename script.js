/* REVEALS THE MAP */
const mbox = document.getElementById("mapbox"),
	  cats = document.getElementById("categories"),
	  cars = document.getElementById("caretakers"),
	  city = document.getElementById("city"),
	  carc = document.getElementById("careContainer"),
	  ttop = document.getElementById("totop"),
	  nmbr = document.getElementById("numbr");

document.addEventListener("click", function(evt) {
  if(evt.target.className == "tomap") {
    mbox.className += " deploy"
  } else if(evt.target.className !== "mapbox") {
    mbox.className = "mapbox"
  }
  if(evt.target.className == "cloning") {
    evt.preventDefault();
    doClone(evt.target)
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
  nmbr.innerHTML = "("+nb+"&nbsp;résultats)";
  nb = 0;
}	

cats.addEventListener("change", function(){
  "care" !== this.value && (cars.selectedIndex = 0);
  "phon" == this.value && (city.selectedIndex = 0);
  sort()
}, false);	
cars.addEventListener("change", sort, false);
city.addEventListener("change", sort, false);

document.getElementById("quitter").addEventListener("click", function(){
  document.getElementById("important").style.display = "none";
  window.sessionStorage.setItem("modale", true);
}, false);

window.addEventListener("DOMContentLoaded", function(){
   nmbr.innerHTML = "("+artl+"&nbsp;résultats)";
   var isModale = window.sessionStorage.getItem("modale");
   if (isModale) {document.getElementById("important").style.display = "none";}
});

function doClone(a) {
  function absoluteClone(a) {
    var b = a.cloneNode(true);
    b.style.display = "block";
    b.style.position = "fixed";
    b.style.left = "50%";
    b.style.top = "50%";
    b.style.transform = "translateX(-50%) translateY(-50%)"
    b.zIndex = "" != a.zIndex ? +a.zIndex + 1 : 16777271;
    b.id = (a.id) ? a.id + "_cloned" : "";
    return b
  }
  var trad = a.getAttribute('data-clone'),
      elem = document.getElementById(trad),
      myClone = absoluteClone(elem);
  document.body.appendChild(myClone);
  
  document.addEventListener("click", function(e) {
	  if (!myClone.contains(e.target)) myClone.remove();
  },false);
}