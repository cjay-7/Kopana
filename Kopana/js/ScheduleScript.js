!(function () {
  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.events.forEach(function (ev) {
      ev.date = moment(ev.date);
    });
    this.draw();
    var current = document.querySelector(".today");
    if (current) {
      var self = this;
      window.setTimeout(function () {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function () {
    this.drawLegend();
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();
  };

  Calendar.prototype.drawLegend = function () {
    var legend = createElement("div", "legend");
    var calendars = this.events
      .map(function (e) {
        return e.calendar + "|" + e.color;
      })
      .reduce(function (memo, e) {
        if (memo.indexOf(e) === -1) {
          memo.push(e);
        }
        return memo;
      }, [])
      .forEach(function (e) {
        var parts = e.split("|");
        var entry = createElement("span", "entry " + parts[1], parts[0]);
        legend.appendChild(entry);
      });
    this.el.appendChild(legend);
  };

  Calendar.prototype.drawHeader = function () {
    var self = this;
    if (!this.header) {
      //Create the header elements
      this.header = createElement("div", "header");
      this.header.className = "header";

      this.title = createElement("h1");
      this.title.addEventListener("click", function () {
        self.curMonth();
      });

      var right = createElement("div", "right");
      right.addEventListener("click", function () {
        self.nextMonth();
      });

      var left = createElement("div", "left");
      left.addEventListener("click", function () {
        self.prevMonth();
      });

      //Append the Elements
      this.header.appendChild(this.title);
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format("MMMM YYYY");
  };

  Calendar.prototype.drawMonth = function () {
    var self = this;

    // this.events.forEach(function (ev) {
    //   ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
    // });

    if (this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = "month out " + (self.next ? "next" : "prev");
      this.oldMonth.addEventListener("webkitAnimationEnd", function () {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement("div", "month");
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function () {
          self.month.className = "month in " + (self.next ? "next" : "prev");
        }, 16);
      });
    } else {
      this.month = createElement("div", "month");
      this.el.appendChild(this.month);
      this.backFill();
      this.currentMonth();
      this.fowardFill();
      this.month.className = "month new";
    }
  };

  Calendar.prototype.backFill = function () {
    var clone = this.current.clone();
    var dayOfWeek = clone.day() - 1;

    if (dayOfWeek == -1) dayOfWeek = 6;

    if (!dayOfWeek) {
      return;
    }

    clone.subtract("days", dayOfWeek + 1);

    for (var i = dayOfWeek; i > 0; i--) {
      this.drawDay(clone.add("days", 1));
    }
  };

  Calendar.prototype.fowardFill = function () {
    var clone = this.current.clone().add("months", 1).subtract("days", 1);
    var dayOfWeek = clone.day();

    if (dayOfWeek === 7) {
      return;
    }

    for (var i = dayOfWeek; i < 7; i++) {
      this.drawDay(clone.add("days", 1));
    }
  };

  Calendar.prototype.currentMonth = function () {
    var clone = this.current.clone();

    while (clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add("days", 1);
    }
  };

  Calendar.prototype.getWeek = function (day) {
    if (!this.week || day.day() === 1) {
      this.week = createElement("div", "week");
      this.month.appendChild(this.week);
    }
  };

  Calendar.prototype.drawDay = function (day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    // var clickState = 0;
    var outer = createElement("div", this.getDayClass(day));
    outer.addEventListener("click", function () {
      // if (this.classList.contains("active")) {
      //   self.closeDay(this);
      // } else {
      self.openDay(this);
      // }
      // var thisday = this.querySelector(".day-fullname").innerHTML;

      // return thisday;
    });

    //Day Name
    var name = createElement("div", "day-name", day.format("ddd"));
    var dayName = createElement("div", "day-fullname", day.format("dddd"));
    var dayMonth = createElement("div", "day-month", day.format("MMMM"));
    //Day Number
    var number = createElement("div", "day-number", day.format("DD"));

    //Events
    var events = createElement("div", "day-events");
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(dayName);
    outer.appendChild(dayMonth);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  };

  Calendar.prototype.drawEvents = function (day, element) {
    if (day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function (memo, ev) {
        if (ev.date.isSame(day, "day")) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function (ev) {
        var evSpan = createElement("span", ev.color);
        element.appendChild(evSpan);
      });
    }
  };

  Calendar.prototype.getDayClass = function (day) {
    classes = ["day"];
    if (day.month() !== this.current.month()) {
      classes.push("other");
    } else if (today.isSame(day, "day")) {
      classes.push("today");
    }
    return classes.join(" ");
  };
  // Calendar.prototype.closeDay = function (el) {
  //   // var details, arrow;
  //   // var dayNumber = +el.querySelectorAll(".day-number")[0].innerText || +el.querySelectorAll(".day-number")[0].textContent;
  //   // var day = this.current.clone().date(dayNumber);
  //   var daysActive = document.querySelectorAll(".day.active");

  //   [].forEach.call(daysActive, function (i) {
  //     i.classList.remove("active");
  //   });
  //   var currentOpened = document.querySelector(".details");

  //   if (currentOpened) {
  //     currentOpened.addEventListener("webkitAnimationEnd", function () {
  //       currentOpened.parentNode.removeChild(currentOpened);
  //     });
  //     currentOpened.addEventListener("oanimationend", function () {
  //       currentOpened.parentNode.removeChild(currentOpened);
  //     });
  //     currentOpened.addEventListener("msAnimationEnd", function () {
  //       currentOpened.parentNode.removeChild(currentOpened);
  //     });
  //     currentOpened.addEventListener("animationend", function () {
  //       currentOpened.parentNode.removeChild(currentOpened);
  //     });
  //     currentOpened.className = "details out";
  //   }
  // };

  Calendar.prototype.openDay = function (el) {
    var details;
    var dayNumber =
      +el.querySelectorAll(".day-number")[0].innerText ||
      +el.querySelectorAll(".day-number")[0].textContent;

    var dayFullName = el.querySelector(".day-fullname").innerText;
    var dayMonth = el.querySelector(".day-month").innerText;

    var day = this.current.clone().date(dayNumber);

    var currentDay = createElement("div", "currentDay");
    var currentDayName = createElement("h3", "currentDayName");
    currentDayName.innerHTML = dayFullName;
    var currentDayNumber = createElement("h1", "currentDayNumber");
    currentDayNumber.innerHTML = dayNumber;
    var currentDayMonth = createElement("h2", "currentDayMonth");
    currentDayMonth.innerHTML = dayMonth;
    currentDay.appendChild(currentDayName);
    currentDay.appendChild(currentDayNumber);
    currentDay.appendChild(currentDayMonth);
    // [].forEach.call(daysActive, function (i) {
    //   i.classList.remove("active");
    // });
    // el.classList.add("active");

    var currentOpened = document.querySelector(".details");

    //Check to see if there is an open detais box on the current row
    if (currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if (currentOpened) {
        currentOpened.addEventListener("webkitAnimationEnd", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("oanimationend", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("msAnimationEnd", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("animationend", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = "details out";
      }

      //Create the Details Container
      details = createElement("div", "details in");

      //Create the event wrapper
      var calendarContainer = document.querySelector(".calendar-container");

      // var screenwidth = window.screen.width;

      // console.log(screenwidth);
      // if (screenwidth > 425) {
      calendarContainer.appendChild(details);
      details.appendChild(currentDay);
      // } else if (screenwidth < 425) {
      //   el.parentNode.appendChild(details);
      //   details.appendChild(currentDay);
      // }
    }

    var todaysEvents = this.events.reduce(function (memo, ev) {
      if (ev.date.isSame(day, "day")) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);
  };

  Calendar.prototype.renderEvents = function (events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector(".events");
    var wrapper = createElement(
      "div",
      "events in" + (currentWrapper ? " new" : "")
    );

    events.forEach(function (ev) {
      var div = createElement("div", "event");
      var square = createElement("div", "event-category " + ev.color);
      var span = createElement("span", "", ev.eventName);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if (!events.length) {
      var div = createElement("div", "event empty");
      var span = createElement("span", "", "No Events");

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if (currentWrapper) {
      currentWrapper.className = "events out";
      currentWrapper.addEventListener("webkitAnimationEnd", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("oanimationend", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("msAnimationEnd", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("animationend", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  };

  Calendar.prototype.nextMonth = function () {
    this.current.add("months", 1);
    this.next = true;
    this.draw();
  };

  Calendar.prototype.prevMonth = function () {
    this.current.subtract("months", 1);
    this.next = false;
    this.draw();
  };
  Calendar.prototype.curMonth = function () {
    this.current = moment().date(1);
    this.draw();
  };

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if (className) {
      ele.className = className;
    }
    if (innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
})();

!(function () {
  var data = [
    {
      eventName: "U4's",
      calendar: "U4's",
      color: "orange",
      date: "2022-03-08",
    },

    {
      eventName: "U6's",
      calendar: "U6's",
      color: "blue",
      date: "2022-09-28",
    },

    {
      eventName: "U8's / U10's / U12's",
      calendar: "U8's / U10's / U12's",
      color: "yellow",
      date: "2022-09-20",
    },

    {
      eventName: "U14's / U16's / U18's",
      calendar: "U14's / U16's / U18's",
      color: "green",
      date: "2022-03-17",
    },
  ];

  var calendar = new Calendar("#calendar", data);

  var d = new Date(),
    year = d.getYear(),
    mondays = [];

  d.setDate(1);

  // Get the first Monday in the month
  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other Mondays in the month
  while (d.getYear() === year) {
    var pushDate = new Date(d.getTime());
    mondays.push(
      pushDate.getFullYear() +
        "-" +
        (pushDate.getMonth() + 1) +
        "-" +
        pushDate.getDate()
    );
    d.setDate(d.getDate() + 7);
  }
  console.log(mondays);
})();
