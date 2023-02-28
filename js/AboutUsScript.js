var swiper = new Swiper(".my-timelineSwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    520: {
      slidesPerView: 3,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

function scrollWin() {
  window.scrollBy({
    top: 600,
    left: 0,
    behavior: "smooth",
  });
}

var FoundersSwiper = new Swiper(".myFoundersSwiper", {
  speed: 600,
  parallax: true,
  pagination: {
    el: ".Founder-Pagination.swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".Founder-swiper-button.swiper-button-next",
    prevEl: ".Founder-swiper-button.swiper-button-prev",
  },
});
