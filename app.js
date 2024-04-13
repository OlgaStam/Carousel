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
    this.gotoNth(this.currentSlide - 1);
  },
  gotoNext() {
    this.gotoNth(this.currentSlide + 1);
  },

  tick() {
    this.timerID = setInterval(this.gotoNext, this.interval);
  },

  playHandler() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this.tick();
  },
  pauseHandler() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = false;
    this.clearInterval(this.timerID);
  },
  pausePlay() {
    return this.isPlaying ? this.pauseHandler() : this.playHandler();
  },

  prev() {
    this.pauseHandler();
    this.gotoPrev();
  },
  next() {
    this.pauseHandler();
    this.gotoNext();
  },

  indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this.pauseHandler();
      this.gotoNth(+target.dataset.slideTo);
    }
  },

  pressKey(e) {
    // console.log("🚀 ~ pressKey ~ e:", e);
    // key: 'ArrowRight'
    // 'ArrowLeft'
    // 'Space'
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  swipeStart(e) {
    this.startPosX =
      e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  },
  swipeEnd(e) {
    this.endPosX =
      e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;

    if (this.endPosX - this.startPosX > 100) this.prev();
    if (this.endPosX - this.startPosX < -100) this.next();
  },

  initListeners() {
    this.pauseBtn.addEventListener("click", this.pausePlay);
    this.prevBtn.addEventListener("click", this.prev);
    this.nextBtn.addEventListener("click", this.next);
    this.indicatorsContainer.addEventListener("click", this.indicate);
    this.container.addEventListener("touchend", this.swipeEnd);
    this.container.addEventListener("mousedown", this.swipeStart);
    this.container.addEventListener("mouseup", this.swipeEnd);

    document.addEventListener("keydown", this.pressKey);
  },
  initApp() {
    this.initListeners();
    this.tick();
  },
};
Carousel.prototype.constructor = Carousel;

const carousel = new Carousel();
console.log("🚀 ~ carousel:", carousel);

//   initApp();
// })();
