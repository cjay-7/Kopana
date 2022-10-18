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
        self.drawMonth(current);
        self.drawLegend(current);
      }, 1000);
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
      // this.title.addEventListener("click", function () {
      //   self.curMonth();
      // });

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

      details.appendChild(currentDay);

      calendarContainer.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function (memo, ev) {
      if (ev.date.isSame(day, "day")) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    var bookingButtonContainer = createElement("div", "bookingButtonContainer");
    var bookingButtonOpen = createElement("button", "booking-button-open");
    var bookingButtonClose = createElement("button", "booking-button-close");
    // var xmark = createElement("i", "fa-solid fa-xmark");
    var bookingModal = createElement("dialog", "modal");
    var bookingForm = createElement("form", "booking-form");
    var group1 = createElement("div", "group");
    var group2 = createElement("div", "group");
    var group3 = createElement("div", "radio-container");

    bookingButtonOpen.innerHTML = "Book Session";
    // bookingButtonOpen.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    bookingButtonClose.setAttribute("type", "button");
    bookingModal.setAttribute("id", "modal");
    bookingForm.setAttribute("method", "dialog");

    var labelName = createElement("label");
    labelName.setAttribute("for", "name");
    labelName.innerHTML = "Name : ";
    var labelPhone = createElement("label");
    labelPhone.setAttribute("for", "phone");
    labelPhone.innerHTML = "Phone Number : ";
    var labelCategory = createElement("label");
    labelCategory.setAttribute("for", "name");
    labelCategory.innerHTML = "Category : ";

    var inputName = createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "name");
    inputName.setAttribute("id", "name");
    inputName.setAttribute("placeholder", "John Doe");

    var inputPhone = createElement("input");
    inputPhone.setAttribute("type", "tel");
    inputPhone.setAttribute("name", "phone");
    inputPhone.setAttribute("id", "text");
    inputPhone.setAttribute("placeholder", "9999999999");

    var inputCategory = createElement("input");
    inputCategory.setAttribute("type", "radio");
    inputCategory.setAttribute("name", "category");
    inputCategory.setAttribute("id", "category1");

    group1.appendChild(labelName);
    group1.appendChild(inputName);
    bookingForm.appendChild(group1);

    // group.innerHTML = "";

    group2.appendChild(labelPhone);
    group2.appendChild(inputPhone);
    bookingForm.appendChild(group2);

    group3.appendChild(labelCategory);
    group3.appendChild(inputCategory);

    bookingForm.appendChild(group3);
    
    bookingButtonContainer.appendChild(bookingButtonOpen);
    details.appendChild(bookingButtonContainer);
    details.appendChild(bookingModal);
    bookingModal.appendChild(bookingButtonClose);
    bookingModal.appendChild(bookingForm);
    bookingButtonOpen.addEventListener("click", () => {
      bookingModal.showModal();
    });
    bookingButtonClose.addEventListener("click", () => {
      bookingModal.close();
    });
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
  var data = [];

  var calendar = new Calendar("#calendar", data);

  var d = new Date(),
    year = d.getYear(),
    mondays = [],
    tuesdays = [],
    wednesdays = [],
    thursdays = [],
    fridays = [],
    saturdays = [],
    sundays = [];
  schedule = [];

  // mondays
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
  for (let i = 0; i < mondays.length; i++) {
    schedule = {
      eventName: "U6's : 5-6 PM.",
      calendar: "U6's",
      color: "orange",
      date: moment(mondays[i]),
    };
    data.push(schedule);
  }

  // tuesdays

  d = new Date();

  d.setDate(1);

  // Get the first tuesday in the month
  while (d.getDay() !== 2) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other tuesdays in the month
  while (d.getYear() === year) {
    var pushDate = new Date(d.getTime());
    tuesdays.push(
      pushDate.getFullYear() +
        "-" +
        (pushDate.getMonth() + 1) +
        "-" +
        pushDate.getDate()
    );
    d.setDate(d.getDate() + 7);
  }
  for (let i = 0; i < tuesdays.length; i++) {
    schedule = {
      eventName: "U6's : 5-6 PM.",
      calendar: "U6's",
      color: "orange",
      date: moment(tuesdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U8's : 6-7:30 PM.",
      calendar: "U8's",
      color: "blue",
      date: moment(tuesdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U10's : 6-7:30 PM.",
      calendar: "U10's",
      color: "red",
      date: moment(tuesdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U12's : 6-7:30 PM",
      calendar: "U12's",
      color: "green",
      date: moment(tuesdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U14's : 6-7:30 PM.",
      calendar: "U14's",
      color: "yellow",
      date: moment(tuesdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "Women's Team : 7:30 - 9 PM.",
      calendar: "Women's Team",
      color: "lavender",
      date: moment(tuesdays[i]),
    };
    data.push(schedule);
  }

  // wednesdays

  d = new Date();
  d.setDate(1);

  // Get the first wednesday in the month
  while (d.getDay() !== 3) {
    d.setDate(d.getDate() + 1);
  }
  // Get all the other wednesday in the month
  while (d.getYear() === year) {
    var pushDate = new Date(d.getTime());
    wednesdays.push(
      pushDate.getFullYear() +
        "-" +
        (pushDate.getMonth() + 1) +
        "-" +
        pushDate.getDate()
    );
    d.setDate(d.getDate() + 7);
  }
  for (let i = 0; i < wednesdays.length; i++) {
    schedule = {
      eventName: "U6's : 5-6 PM.",
      calendar: "U6's",
      color: "orange",
      date: moment(wednesdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U8's : 6-7:30 PM.",
      calendar: "U8's",
      color: "blue",
      date: moment(wednesdays[i]),
    };
    data.push(schedule);
  }

  // thursdays

  d = new Date();
  d.setDate(1);

  // Get the first thursday in the month
  while (d.getDay() !== 4) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other thursdays in the month
  while (d.getYear() === year) {
    var pushDate = new Date(d.getTime());
    thursdays.push(
      pushDate.getFullYear() +
        "-" +
        (pushDate.getMonth() + 1) +
        "-" +
        pushDate.getDate()
    );
    d.setDate(d.getDate() + 7);
  }
  for (let i = 0; i < thursdays.length; i++) {
    schedule = {
      eventName: "U6's : 5-6 PM.",
      calendar: "U6's",
      color: "orange",
      date: moment(thursdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U8's : 6-7:30 PM.",
      calendar: "U8's",
      color: "blue",
      date: moment(thursdays[i]),
    };
    data.push(schedule);
    schedule = {
      eventName: "U10's : 6-7:30 PM.",
      calendar: "U10's",
      color: "red",
      date: moment(thursdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U12's : 6-7:30 PM.",
      calendar: "U12's",
      color: "green",
      date: moment(thursdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U14's : 6-7:30 PM.",
      calendar: "U14's",
      color: "yellow",
      date: moment(thursdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "Women's Team : 7:30 - 9 PM.",
      calendar: "Women's Team",
      color: "lavender",
      date: moment(thursdays[i]),
    };
    data.push(schedule);
  }

  // fridays

  d = new Date();
  d.setDate(1);

  // Get the first friday in the month
  while (d.getDay() !== 5) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other friday in the month
  while (d.getYear() === year) {
    var pushDate = new Date(d.getTime());
    fridays.push(
      pushDate.getFullYear() +
        "-" +
        (pushDate.getMonth() + 1) +
        "-" +
        pushDate.getDate()
    );
    d.setDate(d.getDate() + 7);
  }
  for (let i = 0; i < fridays.length; i++) {
    schedule = {
      eventName: "U6's : 5-6 PM.",
      calendar: "U6's",
      color: "orange",
      date: moment(fridays[i]),
    };
    data.push(schedule);
    schedule = {
      eventName: "U8's : 6-7:30 PM.",
      calendar: "U8's",
      color: "blue",
      date: moment(fridays[i]),
    };
    data.push(schedule);
    schedule = {
      eventName: "U10's : 6-7:30 PM.",
      calendar: "U10's",
      color: "red",
      date: moment(fridays[i]),
    };
    data.push(schedule);
  }

  // saturdays
  d = new Date();
  d.setDate(1);

  // Get the first saturday in the month
  while (d.getDay() !== 6) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other saturdays in the month
  while (d.getYear() === year) {
    var pushDate = new Date(d.getTime());
    saturdays.push(
      pushDate.getFullYear() +
        "-" +
        (pushDate.getMonth() + 1) +
        "-" +
        pushDate.getDate()
    );
    d.setDate(d.getDate() + 7);
  }
  for (let i = 0; i < saturdays.length; i++) {
    schedule = {
      eventName: "U10's : 5-6:30 PM.",
      calendar: "U10's",
      color: "red",
      date: moment(saturdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U12's : 5-6:30 PM.",
      calendar: "U12's",
      color: "green",
      date: moment(saturdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U14's : 5-6:30 PM.",
      calendar: "U14's",
      color: "yellow",
      date: moment(saturdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U18's : 5-6:30 PM.",
      calendar: "U18's",
      color: "white",
      date: moment(saturdays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "Youth Team : 6-8 AM.",
      calendar: "Youth Team",
      color: "baby-blue",
      date: moment(saturdays[i]),
    };
    data.push(schedule);
  }

  // sundays
  d = new Date();
  d.setDate(1);

  // Get the first sunday in the month
  while (d.getDay() !== 0) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other sunday in the month
  while (d.getYear() === year) {
    var pushDate = new Date(d.getTime());
    sundays.push(
      pushDate.getFullYear() +
        "-" +
        (pushDate.getMonth() + 1) +
        "-" +
        pushDate.getDate()
    );
    d.setDate(d.getDate() + 7);
  }
  for (let i = 0; i < sundays.length; i++) {
    schedule = {
      eventName: "U10's : 5-6:30 PM.",
      calendar: "U10's",
      color: "red",
      date: moment(sundays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U12's : 5-6:30 PM.",
      calendar: "U12's",
      color: "green",
      date: moment(sundays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U14's : 5-6:30 PM.",
      calendar: "U14's",
      color: "yellow",
      date: moment(sundays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "U18's : 5-6:30 PM.",
      calendar: "U18's",
      color: "white",
      date: moment(sundays[i]),
    };
    data.push(schedule);

    schedule = {
      eventName: "Youth Team : 6-8 AM.",
      calendar: "Youth Team",
      color: "baby-blue",
      date: moment(sundays[i]),
    };
    data.push(schedule);
  }

  schedule = {
    eventName: "MFA Youth League U11 : 8 AM.",
    calendar: "MFA Youth League U11",
    color: "grey",
    date: moment("2022-10-15"),
  };
  data.push(schedule);

  schedule = {
    eventName: "MFA Youth League U11 : 11 AM.",
    calendar: "MFA Youth League U11",
    color: "grey",
    date: moment("2022-10-22"),
  };
  data.push(schedule);

  schedule = {
    eventName: "MFA Second Division : 9 AM.",
    calendar: "MFA Second Division",
    color: "pink",
    date: moment("2022-11-06"),
  };
  data.push(schedule);

  schedule = {
    eventName: "MFA Second Division : 12 PM.",
    calendar: "MFA Second Division",
    color: "pink",
    date: moment("2022-11-11"),
  };
  data.push(schedule);
})();
