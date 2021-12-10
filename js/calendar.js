// Calendrier par Ann MB - Licence CC BY-SA 4.0 - ann-mb.carrd.co

var allDays = document.getElementsByClassName("cal-curr"),
    eventsLength = events.length, // see events.js file
    thisMonth,
    nowMonth,
    storeFocus;
const 
$ = (id) => { return document.getElementById(id) },
days = [null, "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
months = [null, "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
calGrid = $("cal-grid"),
details = $("cal-details"),
sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
},
correctHeight = () => {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh+"px");
};
RightTime = function(a,m,j,h,min) {
  if (!a && !m && !j && !h && !min) {
    this.Now = new Date();
  } else {
    !m && (m = 1);
    !j && (j = 1);
    !h && (h = 0);
    !min && (min = 0);
    this.Now = new Date(a, m-1, j, h, min);
  }
  this.Day = this.Now.getDate();
  this.DayInWeek = this.Now.getDay();
  this.DayInWeekName = days[this.DayInWeek];
  this.Year = this.Now.getFullYear();
  this.Month = this.Now.getMonth() + 1;
  this.MonthName = months[this.Month];
  this.MonthLength = new Date(this.Year, this.Month, 0).getDate();
  this.PrevMonthLength = new Date(this.Year, this.Month - 1, 0).getDate();
  let test1 = new Date(this.Year, this.Month - 1, 1).getDay();
  this.FirstDayOfMonth = (test1 == 0) ? 7 : test1;
  //this.FirstDayOfMonthName = days[this.FirstDayOfMonth];
  let test2 = new Date(this.Year, this.Month, 0).getDay();
  this.LastDayOfMonth = (test2 == 0) ? 7 : test2;
  //this.LastDayOfMonthName = days[this.LastDayOfMonth];
  this.DaysInWeekPrev = this.FirstDayOfMonth - 1;
  this.DaysInWeekNext = 7 - this.LastDayOfMonth;
},
showDetails = function(a,b) {
  a = events[a];
  $("details-title").innerHTML = a.Title;
  $("details-time").innerHTML = new getTimeText(a).DayRange + ' ' + (new getTimeText(a).LongHour || '');
  $("details-place").innerHTML = a.Place || '';
  $("details-link").innerHTML = a.Link ? ('<a href="'+ a.Link +'" rel="external noreferrer">'+a.Link+'</a>') : '';
  $("details-desc").innerHTML = a.Desc ? (a.Desc.replace(/\[\[(.+?)\]\]/gi,"<a href=\"$1\" rel=\"external noreferrer\">$1</a>")) : ''; 
  details.style.bottom = "0";
  details.setAttribute("aria-hidden","false");
  details.focus();
  storeFocus = b;
},
getTimeText = function(a) {
  if (a.TimeStart) {
    if (a.TimeEnd) {
      var s = a.TimeStart.split(":"), t = a.TimeEnd.split(":"),
          shorthour = "<b>"+a.TimeStart+" - "+a.TimeEnd+"</b><br/>",
          longhour = "de " + s[0] + "h" + s[1] + " à " + t[0] + "h" + t[1];
    } else {
      var s = a.TimeStart.split(":"),
          shorthour = "<b>"+a.TimeStart+"</b><br/>",
          longhour = "à " + a.TimeStart.split(":")[0] + "h" + a.TimeStart.split(":")[1];
    }
  }
  if (a.DayEnd) {
    var s = a.DayStart.split("/"), t = a.DayEnd.split("/"),
        dayrange = "Du " + s[0] + " " + months[s[1]] + " " + s[2] + " au " + t[0] + " " + months[t[1]] + " " + t[2]
  } else {
    var s = a.DayStart.split("/"),
        dayrange = "Le " + s[0] + " " + months[s[1]] + " " + s[2];
  }
  this.LongHour = longhour;
  this.DayRange = dayrange;
},
generateEvents = async function(a,m,j,day) {
  for (let i = eventsLength ; i--;) {
    var eventDate = events[i].DayStart,
        thisDate = j+"/"+m+"/"+a;
    if (eventDate == thisDate) {
      let evt = document.createElement("a");
      evt.className += " cal-event" + (events[i].Type ? (" evt-"+(events[i].Type).toLowerCase()) : "");
      evt.setAttribute("data-index", i);
      evt.setAttribute("href","#");
      evt.addEventListener("click", function(e){e.preventDefault();showDetails(i,this)});
      day.setAttribute("tabindex","0");
      day.setAttribute("aria-label", thisMonth.DayInWeekName + " " + j + " " + months[m] + " " + a);
      day.setAttribute("role","gridcell");
      var shorthour=events[i].TimeStart?events[i].TimeEnd?"<b>"+events[i].TimeStart+" - "+events[i].TimeEnd+"</b><br/>":"<b>"+events[i].TimeStart+"</b><br/>":"";
      evt.innerHTML = shorthour + events[i].Title;
      day.appendChild(evt);
    }
    await sleep(5)
  }
},
generateMonth = function(y,m) {
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
      v = (nowMonth.Year == date.Year) && (nowMonth.Month == date.Month);
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
changeMonth = function(a) {
  var m = thisMonth.Month + a,
      y = thisMonth.Year;
  m == 13 && (m = 1, y++);
  m == 0 && (m = 12, y--);
  thisMonth = new RightTime(y,m);
  generateMonth(y,m);
};

$("go-prev").addEventListener("click", function(e) {e.preventDefault();changeMonth(-1)},false);
$("go-next").addEventListener("click", function(e) {e.preventDefault();changeMonth(+1)},false);
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
},false);
window.addEventListener("resize", correctHeight);