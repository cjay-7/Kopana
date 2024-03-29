// vars
("use strict");
var testimonial = document.getElementById("testimonial"),
  testimonialDots = Array.prototype.slice.call(
    document.getElementById("testimonial-dots").children
  ),
  testimonialContent = Array.prototype.slice.call(
    document.getElementById("testimonial-content").children
  ),
  testimonialLeftArrow = document.getElementById("left-arrow"),
  testimonialRightArrow = document.getElementById("right-arrow"),
  testimonialSpeed = 10000,
  currentSlide = 0,
  currentActive = 0,
  testimonialTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
window.onload = function () {
  // testimonial Script
  function playSlide(slide) {
    for (var k = 0; k < testimonialDots.length; k++) {
      testimonialContent[k].classList.remove("active");
      testimonialContent[k].classList.remove("inactive");
      testimonialDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimonialContent.length - 1;
    }

    if (slide > testimonialContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimonialContent[currentActive].classList.add("inactive");
    }
    testimonialContent[slide].classList.add("active");
    testimonialDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimonialTimer);
    testimonialTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, testimonialSpeed);
  }

  testimonialLeftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });

  testimonialRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  testimonial.addEventListener("swipeleft", function (event) {
    playSlide((currentSlide += 1));
  });

  testimonial.addEventListener("swiperight", function (event) {
    playSlide((currentSlide -= 1));
  });

  for (var l = 0; l < testimonialDots.length; l++) {
    testimonialDots[l].addEventListener("click", function () {
      playSlide((currentSlide = testimonialDots.indexOf(this)));
    });
  }

  playSlide(currentSlide);
};

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 70,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      spaceBetween: 20,
    },
    520: {
      spaceBetween: 50,
    },
    950: {
      spaceBetween: 70,
    },
  },
});

function sendMail() {
  var link = "mailto:kopanafootball@gmail.com";

  window.location.href = link;
}

// Get tomorrow's date
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Format the date as DD/MM/YYYY
var day = String(tomorrow.getDate()).padStart(2, "0");
var month = String(tomorrow.getMonth() + 1).padStart(2, "0");
var year = tomorrow.getFullYear();
var formattedDate = day + "/" + month + "/" + year;

// Update the "Next Session" dates
var nextSessionDates = document.querySelectorAll("#nextSessionDate");
nextSessionDates.forEach(function (element) {
  element.textContent = formattedDate;
});
