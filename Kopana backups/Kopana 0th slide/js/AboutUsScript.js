var swiper = new Swiper(".my-timelineSwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  mousewheel: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
});

function scrollWin() {
  window.scrollTo(0, 600);
}
