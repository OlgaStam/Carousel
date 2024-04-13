import SwipeCarousel from "./carousel-constructor.js";

// чтобы можно было пропускать параметры, перепишем их на дефолтный объект "params"
// const carousel = new SwipeCarousel("#myslider", ".item", 1000);
const carousel = new SwipeCarousel({
  containerID: "#myslider",
  slideID: ".slide",
  interval: 1000,
  isPlaing: true,
});

carousel.initApp();
