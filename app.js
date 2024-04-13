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
  this.SLIDES_COUNT = this.slides.length;
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
  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicatorItems[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.indicatorItems[this.currentSlide].classList.toggle("active");
    this.slides[this.currentSlide].classList.toggle("active");
  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  },

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  },

  _tick() {
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  },

  _playHandler() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this._tick();
  },

  _pauseHandler() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlaying = false;
    clearInterval(this.timerID);
  },

  pausePlay() {
    return this.isPlaying ? this._pauseHandler() : this._playHandler();
  },
  prev() {
    this._pauseHandler();
    this._gotoPrev();
  },
  next() {
    this._pauseHandler();
    this._gotoNext();
  },

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this._pauseHandler();
      this._gotoNth(+target.dataset.slideTo);
    }
  },

  _pressKey(e) {
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  _swipeStart(e) {
    this.startPosX =
      e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  },
  _swipeEnd(e) {
    this.endPosX =
      e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;

    if (this.endPosX - this.startPosX > 100) this.prev();
    if (this.endPosX - this.startPosX < -100) this.next();
  },

  _initListeners() {
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.indicatorsContainer.addEventListener(
      "click",
      this._indicate.bind(this)
    );
    this.container.addEventListener("touchend", this._swipeEnd.bind(this));
    this.container.addEventListener("mousedown", this._swipeStart.bind(this));
    this.container.addEventListener("mouseup", this._swipeEnd.bind(this));

    document.addEventListener("keydown", this._pressKey.bind(this));
  },
  initApp() {
    this._initListeners();
    this._tick();
  },
};

Carousel.prototype.constructor = Carousel;

const carousel = new Carousel();
carousel.initApp();
