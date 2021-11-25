const mbox = document.getElementById("mapbox"),
      cate = document.getElementById("categories"),
      care = document.getElementById("caretakers"),
      city = document.getElementById("city"),
      carc = document.getElementById("careContainer"),
      nmbr = document.getElementById("numbr"),
	  impo = document.getElementById("important"),
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
        nmbr.innerHTML = 0 == nb ? "(aucun&nbsp;r&eacute;sultat)" : 1 == nb ? "(1&nbsp;r&eacute;sultat)" : "(" + nb + "&nbsp;r&eacute;sultats)";
      },
	  sAll = function(a)  {
        if (document.selection) {
          var range = document.body.createTextRange();
          range.moveToElementText(a);
          range.select();
        } else if (window.getSelection) {
          var range = document.createRange();
          range.selectNode(a);
          window.getSelection().addRange(range);
        }
      },
	  closeMap = function() {
		mbox.className = "mapbox";
        document.getElementById("exit").blur();
        stock.focus();
        stock = void 0;
	  }
var art = document.getElementsByTagName("article"),
    artl = art.length,
    stock,
	clicked;
document.addEventListener("click", function(e) {
  var t = e.target;
  if (t.className == "tomap") {
    mbox.className += " deploy";
    stock = t;
    document.getElementById("exit").focus();
  }
  if (t.className == "goto") {
    e.preventDefault();
    var trad = t.href.replace(/(.+)#([A-Za-z0-9]+)/,"$2"),
        elem = document.getElementById(trad);
	elem.style.display = "block";
	elem.scrollIntoView();
  }
  var a = t.closest("article");
  null !== a ? a !== clicked && (clicked = a) : clicked = null;
}, false);
document.getElementById("quitter").addEventListener("click", function() {
  impo.style.display = "none";
  window.localStorage.setItem("modale", true);
}, false);
document.getElementById("exit").addEventListener("click", closeMap, false);
care.addEventListener("change", sort, false);
city.addEventListener("change", sort, false);
cate.addEventListener("change", function() {
  "care" !== this.value ? (care.selectedIndex = 0, carc.style.display = "none") : (carc.style.display = "inline-block", care.focus());
  "phon" == this.value && (city.selectedIndex = 0);
  sort();
}, false);
window.addEventListener("scroll", function() {
  var ttop = document.getElementById("totop");
  document.body.scrollTop > 600 || document.documentElement.scrollTop > 600 ? ttop.style.display = "block" : ttop.style.display = "none";
}, false);
window.addEventListener("DOMContentLoaded", function() {
  cate.selectedIndex = care.selectedIndex = city.selectedIndex = 0;
  nmbr.innerHTML = "(" + artl + "&nbsp;r&eacute;sultats)";
  window.localStorage.getItem("modale") || (impo.style.display = "block");
},false);
document.addEventListener("keydown", function(e){
  var key = e.keyCode || e.which;
  if (clicked && true == e.ctrlKey && 65 == key) {
    e.preventDefault();
	null !== clicked && sAll(clicked);
  }
  if (27 == key) closeMap()
},false);