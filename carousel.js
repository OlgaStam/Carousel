// todo: переписать через классы
function Carousel(
  // вынесли в параметры и можем управлять функцией - через конфиг в индексе
  containerID = "#container",
  slideID = ".slide",
  interval = 5000
) {
  this.container = document.querySelector(containerID);
  this.slides = this.container.querySelectorAll(slideID);
  this.interval = interval;
}

Carousel.prototype = {
  _initProps() {
    this.currentSlide = 0;
    this.isPlaying = true;
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_ARROW_RIGHT = "ArrowRight";
    this.CODE_ARROW_LEFT = "ArrowLeft";
    this.CODE_SPACE = "Space";
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  },

  _initControls() {
    const controls = document.createElement("div");
    const PAUSE = `<div id="pause-btn" class="control control-pause">${this.FA_PAUSE}</div>`;
    const PREV = `<div id="prev-btn" class="control control-prev">${this.FA_PREV}</div>`;
    const NEXT = `<div id="next-btn" class="control control-next">${this.FA_NEXT}</div>`;
    controls.setAttribute("id", "controls-container");
    controls.setAttribute("class", "controls");
    controls.innerHTML = PREV + PAUSE + NEXT;

    this.container.append(controls);
    this.pauseBtn = this.container.querySelector("#pause-btn");
    this.prevBtn = this.container.querySelector("#prev-btn");
    this.nextBtn = this.container.querySelector("#next-btn");
  },

  _initIndicators() {
    const indicators = document.createElement("div");

    indicators.setAttribute("id", "indicators-container");
    indicators.setAttribute("class", "indicators");

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement("div");

      indicator.setAttribute(
        "class",
        i !== 0 ? "indicator" : "indicator active"
      );
      indicator.dataset.slideTo = `${i}`; //с конвертацией і в строку
      //   indicator.innerHTML = `${i + 1}`;// можно добавить текст, только без тегов, а то сломаем
      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector(
      "#indicators-container"
    );
    this.indicatorItems =
      this.indicatorsContainer.querySelectorAll(".indicator");
  },

  _initListeners() {
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.indicatorsContainer.addEventListener(
      "click",
      this._indicate.bind(this)
    );
    document.addEventListener("keydown", this._pressKey.bind(this));
  },
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

  //   ==2== инициализируем индикаторс
  initApp() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  },
};
