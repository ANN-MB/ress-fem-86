/* REVEALS THE MAP */
const mbox = document.getElementById("mapbox"),
      mmap = document.getElementById("mymap"),
      cate = document.getElementById("categories"),
      care = document.getElementById("caretakers"),
      city = document.getElementById("city"),
      carc = document.getElementById("careContainer"),
      ttop = document.getElementById("totop"),
      nmbr = document.getElementById("numbr"),
	  impo = document.getElementById("important");
var art = document.getElementsByTagName("article"),
    artl = art.length,
    stock,
	sort = function() {
  var nb = 0;
  for (let i = 0; i < artl; i++) {
    if (art[i].getAttribute('data-hashtag').indexOf(cate.value) !== -1 && art[i].getAttribute('data-hashtag').indexOf(care.value) !== -1 && art[i].getAttribute('data-hashtag').indexOf(city.value) !== -1) {
      art[i].style.display = "block";
      nb++
    } else {
      art[i].style.display = "none"
    }
  }
  if (nb == 0) {
    nmbr.innerHTML = "(aucun&nbsp;r\u00e9sultat)";
  } else if (nb == 1) {
      nmbr.innerHTML = "(1&nbsp;r\u00e9sultat)";
  } else {
      nmbr.innerHTML = "(" + nb + "&nbsp;r\u00e9sultats)";
  }
};

document.addEventListener("click", function(evt) {
  if (evt.target.className == "tomap") {
    mbox.className += " deploy";
    stock = evt.target;
    document.getElementById("exit").focus();
  }
  if (evt.target.className == "goto") {
    evt.preventDefault();
    var trad = evt.target.href.replace(/(.+)#([A-Za-z0-9]+)/,"$2"),
        elem = document.getElementById(trad);
	elem.style.display = "block";
	elem.scrollIntoView();
  }
}, false);
document.getElementById("quitter").addEventListener("click", function() {
  impo.style.display = "none";
  window.localStorage.setItem("modale", true);
}, false);

document.getElementById("exit").addEventListener("click", function() {
  mbox.className = "mapbox";
  document.getElementById("exit").blur();
  stock.focus();
  stock = void 0;
}, false);

care.addEventListener("change", sort, false);
city.addEventListener("change", sort, false);
cate.addEventListener("change", function() {
  "care" !== this.value ? (care.selectedIndex = 0, carc.style.display = "none") : (carc.style.display = "inline-block", care.focus());
  "phon" == this.value && (city.selectedIndex = 0);
  sort();
}, false);

window.addEventListener("scroll", function() {
  document.body.scrollTop > 600 || document.documentElement.scrollTop > 600 ? ttop.style.display = "block" : ttop.style.display = "none";
}, false);

window.addEventListener("DOMContentLoaded", function() {
  cate.selectedIndex = care.selectedIndex = city.selectedIndex = 0;
  nmbr.innerHTML = "(" + artl + "&nbsp;r\u00e9sultats)";
  window.localStorage.getItem("modale") || (impo.style.display = "block");
},false);
