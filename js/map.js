var map = L.map('mymap').setView([46.5829, 0.3531], 13);

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
var makeIcon = L.Icon.extend({
  options: {
    iconSize: [25, 41], // size of the icon
    iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
  }
});
var health = new makeIcon({
  iconUrl: "./img/marker-health.png"
});
var marker = new makeIcon({
  iconUrl: "./img/marker-icon.png"
});
var right = new makeIcon({
  iconUrl: "./img/marker-right.png"
});
var doctor = new makeIcon({
  iconUrl: "./img/marker-doc.png"
});
var acti = new makeIcon({
  iconUrl: "./img/marker-acti.png"
});
var host = new makeIcon({
  iconUrl: "./img/marker-host.png"
});
var sport = new makeIcon({
  iconUrl: "./img/marker-sport.png"
});
var testing = new makeIcon({
  iconUrl: "./img/marker-testing.png"
});


L.geoJson(geojson, {
  pointToLayer: function(feature, latlng) {
    let icon;
    switch (feature.properties.category) {
      case 'health':
        icon = health;
        break;
      case 'right':
        icon = right;
        break;
      case 'activism':
        icon = acti;
        break;
      case 'doctor':
        icon = doctor;
        break;
      case 'host':
        icon = host;
        break;
      case 'sport':
        icon = sport;
        break;
      case 'testing':
        icon = testing;
        break;
      default:
        icon = marker;
    }

    return L.marker(latlng, {
      icon: icon
    });

  },
  onEachFeature: popmaps
}).addTo(map);

map.fitBounds([
  [46.295713, -0.836334],
  [47.203709, 1.800385]
]);
// var mappos = L.Permalink.getMapLocation();