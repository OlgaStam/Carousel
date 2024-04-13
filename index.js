import SwipeCarousel from "./carousel-constructor.js";

const carousel = new SwipeCarousel({
  //   containerID: "#myslider",
  slideID: ".slide",
  interval: 1000,
  //   ==1==
  isPlaying: false,
});

carousel.initApp();
