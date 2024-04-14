class Carousel {
  constructor(p) {
    const settings = {
      ...{
        containerID: "#carousel",
        slideID: ".slide",
        interval: 5000,
        isPlaying: true,
      },
      ...p,
    };
    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  _initProps() {
    this.currentSlide = 0;

    this.SLIDES_COUNT = this.slideItems.length;
    this.CODE_ARROW_RIGHT = "ArrowRight";
    this.CODE_ARROW_LEFT = "ArrowLeft";
    this.CODE_SPACE = "Space";
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  }

  _initControls() {
    const controls = document.createElement("div");
    // const PAUSE = `<div id="pause-btn" class="control control-pause">
    //                     ${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}
    //                 </div>`;
    // ==1== в таком виде кнопка рендерится, перепишем чтобы менялась только визуально
    const PAUSE = `<div id="pause-btn" class="control control-pause">
                      <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                      <span id="fa-play-icon">${this.FA_PLAY}</span>
                    </div>`;
    const PREV = `<div id="prev-btn" class="control control-prev">${this.FA_PREV}</div>`;
    const NEXT = `<div id="next-btn" class="control control-next">${this.FA_NEXT}</div>`;

    controls.setAttribute("id", "controls-container");
    controls.setAttribute("class", "controls");
    controls.innerHTML = PREV + PAUSE + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector("#pause-btn");
    this.prevBtn = this.container.querySelector("#prev-btn");
    this.nextBtn = this.container.querySelector("#next-btn");

    // ==2== делаем выборку, проверяем в консоли что это они
    this.pauseIcon = this.container.querySelector("#fa-pause-icon");
    // console.log(
    //   "🚀 ~ Carousel ~ _initControls ~ this.pauseIcon:",
    //   this.pauseIcon
    // );
    this.playIcon = this.container.querySelector("#fa-play-icon");
    // console.log(
    //   "🚀 ~ Carousel ~ _initControls ~ this.playIcon:",
    //   this.playIcon
    // );

    // ==8== добавляем изначальное состояние
    this.isPlaying ? this._pauseVisible() : this._playVisible();
  }

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
      indicator.innerHTML = `${i + 1}`; // можно добавить текст, только без тегов, а то сломаем
      indicators.append(indicator);
    }

    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector(
      "#indicators-container"
    );
    this.indicatorItems =
      this.indicatorsContainer.querySelectorAll(".indicator");
  }

  _initListeners() {
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.indicatorsContainer.addEventListener(
      "click",
      this._indicate.bind(this)
    );
    document.addEventListener("keydown", this._pressKey.bind(this));
  }

  _gotoNth(n) {
    this.slideItems[this.currentSlide].classList.toggle("active");
    this.indicatorItems[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.indicatorItems[this.currentSlide].classList.toggle("active");
    this.slideItems[this.currentSlide].classList.toggle("active");
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  // ==4== если нам нужна видимая кнопка "пауза"
  _pauseVisible(isVisible = true) {
    this.pauseIcon.style.opacity = isVisible ? 1 : 0;
    this.playIcon.style.opacity = isVisible ? 0 : 1;
  }

  // ==5== чтобы не вызывать каждый раз _pauseVisible с параметрами проще вызвать ф-ю
  _playVisible() {
    this._pauseVisible(false);
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

  _play() {
    // ==6== меняем код
    this._pauseVisible();
    this.isPlaying = true;
    this._tick();
  }

  _pause() {
    // ==7== меняем код
    this._playVisible();
    this.isPlaying = false;
    clearInterval(this.timerID);
  }

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  pausePlay() {
    return this.isPlaying ? this._pause() : this._play();
  }

  prev() {
    this._pause();
    this._gotoPrev();
  }

  next() {
    this._pause();
    this._gotoNext();
  }

  initApp() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  }
}
export default Carousel;
