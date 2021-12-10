// Calendrier par Ann MB - Licence CC BY-SA 4.0 - ann-mb.carrd.co

var 
allDays = document.getElementsByClassName("cal-curr"),
eventsLength = events.length, //voir events.js
thisMonth,
nowMonth,
storeFocus;
const 
$ = (id) => { return document.getElementById(id) },
days = [null, "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
months = [null, "janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"],
calGrid = $("cal-grid"),
details = $("cal-details"),
sleep = (ms) => {
  return new Promise(r => setTimeout(r, ms));
},
correctHeight = () => {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh+"px");
},
RightTime = function(a,m,j,h,min) {
  a || m || j || h || min ? (!m && (m = 1), !j && (j = 1), !h && (h = 0), !min && (min = 0), this.Now = new Date(a, m - 1, j, h, min)) : this.Now = new Date();
  this.Day = this.Now.getDate();
  this.DayInWeek = this.Now.getDay();
  this.DayInWeekName = days[this.DayInWeek];
  this.Year = this.Now.getFullYear();
  this.Month = this.Now.getMonth() + 1;
  this.MonthName = months[this.Month];
  this.MonthLength = new Date(this.Year, this.Month, 0).getDate();
  this.PrevMonthLength = new Date(this.Year, this.Month - 1, 0).getDate();
  let test1 = new Date(this.Year, this.Month - 1, 1).getDay();
  this.FirstDayOfMonth = (0 == test1) ? 7 : test1;
  let test2 = new Date(this.Year, this.Month, 0).getDay();
  this.LastDayOfMonth = (0 == test2) ? 7 : test2;
  this.DaysInWeekPrev = this.FirstDayOfMonth - 1;
  this.DaysInWeekNext = 7 - this.LastDayOfMonth;
},
showDetails = (a,b) => {
  a = events[a];
  if (a.TimeStart) {
    if (a.TimeEnd) {
      var s = a.TimeStart.split(":"), t = a.TimeEnd.split(":"), longhour = "de " + s[0] + "h" + s[1] + " \u00e0 " + t[0] + "h" + t[1];
    } else {
      var s = a.TimeStart.split(":"), longhour = "\u00e0 " + a.TimeStart.split(":")[0] + "h" + a.TimeStart.split(":")[1];
    }
  }
  if (a.DayEnd) {
    var s = a.DayStart.split("/"), t = a.DayEnd.split("/"), dayrange = "Du " + s[0] + " " + months[s[1]] + " " + s[2] + " au " + t[0] + " " + months[t[1]] + " " + t[2]
  } else {
    var s = a.DayStart.split("/"), dayrange = "Le " + s[0] + " " + months[s[1]] + " " + s[2];
  }
  $("details-title").innerHTML = a.Title;
  $("details-time").innerHTML = dayrange + ' ' + (longhour || '');
  $("details-place").innerHTML = a.Place || '';
  $("details-link").innerHTML = a.Link ? ('<a href="'+ a.Link +'" rel="external noreferrer">'+a.Link+'</a>') : '';
  $("details-desc").innerHTML = a.Desc ? (a.Desc.replace(/\[\[(.+?)\]\]/gi,"<a href=\"$1\" rel=\"external noreferrer\">$1</a>")) : ''; 
  details.style.bottom = "0";
  details.setAttribute("aria-hidden","!1");
  details.focus();
  storeFocus = b;
},
generateEvents = async (a,m,j,day) => {
  for (let i = eventsLength ; i--;) {
    var x = events[i],
        eventDate = x.DayStart,
        thisDate = j+"/"+m+"/"+a;
    if (eventDate == thisDate) {
      let evt = document.createElement("a");
      evt.className += " cal-event" + (x.Type ? (" evt-"+(x.Type).toLowerCase()) : "");
      evt.setAttribute("data-index", i);
      evt.setAttribute("href","#");
      evt.addEventListener("click", function(e){e.preventDefault();showDetails(i,this)});
      day.setAttribute("tabindex","0");
      day.setAttribute("aria-label", thisMonth.DayInWeekName + " " + j + " " + months[m] + " " + a);
      day.setAttribute("role","gridcell");
      var shorthour = x.TimeStart ? x.TimeEnd ? "<b>"+x.TimeStart+" - "+x.TimeEnd+"</b><br/>" : "<b>"+x.TimeStart+"</b><br/>" : "";
      evt.innerHTML = shorthour + x.Title;
      day.appendChild(evt);
    }
    await sleep(5)
  }
},
generateMonth = (y,m) => {
  var date = new RightTime(y,m),
      b = date.DaysInWeekPrev,
      f = nowMonth.Day;
  calGrid.innerHTML = "";
  calGrid.style.counterReset = "curr-days next-days prev-days " + (date.PrevMonthLength - b);
  $("month-year").innerHTML = date.MonthName + ", " + date.Year;
  document.title = "Calendrier - " + date.MonthName + ", " + date.Year;
  for (let i = 0; i < b ; i++) {
    let el = document.createElement("div");
    el.className += " cal-prev";
    calGrid.appendChild(el)
  }
  var c = date.MonthLength,
      v = nowMonth.Year == date.Year && nowMonth.Month == date.Month;
  for (let i = 0; i < c ; i++) {
    let el = document.createElement("div");
    el.className += " cal-curr"; 
    (v && (i == f - 1)) && (el.className += " cal-today")
    generateEvents(thisMonth.Year,thisMonth.Month,i+1,el);
    calGrid.appendChild(el)
  }
  var d = date.DaysInWeekNext;
  for (let i = 0 ; i < d ; i++) {
    let el = document.createElement("div");
    el.className += " cal-next";
    calGrid.appendChild(el)
  }
},
changeMonth = (a,e) => {
  e.preventDefault();
  var m = thisMonth.Month + a,
      y = thisMonth.Year;
  13 == m && (m = 1, y++);
  0 == m && (m = 12, y--);
  thisMonth = new RightTime(y,m);
  generateMonth(y,m);
};

$("go-prev").addEventListener("click", function(e) {changeMonth(-1,e)},!1);
$("go-next").addEventListener("click", function(e) {changeMonth(1,e)},!1);
$("details-exit").addEventListener("click", function(e) {
  e.preventDefault();
  details.style.bottom = "-100%";
  details.setAttribute("aria-hidden","true");
  storeFocus.focus();
  storeFocus = void 0;
});

window.addEventListener("DOMContentLoaded", function() {
  nowMonth = thisMonth = new RightTime();
  generateMonth();
  correctHeight();
  $("noscript").style.display = "none";
},!1);
window.addEventListener("resize", correctHeight);