// License CC BY-SA 4.0 Ann MB - ann-mb.carrd.co
const days = [null, "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
      months = [null, "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      calGrid = document.getElementById("cal-grid");
var allDays = document.getElementsByClassName("cal-curr"),
    eventsLength = events.length,
    allDaysLength,
    thisMonth,
    nowMonth;

function RightTime(a,m,j,h,min) {
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
  this.FirstDayOfMonthName = days[this.FirstDayOfMonth];
  let test2 = new Date(this.Year, this.Month, 0).getDay();
  this.LastDayOfMonth = (test2 == 0) ? 7 : test2;
  this.LastDayOfMonthName = days[this.LastDayOfMonth];
  this.DaysInWeekPrev = this.FirstDayOfMonth - 1;
  this.DaysInWeekNext = 7 - this.LastDayOfMonth;
}
function showDetails(a) {
  a = events[a.getAttribute("data-index")];
  document.getElementById("details-title").innerHTML = a.Title;
  document.getElementById("details-time").innerHTML = new getTimeText(a).DayRange + ' ' + (new getTimeText(a).LongHour || '');
  document.getElementById("details-place").innerHTML = a.Place || '';
  document.getElementById("details-link").innerHTML = a.Link ? ('<a href="'+ a.Link +'" rel="external noreferrer">'+a.Link+'</a>') : '';
  document.getElementById("details-desc").innerHTML = a.Desc.replace(/\[\[(.+?)\]\]/gi,"<a href=\"$1\" rel=\"external noreferrer\">$1</a>");; 
  document.getElementById("cal-details").style.bottom = "0";
}
function getTimeText(a) {
  var shorthour, longhour, dayrange;
  if (a.TimeStart) {
    if (a.TimeEnd) {
	  shorthour = "<b>"+a.TimeStart+" - "+a.TimeEnd+"</b><br/>";
	  longhour = "de " + a.TimeStart.split(":")[0] + "h" + a.TimeStart.split(":")[1] + " à " + a.TimeEnd.split(":")[0] + "h" + a.TimeEnd.split(":")[1];
	} else {
	  shorthour = "<b>"+a.TimeStart+"</b><br/>";
	  longhour = "à " + a.TimeStart.split(":")[0] + "h" + a.TimeStart.split(":")[1];
	}
  }
  if (a.DayEnd) {
    dayrange = "Du " + a.DayStart.split("/")[0] + " " + months[a.DayStart.split("/")[1]] + " " + a.DayStart.split("/")[2] + " au " + a.DayEnd.split("/")[0] + " " + months[a.DayEnd.split("/")[1]] + " " + a.DayEnd.split("/")[2]
  } else {
    dayrange = "Le " + a.DayStart.split("/")[0] + " " + months[a.DayStart.split("/")[1]] + " " + a.DayStart.split("/")[2];
  }
  this.ShortHour = shorthour;
  this.LongHour = longhour;
  this.DayRange = dayrange;
}
function generateEvents(a,m,j,day) {
  for (let i = 0 ; i < eventsLength ; i++) {
    var eventDate = events[i].DayStart.replace(/^0+/, ""),
        thisDate = j+"/"+m+"/"+a;
    if (eventDate == thisDate) {
      let evt = document.createElement("div");
      evt.className += " cal-event"; 
      evt.setAttribute("tabindex","0");
      evt.setAttribute("data-index",i)
      evt.addEventListener("click", function(){showDetails(this)});
      day.setAttribute("tabindex","0");
      day.setAttribute("aria-label", j + " " + months[m] + " " + a);
      day.setAttribute("role","gridcell");
      evt.innerHTML = (new getTimeText(events[i]).ShortHour || '') + events[i].Title;
      day.appendChild(evt);
    }
  }
}
function generateMonth(y,m) {
  var date = new RightTime(y,m),
      b = date.DaysInWeekPrev,
      f = nowMonth.Day;
  calGrid.innerHTML = "";
  calGrid.style.counterReset = "curr-days next-days prev-days " + (date.PrevMonthLength - b);
  document.getElementById("month-year").innerHTML = date.MonthName + ", " + date.Year;

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
  for (let i = 0; i < d ; i++) {
    let el = document.createElement("div");
    el.className += " cal-next";
    calGrid.appendChild(el)
  }
  allDaysLength = c;
}

function changeMonth(a) {
  var m = thisMonth.Month + a,
      y = thisMonth.Year;
  m == 13 && (m = 1, y++);
  m == 0 && (m = 12, y--);
  thisMonth = new RightTime(y,m);
  generateMonth(y,m);
}

document.getElementById("go-prev").addEventListener("click", function() {changeMonth(-1)});
document.getElementById("go-next").addEventListener("click", function() {changeMonth(+1)});
document.getElementById("details-exit").addEventListener("click", function() {
  document.getElementById("cal-details").style.bottom = "-100%"
});

window.addEventListener("DOMContentLoaded", function() {
  nowMonth = thisMonth = new RightTime();
  generateMonth();  
},false);
