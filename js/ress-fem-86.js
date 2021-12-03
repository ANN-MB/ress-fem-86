/* License CC BY-SA 4.0 Ann MB - ann-mb.carrd.co */
var art = document.getElementsByTagName("article"),
    dark = window.localStorage.getItem("darktheme"),
    artl = art.length,
    stock, clicked, masonry;
const mbox = document.getElementById("mapbox"),
      cate = document.getElementById("categories"),
      care = document.getElementById("caretakers"),
      city = document.getElementById("city"),
      carc = document.getElementById("careContainer"),
      nmbr = document.getElementById("numbr"),
      impo = document.getElementById("important"),
      them = document.getElementById("theme"),
      alph = document.getElementById("alph-cont"),
      exit = document.getElementById("exit"),
      chkb = document.getElementById("toggle-checkbox"),
      sort = function() {
        alph.style.display = 0 !== cate.selectedIndex || 0 !== care.selectedIndex || 0 !== city.selectedIndex ? "none" : "inline-block";
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
        masonry && masonry.recalculate(!0, !0);
      },
      selectAll = function(a) {
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
        exit.blur();
        stock.focus();
        stock = void 0;
      },
      goTo = function(t) {
        var elem = document.querySelector(t.getAttribute("href"));
        elem.style.display = "block";
        elem.scrollIntoView({behavior:"smooth"});
      };
   
document.addEventListener("click", function(e) {
  var t = e.target, a = t.closest("article");
  t == exit && closeMap();
  t == chkb && (chkb.checked ? (them.href = "css/dark.css", window.localStorage.setItem("darktheme", "css/dark.css")) : (them.href = "css/light.css", window.localStorage.setItem("darktheme", "css/light.css")));
  t.id == "quitter" && (impo.style.display = "none", window.localStorage.setItem("modale", !0));
  t.id == "totop" && (e.preventDefault(), document.querySelector("header").scrollIntoView({behavior:"smooth"}));
  t.className == "tomap" && (e.preventDefault(), document.getElementById("mymap").src = t.href, mbox.className += " deploy", stock = t, exit.focus());
  t.className == "goto" && (e.preventDefault(),  goTo(t));
  null !== a ? a !== clicked && (clicked = a) : clicked = null;
}, false);

document.addEventListener("change", function(e) {
  var t = e.target;
  t != care && t != city || sort();
  t == cate && ("care" !== cate.value ? (care.selectedIndex = 0, carc.style.display = "none") : (carc.style.display = "inline-block", care.focus()), "phon" == cate.value && (city.selectedIndex = 0), sort());
  t == document.getElementById("alph") && (document.getElementById(e.target.value).scrollIntoView({behavior:"smooth"}), e.target.selectedIndex = 0);
}, !1);

document.getElementById("container").addEventListener("scroll", function() {
  var ttop = document.getElementById("totop");
  this.scrollTop > 600 ? ttop.style.display = "block" : ttop.style.display = "none";
}, false);

document.addEventListener("keydown", function(e){
  var key = e.keyCode || e.which;
  if (clicked && true == e.ctrlKey && 65 == key) {
    e.preventDefault();
    null !== clicked && selectAll(clicked);
  }
  27 == key && closeMap();
},false);

window.addEventListener("DOMContentLoaded", function() {
  cate.selectedIndex = care.selectedIndex = city.selectedIndex = alph.selectedIndex = 0;
  nmbr.innerHTML = "(" + artl + "&nbsp;r&eacute;sultats)";
  window.localStorage.getItem("modale") || (impo.style.display = "block");
  null !== dark && ("css/dark.css" == dark ? (chkb.checked = !0, them.href = "css/dark.css") : (chkb.checked = !1, them.href = "css/light.css"));
  if((!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) && 600 < window.innerWidth) {
    masonry = new Macy({
        container: "main",
        mobileFirst: true,
        columns: 3,
        margin: {y: 20, x: 20},
        breakAt: {1500: 3, 940: 2, 520: 1}
    });
    document.querySelector("main").style.maxWidth = "90vw";
    document.querySelector("main").style.margin = "0 auto";
  }
},false);