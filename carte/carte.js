var map = L.map('mymap', {
  zoomSnap: 0.5
}).setView([46.63025794928896, 0.41580929746996015], 9.5);

var 
light = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 9.5,
  maxZoom: 18
}),
dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  minZoom: 9,
  maxZoom: 18
});
  
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  dark.addTo(map);
} else {
  light.addTo(map);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
  var newC = e.matches ? "dark" : "light",
      oldC = e.matches ? "light" : "dark";
  map.removeLayer(window[oldC]);
  map.addLayer(window[newC]);
});


var popmaps = function(feature, layer) {
  var prop = feature.properties,
    popUp = "<h2>" + prop.title + "</h2>" +
    "<div class=\"desc\">" + (prop.description || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>") + "</div>" +
    "<div class=\"num\">" + (prop.phone || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>").replace(/(?:\+33|0)([0-9 ]{3,})/g, "<a href=\"tel:+33$1\">0$1</a>").replace(/0([0-9])([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/g, "0$1 $2 $3 $4 $5") + "</div>" +
    "<div class=\"mail\">" + (prop.email || "").replace(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi, "<a href=\"mailto:$1\">$1</a>") + "</div>" +
    "<div class=\"web\">" + (prop.url || "").replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi, "<a href=\"$1\">$1</a>") + "</div>" +
    "<div class=\"loc\">" + (prop.address || "") + "</div>" +
    "<div class=\"bus\">" + (prop.bus || "") + "</div>" +
    "<div class=\"park\">" + (prop.park || "") + "</div>" +
    "<div class=\"acc\">" + (prop.accessible || "") + "</div>" +
    "<div class=\"fb\">" + (prop.facebook || "").replace(/(?:https?:\/\/www\.facebook\.com\/)?@?([a-zé_0-9-.]+)\/?/gi, "<a href=\"https://www.facebook.com/$1\">@$1</a>") + "</div>" +
    "<div class=\"tw\">" + (prop.twitter || "").replace(/(?:https?:\/\/www\.twitter\.com\/)?@?([a-z_0-9-.]+)\/?/gi, "<a href=\"https://www.twitter.com/$1\">@$1</a>") + "</div>" +
    "<div class=\"ig\">" + (prop.instagram || "").replace(/(?:https?:\/\/www\.instagram\.com\/)?@?([a-z_0-9-.]+)\/?/gi, "<a href=\"https://www.instagram.com/$1\">@$1</a>") + "</div>" +
    "<div class=\"yt\">" + (prop.youtube || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>") + "</div>" +
    "<div class=\"sc\">" + (prop.soundcloud || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>") + "</div>" +
    "<div class=\"prix\">" + (prop.prix || "") + "</div>" +
    "<div class=\"conv\">" + (prop.conv || "") + "</div>" +
    "<div class=\"lng\">" + (prop.language || "") + "</div>" +
    "<div class=\"info\">" + (prop.info || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>") + "</div>" +
    "<div class=\"avis\">" + (prop.avis || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>") + "</div>";
  layer.bindPopup(String(popUp));
},
main = L.geoJson(geojson, {
  pointToLayer: function(feature, latlng) {
    var icon = L.divIcon({
      iconSize: [35,35],
      iconAnchor: [17,35],
      className: 'm-' + (feature.properties.category || "default"),
      popupAnchor: [0,0],
      html: '<div class="marker-pin"></div><div class="shadow"></div>'
    });
    return L.marker(latlng, {
      icon: icon,
      riseOnHover: true
    });
  },
  onEachFeature: popmaps
}).addTo(map);

map.fitBounds(main.getBounds());

var command = L.control({position: 'topright'});

command.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'command');
  div.innerHTML += '<h3>Filtrer</h3>'
  + '<label for="exit-command" class="lab"><input type="checkbox" id="exit-command" /></label>'
  + '<label for="m-menses"><input id="m-menses" type="checkbox" class="chk-filter" checked />Boîtes à don menstruelles</label>'
  + '<label for="m-host"><input id="m-host" type="checkbox" class="chk-filter" checked />Hébergement</label>'
  + '<label for="m-testing"><input id="m-testing" type="checkbox" class="chk-filter" checked />Dépistage IST</label>'
  + '<label for="m-doctor"><input id="m-doctor" type="checkbox" class="chk-filter" checked />Soignant&middot;es</label>'
  + '<label for="m-sport"><input id="m-sport" type="checkbox" class="chk-filter" checked />Sport</label>'
  + '<label for="m-activism"><input id="m-activism" type="checkbox" class="chk-filter" checked />Militer</label>'
  + '<label for="m-health"><input id="m-health" type="checkbox" class="chk-filter" checked />Santé</label>'
  + '<label for="m-culture"><input id="m-culture" type="checkbox" class="chk-filter" checked />Culturel</label>'
  + '<label for="m-support"><input id="m-support" type="checkbox" class="chk-filter" checked />Groupe de parole</label>'
  + '<label for="m-official"><input id="m-official" type="checkbox" class="chk-filter" checked />Élues</label>'
  + '<label for="m-solidarity"><input id="m-solidarity" type="checkbox" class="chk-filter" checked />Solidarité</label>'
  + '<label for="m-right"><input id="m-right" type="checkbox" class="chk-filter" checked />Droit & Justice</label>'
  return div;
};
command.addTo(map);
const addStyles = (el, styles) => Object.assign(el.style, styles);
/* add events to all checkbox */
document.addEventListener("click", function(e){
  if (e.target.className == "chk-filter") {
     var el = document.getElementsByClassName(e.target.id);
    if (e.target.checked) {
      [...el].forEach(x => (x.style.display = "block"));
    } else {
      [...el].forEach(x => (x.style.display = "none"));
    }
  }
  if (e.target.id == "exit-command") {
    document.querySelector(".command").classList.toggle("hide")
    document.querySelector(".lab").classList.toggle("down")
  }
}, false);