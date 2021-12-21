// Calendrier par Ann MB - Licence CC BY-SA 4.0 - ann-mb.carrd.co
class RightTime {
  ml = [null, 31, [28,29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  constructor(a,m,j,h,min) {
    0 !== arguments.length ? (!m && (m = 1), !j && (j = 1), !h && (h = 0), !min && (min = 0), 
    this.Now = new Date(a, m - 1, j, h, min)) : this.Now = new Date();
    this.Year = this.Now.getFullYear();
    this.Month = this.Now.getMonth() + 1;
    this.Day = this.Now.getDate();
    this.locale = navigator.languages != undefined ? navigator.languages[0] : navigator.language;
  }
  get Months() {
    var baseDate = new Date(1900,0); // just a January   
    var months = [null];
    for(var i = 1; i < 13; i++) {       
      months.push(baseDate.toLocaleDateString(this.locale, { month: 'long' }));
      baseDate.setMonth(i);   
    }
    Object.freeze(months);
    return months
  }
  get DaysOfWeek() {
    var baseDate = new Date(1900, 0, 1); // just a Monday
    var weekDays = [null];
    for(var i = 0; i < 7; i++) {       
      weekDays.push(baseDate.toLocaleDateString(this.locale, { weekday: 'long' }));
      baseDate.setDate(baseDate.getDate() + 1);       
    }
    Object.freeze(weekDays);
    return weekDays
  }
  get DayOfWeek() { return 0 == this.Now.getDay() ? 7 : this.Now.getDay() }
  get DayOfWeekName() { return this.DaysOfWeek[this.DayOfWeek] }
  get DayOfYear() { return Math.floor((this.Now - new Date(this.Year, 0, 0)) / 86400000) }
  get IsBissextile() { return ((this.Year % 4 === 0 && this.Year % 100 > 0) || (this.Year % 400 === 0)) ? 1 : 0 }
  get MonthName() { return this.Months[this.Month] }
  get MonthLength() { return this.Month == 2 ? this.ml[this.Month][this.IsBissextile] : this.ml[this.Month] }
  get PrevMonthLength() {return this.Month -1 == 0 ? 31 : this.Month -1 == 2 ? this.ml[this.Month - 1][this.IsBissextile] : this.ml[this.Month -1]}
  get FirstDayOfMonth() {
    let test1 = new Date(this.Year, this.Month - 1, 1).getDay();
    return (0 == test1) ? 7 : test1
  }
  get LastDayOfMonth() {
   let test2 = new Date(this.Year, this.Month, 0).getDay();
   return (0 == test2) ? 7 : test2
  }
  get DaysInWeekPrev() { return this.FirstDayOfMonth - 1 }
  get DaysInWeekNext() { return 7 - this.LastDayOfMonth }
  get Zodiac() {
    var m = this.Month;  
    return {
      get Emote() {
        return [null,"\u2652","\u2653","\u2648","\u2649","\u264A","\u264B","\u264C","\u264D","\u264E","\u264F","\u2650","\u2651"][m];
      },
      get Bound() {
        /* shifting from year to year, provide  an other method */
        return [null, 21, 20, 21, 21, 21, 22, 23, 23, 23, 23, 21, 20][m];
      },
      get Name() {
        return [null,"verseau","poissons","b\u00e9lier","taureau","g\u00e9meaux", "cancer","lion","vierge","balance","scorpion","sagittaire","capricorne"][m];
      }
    }
  }
  get Moon() {
    var x = this.Year, y = this.Month, z = this.Day;
    return {
      get Age() {
        var d = x, b = y, c = z;
        d = void 0 === d ? new Date() : new Date(d,b-1,c);
        var b = d.getTime();
        d = d.getTimezoneOffset();
        b = (b / 86400000 - d / 1440 - 10962.6) / 29.530588853;
        b -= Math.floor(b);
        0 > b && (b += 1);
        return 29.530588853 * b;
      },
      get NextFull() {
        return this.Age > 14.765294427 ? 44.29588328 - this.Age : 14.765294427 - this.Age
      },
      get NextNew() {
        return 29.530588853 - this.Age
      },
      get Number() {
       let mn = Math.round((this.Age * 8) / 29.530588853)
       return mn >= 8 ? 0 : mn
      },
      get Name() { 
        return ["Nouvelle Lune", "Premier Croissant", "Premier quartier", "Gibeuse ascendante", "Pleine Lune", "Gibeuse descendante", "Dernier Quartier", "Dernier Croissant"][this.Number]
      },
      get Emote() { 
        return ["\u{1F311}","\u{1F312}","\u{1F313}","\u{1F314}","\u{1F315}","\u{1F316}","\u{1F317}","\u{1F318}"][this.Number] 
      }
    }
  }
  get WeekOfYear() {
    var date = new Date(this.Year,this.Month-1,this.Day);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  ShiftDays = (n) => {
    let d = new Date(this.Year,this.Month-1,this.Day);
    d.setDate(d.getDate() + n);
    return new RightTime(d.getFullYear(), d.getMonth()+1, d.getDate())
  }
}
var nowMonth, thisMonth, evtL = evt.length, events = [], eventsLength, storeFocus, soonEvents = 0;
nowMonth = thisMonth = new RightTime();

const
$ = (id) => { return document.getElementById(id) },
calGrid = $("cal-grid"),
details = $("cal-details"),
//sleep = (m) => { return new Promise(r => setTimeout(r, m)) },
correctHeight = () => { document.documentElement.style.setProperty("--vh", (window.innerHeight * 0.01)+"px") },
exitDetails = (e) => {
  e.preventDefault();
  details.style.bottom = "-100%";
  details.setAttribute("aria-hidden","true");
  storeFocus.focus();
  storeFocus = void 0;
},
showDetails = (a,e) => {
  e.preventDefault();
  storeFocus = a;
  a = evt[a.getAttribute("data-index")];
  if (a.TimeStart) {
    if (a.TimeEnd) {
      var s = a.TimeStart.split(":"), t = a.TimeEnd.split(":"), longhour = "de " + s[0] + "h" + s[1] + " \u00e0 " + t[0] + "h" + t[1];
    } else {
      var s = a.TimeStart.split(":"), longhour = "\u00e0 " + a.TimeStart.split(":")[0] + "h" + a.TimeStart.split(":")[1];
    }
  }
  if (a.DayEnd) {
    var s = a.DayStart.split("/"), t = a.DayEnd.split("/"), dayrange = "Du " + s[0] + " " + thisMonth.Months[s[1]] + " " + s[2] + " au " + t[0] + " " + thisMonth.Months[t[1]] + " " + t[2]
  } else {
    var s = a.DayStart.split("/"), dayrange = "Le " + s[0] + " " + thisMonth.Months[s[1]] + " " + s[2];
  }
  $("details-title").innerHTML = a.Title;
  $("details-time").innerHTML = dayrange + ' ' + (longhour || '');
  $("details-place").innerHTML = a.Place || '';
  $("details-link").innerHTML = a.Link ? ('<a href="'+ a.Link +'" rel="external noreferrer">'+a.Link+'</a>') : '';
  $("details-desc").innerHTML = a.Desc ? (a.Desc.replace(/\[\[(.+?)\]\]/gi,"<a href=\"$1\" rel=\"external noreferrer\">$1</a>")) : ''; 
  details.style.bottom = "0";
  details.setAttribute("aria-hidden","false");
  details.focus();
},
generateMonth = (y,m) => {
  function generateEvents(a,m,j,d) {
    for (let i = eventsLength ; i--;) {
      var x = events[i], eventDate = x.DayStart, thisDate = j+"/"+m+"/"+a;
      if (eventDate == thisDate) {
        let evnt = document.createElement("a");
        d.setAttribute("tabindex","0");
        d.setAttribute("aria-label", thisMonth.DayOfWeekName + " " + j + " " + thisMonth.Months[m] + " " + a);
        d.setAttribute("role","gridcell");
        evnt.className += " cal-event" + (x.Type ? (" evt-"+x.Type) : "");
        x.DayEnd && x.pos && (evnt.className += " pos-" + x.pos);
        x.long && (evnt.className += " long long-"+x.long)
        evnt.setAttribute("data-index", x.index);
        evnt.setAttribute("href","#");
        evnt.addEventListener("click", function(e){showDetails(this,e)});
        evnt.innerHTML = (x.TimeStart ? x.TimeEnd ? "<b>"+x.TimeStart+" - "+x.TimeEnd+"</b><br/>" : "<b>"+x.TimeStart+"</b><br/>" : "") + '<div class="evt-title">'+x.Title+'</div>';
        d.appendChild(evnt);
      }
      //await sleep(5)
    }
  }
  var date = thisMonth, b = date.DaysInWeekPrev; 
  calGrid.innerHTML = "";
  calGrid.style.counterReset = "curr-days next-days prev-days " + (date.PrevMonthLength - b);
  $("month-year").innerHTML = date.MonthName + ", " + date.Year;
  document.title = "Calendrier - " + date.MonthName + ", " + date.Year;
  for (let i = 0; i < b ; i++) {
    let el = document.createElement("div");
    el.className += " cal-prev";
    calGrid.appendChild(el)
  }
  
  /** preshot moon **/
  var fullmoonday = Math.round(1 + new RightTime(date.Year, date.Month, 1).Moon.NextFull)
  var newmoonday = Math.round(1 + new RightTime(date.Year, date.Month, 1).Moon.NextNew)
  
  
  var c = date.MonthLength, v = nowMonth.Year == date.Year && nowMonth.Month == date.Month, f = nowMonth.Day;
  for (let i = 0; i < c ; i++) {
    let el = document.createElement("div");
    el.className += " cal-curr"; 
    (v && (i == f - 1)) && (el.className += " cal-today");
	  i == date.Zodiac.Bound - 1 && (el.className += " zod-"+date.Month)
    if (i == fullmoonday -1) { let el2 = document.createElement("div"); el2.className = "moon full"; el2.innerHTML = "\u{1F315}"; el.appendChild(el2) }
    if (i == newmoonday -1) { let el2 = document.createElement("div"); el2.className = "moon"; el2.innerHTML = "\u{1F311}" ;el.appendChild(el2)}
    /** moon **/
    
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
  var m = thisMonth.Month + a, y = thisMonth.Year;
  13 == m && (m = 1, y++);
  0 == m && (m = 12, y--);
  thisMonth = new RightTime(y,m);
  generateMonth(y,m);
};

for (var i = 0 ; i < evtL; i++) {
  var start = evt[i].DayStart.split("/");
  if (evt[i].DayEnd) {
    var end = evt[i].DayEnd.split("/")[0],
        duration = end - start[0] + 1;  
    for (var j = 0 ; j < duration ; j++) {
      var newe = Object.assign({}, evt[i])
	    newe.DayStart = end - j + "/" + start[1] + "/" + start[2];
	    newe.pos = newe.DayStart==evt[i].DayStart?"s":newe.DayStart==evt[i].DayEnd?"e":"m";
      1 == (new RightTime(start[2],start[1],end-j).DayOfWeek) && (newe.long = 1) // too much recursions
      newe.index = i;
      events.push(newe);
    }
  }	else {
    var newe = Object.assign({}, evt[i])
    newe.index = i;
	  events.push(newe)
  }
  if (start[1] == nowMonth.Month && start[2] == nowMonth.Year && start[0] >= nowMonth.Day) {
    soonEvents++
  }
  if (i == evtL - 1) {
    eventsLength = events.length;
    generateMonth(nowMonth.Year,nowMonth.Month);
  }
}

window.addEventListener("DOMContentLoaded", function(){
  correctHeight();  
  $("go-prev").addEventListener("click", function(e) {changeMonth(-1,e)},!1);
  $("go-next").addEventListener("click", function(e) {changeMonth(1,e)},!1);
  $("details-exit").addEventListener("click", function(e) { exitDetails(e) });
  ($("incoming") && soonEvents > 0) && ($("incoming").innerHTML = soonEvents);
  $("noscript") && ($("noscript").style.display = "none");
});
window.addEventListener("resize", correctHeight);