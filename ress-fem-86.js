/* REVEALS THE MAP */
const mbox = document.getElementById("mapbox"),
      cats = document.getElementById("categories"),
      cars = document.getElementById("caretakers"),
      city = document.getElementById("city"),
      carc = document.getElementById("careContainer"),
      ttop = document.getElementById("totop"),
      nmbr = document.getElementById("numbr");
      // beta = document.querySelectorAll("[data-alpha]");
var art = document.getElementsByTagName("article"),
    artl = art.length;

function sort() {
  "care" == cats.value ? carc.style.display = "inline-block" : carc.style.display = "none";
  var nb = 0;
  for (let i = 0; i < artl; i++) {
    if (art[i].getAttribute('data-hashtag').indexOf(cats.value) !== -1 && art[i].getAttribute('data-hashtag').indexOf(cars.value) !== -1 && art[i].getAttribute('data-hashtag').indexOf(city.value) !== -1) {
      art[i].style.display = "block";
      nb++
    } else {
      art[i].style.display = "none"
    }
  }
  nmbr.innerHTML = "(" + nb + "&nbsp;résultats)";
  nb = 0;
}
/*document.getElementById("scroller").addEventListener("mouseover", function(evt) {
  var targ = beta[evt.target.id.charCodeAt(0) - 65]
  console.log(targ)
},false);/*

/*** Click EventListeners ***/
document.addEventListener("click", function(evt) {
  if (evt.target.className == "tomap") {
    mbox.className += " deploy"
  } else if (evt.target.className !== "mapbox") {
    mbox.className = "mapbox"
  }
  if (evt.target.className == "cloning") {
    evt.preventDefault();
    var trad = evt.target.getAttribute('data-clone'),
        elem = document.getElementById(trad),
        b = elem.cloneNode(true);
    b.style.display = "block";
    b.style.position = "fixed";
    b.style.left = "50%";
    b.style.top = "50%";
    b.style.maxWidth = "100vw";
    b.style.transform = "translateX(-50%) translateY(-50%)"
    b.zIndex = "" != elem.zIndex ? + elem.zIndex + 1 : 16777271;
    b.id = (elem.id) ? elem.id + "_cloned" : "";
    document.body.appendChild(b);
    document.addEventListener("click", function(e) {
      !b.contains(e.target) && b.remove();
    }, false);
  }
}, false);
document.getElementById("quitter").addEventListener("click", function() {
  document.getElementById("important").style.display = "none";
  window.localStorage.setItem("modale", true);
}, false);
ttop.addEventListener("click", function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}, false);
document.getElementById("exit").addEventListener("click", function() {
  mbox.className = "mapbox"
}, false);

/*** Change EventListeners ***/
cars.addEventListener("change", sort, false);
city.addEventListener("change", sort, false);
cats.addEventListener("change", function() {
  "care" !== this.value && (cars.selectedIndex = 0);
  "phon" == this.value && (city.selectedIndex = 0);
  sort()
}, false);

window.addEventListener("scroll", function() {
  document.body.scrollTop > 600 || document.documentElement.scrollTop > 600 ? ttop.style.display = "block" : ttop.style.display = "none";
}, false);

window.addEventListener("DOMContentLoaded", function() {
  cats.selectedIndex = cars.selectedIndex = city.selectedIndex = 0;
  nmbr.innerHTML = "(" + artl + "&nbsp;résultats)";
  var isModale = window.localStorage.getItem("modale");
  if (!isModale) document.getElementById("important").style.display = "block";
},false);
