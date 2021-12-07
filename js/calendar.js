const element = document.getElementById("calendar"),
  events = [{
      "Date": new Date(2021, 12, 09),
      "Title": "Festival Les Menstrueuses",
      "Link": "https://emf.fr/ec3_event/les-menstrueuses/",
      "Place":"Divers lieux, 86000 POITIERS",
      "Desc":"Les Menstrueuses, c'est une série d'événements avec des ateliers, des conférences et une journée d'étude pour parler des règles et de leur place dans nos vies<br/>🎟️ Gratuit | sur réservation<br/>Programme et réservation 👉 <a href=\"https://emf.fr/39000\">https://emf.fr/39000</a>"
    },
    {
      "Date": new Date(2021, 12, 09),
      "Time": ["14","00"],
      "Title": "« Fluctuations »",
      "Link": "",
      "Place":"Le Dietrich<br/>34, boulevard Chasseigne<br/>86000 POITIERS",
      "Desc":"Atelier drag king/queer proposé par Couteau Queer<br/>Expérimentation et transmission autour de la notion de performance de soi par la pratique du drag king/queer.<br/>Déconstruire la masculinité par le maquillage, le costume, l'exagération de la démarche ou des gestes.<br/>Réservation en envoyant à un message à : <a href=\"mailto:couteauqueer@protonmail.com\">couteauqueer@protonmail.com</a><br/><br/>19h : Projection de courts métrages autour du genre et de l’identité (entrée libre)<br/>* Tiresias de Alphée Carreau<br/>* Rois de Olivia Saunier<br/>* L'orage qui se dilate du collectif Fess'tins<br/><br/>Rencontres lectures et discussions avec les auteurices et le collectif Couteau Queer"
    },
    {
      "Date": new Date(2021, 12, 10),
      "Title": "Festival Les Menstrueuses",
      "Link": "https://emf.fr/ec3_event/les-menstrueuses/",
      "Place":"Divers lieux, 86000 POITIERS",
      "Desc":"Les Menstrueuses, c'est une série d'événements avec des ateliers, des conférences et une journée d'étude pour parler des règles et de leur place dans nos vies<br/>🎟️ Gratuit | sur réservation<br/>Programme et réservation 👉 <a href=\"https://emf.fr/39000\">https://emf.fr/39000</a>"
    },
    {
      "Date": new Date(2021, 12, 11),
      "Title": "Liberation Party + concert des Petites Lèvres ",
      "Time": ["21","00"],
      "Desc": "Concert des Petites Lèvres en soutien à l'association LAFL.",
      "Link": "https://www.facebook.com/events/587753229123100/",
      "Place": "Le ZINC<br/>196, Grand'rue<br/>86000 POITIERS"
    }
  ];

function Calendar(date) {
  this.Today = new Date();
  this.Selected = this.Today;
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();
  date && (this.Selected = date);
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();
  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay() - 1;
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();
  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
  0 == this.Selected.Month && (this.Prev = new Date(this.Selected.Year - 1, 11, 1))
  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
}

function createCalendar(calendar, adjuster) {
  if (typeof adjuster !== "undefined") {
    var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(newDate);
    element.innerHTML = "";
  }
  var mainSection = document.createElement("div");
  mainSection.className += "cld-main";

  function AddDateTime() {
    var datetime = document.createElement("div");
    datetime.className += "cld-datetime";
    var rwd = document.createElement("div");
    rwd.className += " cld-rwd cld-nav";
    rwd.addEventListener("click", function() {
      createCalendar(calendar, -1)
    });
    rwd.innerHTML = "&#x25C0";
    datetime.appendChild(rwd);
    var today = document.createElement("div");
    today.className += " today";
    const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    today.innerHTML = mois[calendar.Selected.Month] + ", " + calendar.Selected.Year;
    datetime.appendChild(today);
    var fwd = document.createElement("div");
    fwd.className += " cld-fwd cld-nav";
    fwd.addEventListener("click", function() {
      createCalendar(calendar, 1)
    });
    fwd.innerHTML = "&#x25B6;";
    datetime.appendChild(fwd);
    mainSection.appendChild(datetime)
  }

  function AddLabels() {
    var labels = document.createElement("div");
    labels.className = "cld-jours-labels";
    const jours = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    for (var i = 0; i < jours.length; i++) {
      var label = document.createElement("div");
      label.className += "cld-label";
      label.innerHTML = jours[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }

  function AddDays() {
    function DayNumber(n) {
      var number = document.createElement("div");
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement("div");
    days.className += "cld-days";

    // Previous Month's Days
    for (var i = 0; i < (calendar.Selected.FirstDay); i++) {
      var day = document.createElement("div"),
        number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i + 1));
      day.className += "cld-day prevMonth";
      day.appendChild(number);
      days.appendChild(day);
    }

    // Current Month's Days
    for (var i = 0; i < calendar.Selected.Days; i++) {
      var day = document.createElement("div"),
        number = DayNumber(i + 1);
      day.className += "cld-day currMonth";
      day.appendChild(number);

      // Check Date against Event Dates
      for (var n = 0; n < events.length; n++) {
        var evDate = events[n].Date,
            toDate = new Date(calendar.Selected.Year, calendar.Selected.Month + 1, (i + 1));
		  
        if (evDate.getTime() == toDate.getTime()) {
          number.className += " eventday";
          var title = document.createElement("div");
          title.setAttribute("data-index",n)
		      var hour = events[n].Time || void 0;
          if (hour) {
            if (hour.length == 2) {
              hour = '<span class="hour">'+hour[0]+':'+hour[1]+'</span><br/>'
            }
            if (hour.length == 4) {
              hour = '<span class="hour">'+hour[0]+':'+hour[1]+' - '+hour[2]+':'+hour[3]+'</span><br/>'
            }
          } else {
            hour = "";
          }
          
          title.className += "cld-event";
          title.innerHTML += hour + events[n].Title;
          day.appendChild(title);
        }
		  
      }
      if (((i + 1) == calendar.Today.getDate()) && (calendar.Selected.Month == calendar.Today.Month) && (calendar.Selected.Year == calendar.Today.Year)) {
        day.className += " today";
      }
      days.appendChild(day);
    }
    // Add Extra Days
    var c = (calendar.Selected.FirstDay == -1) ? 1 : 0,
      l = calendar.Selected.LastDay,
      extraDays;
    if (l + c !== 0 || l + c !== 7) {
      extraDays = 7 - l - c
    }
    for (var i = 0; i < extraDays; i++) {
      var day = document.createElement("div"),
          number = DayNumber(i + 1);
      day.className += "cld-day nextMonth";
      day.appendChild(number);
      days.appendChild(day);
    }
    mainSection.appendChild(days);
  }
  element.appendChild(mainSection);
  AddDateTime();
  AddLabels();
  AddDays();
}
createCalendar(new Calendar());