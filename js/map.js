var map = L.map('mymap', {
  zoomSnap: 0.5
}).fitBounds([
  [46.19709708576172, -0.9106632928479332],
  [47.05997975442446, 1.7422818877878934]
]).setView([46.63025794928896, 0.41580929746996015], 9.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 9
}).addTo(map);

L.Map = L.Map.extend({
  openPopup: function(popup) {
    this.closePopup();
    this._popup = popup;
    return this.addLayer(popup).fire('popupopen', {
      popup: this._popup
    });
  }
});

var popmaps = function(feature, layer) {
  var prop = feature.properties,
    popUp = "<h2>" + prop.title + "</h2>" +
    "<div class=\"desc\">" + (prop.description || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>") + "</div>" +
    "<div class=\"num\">" + (prop.phone || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>").replace(/(?:\+33|0)([0-9 ]+)/g, "<a href=\"tel:+33$1\">0$1</a>").replace(/0([0-9])([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/g, "0$1 $2 $3 $4 $5") + "</div>" +
    "<div class=\"mail\">" + (prop.email || "").replace(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi, "<a href=\"mailto:$1\">$1</a>") + "</div>" +
    "<div class=\"web\">" + (prop.url || "").replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi, "<a href=\"$1\">$1</a>") + "</div>" +
    "<div class=\"loc\">" + (prop.address || "") + "</div>" +
    "<div class=\"bus\">" + (prop.bus || "") + "</div>" +
    "<div class=\"park\">" + (prop.park || "") + "</div>" +
    "<div class=\"acc\">" + (prop.accessible || "") + "</div>" +
    "<div class=\"fb\">" + (prop.facebook || "").replace(/(?:https?:\/\/www\.facebook\.com\/)?@?([a-zé_0-9-.]+)\/?/gi, "<a href=\"https://www.facebook.com/$1\">@$1</a>") + "</div>" +
    "<div class=\"tw\">" + (prop.twitter || "").replace(/(?:https?:\/\/www\.twitter\.com\/)?@?([a-z_0-9-.]+)\/?/gi, "<a href=\"https://www.twitter.com/$1\">@$1</a>") + "</div>" +
    "<div class=\"ig\">" + (prop.instagram || "").replace(/(?:https?:\/\/www\.instagram\.com\/)?@?([a-z_0-9-.]+)\/?/gi, "<a href=\"https://www.instagram.com/$1\">@$1</a>") + "</div>" +
    "<div class=\"yt\">" + (prop.youtube || "") + "</div>" +
    "<div class=\"sc\">" + (prop.soundcloud || "") + "</div>" +
    "<div class=\"prix\">" + (prop.prix || "") + "</div>" +
    "<div class=\"conv\">" + (prop.conv || "") + "</div>" +
    "<div class=\"lng\">" + (prop.language || "") + "</div>" +
    "<div class=\"info\">" + (prop.info || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>") + "</div>" +
    "<div class=\"avis\">" + (prop.avis || "").replace(/\[\[(.+?)\|(.+?)\]\]/gi, "<a href=\"$1\">$2</a>") + "</div>";
  layer.bindPopup(String(popUp));
}

var main = L.geoJson(geojson, {
  pointToLayer: function(feature, latlng) {
    var icon = L.divIcon({
      iconSize: [35, 35],
      iconAnchor: [17, 35],
      className: 'm-' + (feature.properties.category || "default"),
      popupAnchor: [0, 0],
      html: '<div class="marker-pin"></div>'
    });
    return L.marker(latlng, {
      icon: icon,
      riseOnHover: true
    });
  },
  onEachFeature: popmaps
}).addTo(map);

/*https://www.datavis.fr/index.php?page=leaflet-firstmap*/

var cats = [];

function getCat(cats, cat) {
  for (var i = cats.length; i--;) {
    if (cats[i]["label"] === cat) {
      return cats[i];
    }
  }
  return;
}
for (var i = 0; i < geojson.length; i++) {
  var cat = getCat(cats, geojson[i].properties.category);
    
  if (cat === undefined) {
    cat = {
      "id": "m-"+geojson[i].properties.category,
      "label": geojson[i].properties.category
    }
    cats.push(cat);
  }
}

/** add menu */
var command = L.control({position: 'topright'});
command.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'command');
  div.innerHTML += '<h4>Filtre</h4>';
  for (var i = 0; i < cats.length; i++) {
    div.innerHTML += '<div><input id="' + cats[i]["id"] + '" type="checkbox" class="chk-filter" checked />' + cats[i]["label"] + '</div>';
  }
  return div;
};
command.addTo(map);

/* add events to all checkbox */
document.addEventListener("click", function(e){
  if (e.target.className == "chk-filter") {
     var el = document.getElementsByClassName(e.target.id),
         ell = el.length;
    if (e.target.checked) {
      [...el].forEach(x => (x.style.display = "block"));
    } else {
      [...el].forEach(x => (x.style.display = "none"));
    }
  }
}, false);