function Carousel() {
  this.container = document.querySelector("#container");
  this.slides = this.container.querySelectorAll(".slide");

  this.pauseBtn = this.container.querySelector("#pause-btn");
  this.prevBtn = this.container.querySelector("#prev-btn");
  this.nextBtn = this.container.querySelector("#next-btn");

  this.indicatorsContainer = this.container.querySelector(
    "#indicators-container"
  );
  this.indicatorItems = this.indicatorsContainer.querySelectorAll(".indicator");

  this.SLIDES_COUNT = slides.length;
  this.CODE_ARROW_RIGHT = "ArrowRight";
  this.CODE_ARROW_LEFT = "ArrowLeft";
  this.CODE_SPACE = "Space";

  this.FA_PAUSE = '<i class="fas fa-pause-circle">';
  this.FA_PLAY = '<i class="fas fa-play-circle">';

  this.currentSlide = 0;
  this.timerID = null;
  this.isPlaying = true;
  this.interval = 1000;
  this.startPosX = null;
  this.endPosX = null;
}

Carousel.prototype = {
  gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicatorItems[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.indicatorItems[this.currentSlide].classList.toggle("active");
    this.slides[this.currentSlide].classList.toggle("active");
  },
  gotoPrev() {
    gotoNth(currentSlide - 1);
  },
  gotoNext() {
    gotoNth(currentSlide + 1);
  },

  tick() {
    timerID = setInterval(gotoNext, interval);
  },

  playHandler() {
    tick();
    pauseBtn.innerHTML = FA_PAUSE;
    isPlaying = true;
  },
  pauseHandler() {
    clearInterval(timerID);
    pauseBtn.innerHTML = FA_PLAY;
    isPlaying = false;
  },
  pausePlay() {
    return isPlaying ? pauseHandler() : playHandler();
  },

  prev() {
    pauseHandler();
    gotoPrev();
  },
  next() {
    pauseHandler();
    gotoNext();
  },

  indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      pauseHandler();
      // Метод getAttribute() всегда возвращает значение атрибута как строку, независимо от типа атрибута. поэтому ставим +
      // gotoNth(+target.getAttribute("data-slide-to"));
      gotoNth(+target.dataset.slideTo);
    }
  },

  pressKey(e) {
    // console.log("🚀 ~ pressKey ~ e:", e);
    // key: 'ArrowRight'
    // 'ArrowLeft'
    // 'Space'
    if (e.code === CODE_ARROW_RIGHT) next();
    if (e.code === CODE_ARROW_LEFT) prev();
    if (e.code === CODE_SPACE) pausePlay();
  },

  swipeStart(e) {
    startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  },
  swipeEnd(e) {
    endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;

    if (endPosX - startPosX > 100) prev();
    if (endPosX - startPosX < -100) next();
    // 100 вместо 0 чтобы не учитывать случайное касание
  },

  initListeners() {
    pauseBtn.addEventListener("click", pausePlay);
    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    indicatorsContainer.addEventListener("click", indicate);
    // для свайпа на мобильном
    container.addEventListener("touchstart", swipeStart);
    container.addEventListener("touchend", swipeEnd);
    // для свайпа на десктопе
    container.addEventListener("mousedown", swipeStart);
    container.addEventListener("mouseup", swipeEnd);

    document.addEventListener("keydown", pressKey);
  },
  initApp() {
    initListeners();
    tick();
  },
};
Carousel.prototype.constructor = Carousel;

const carousel = new Carousel();
console.log("🚀 ~ carousel:", carousel);

//   initApp();
// })();
