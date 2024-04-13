// todo: переписать через классы

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
}

Carousel.prototype = {
  _initProps() {
    this.currentSlide = 0;
    this.isPlaying = true;
    this.interval = 1000;

    this.SLIDES_COUNT = this.slides.length;
    this.CODE_ARROW_RIGHT = "ArrowRight";
    this.CODE_ARROW_LEFT = "ArrowLeft";
    this.CODE_SPACE = "Space";
    this.FA_PAUSE = '<i class="fas fa-pause-circle">';
    this.FA_PLAY = '<i class="fas fa-play-circle">';
  },

  _initControls() {
    //   ==1== создаем элемент
    const controls = document.createElement("div");
    //   ==4 ==добавляем 3 кнопки
    const PAUSE = `<div id="pause-btn" class="control control-pause">
                    <i class="fas fa-pause-circle"></i>
                  </div>`;
    const PREV = `<div id="prev-btn" class="control control-prev"> 
                    <i class="fas fa-angle-left"></i>
                  </div>`;
    const NEXT = `<div id="next-btn" class="control control-next">
                    <i class="fas fa-angle-right"></i>
                </div>`;
    //  ==3== перед тем как аппендить создаем обвязку с классами - установить значение указанного атрибута для выбранного элемента
    // идентификатор возможно не понадобится, т.к. работать с элементом будем динамически
    controls.setAttribute("class", "controls");
    //  ==5== после того как добавили атрибуты прописываем во внутренний HTML наш код
    controls.innerHTML = PREV + PAUSE + NEXT;
    //   ==2== добавление нового HTML-элемента внутрь пустого дива на веб-странице
    this.container.append(controls);
    //   код из HTML, который будем создавать динамически:
    // <div id="controls-container" class="controls">
    //   <div id="prev-btn" class="control control-prev"> СОЗДАЕМ ЭТОТ ЭЛЕМЕНТ
    //     <i class="fas fa-angle-left"></i>
    //   </div>
    //   <div id="pause-btn" class="control control-pause">
    //     <i class="fas fa-pause-circle"></i>
    //   </div>
    //   <div id="next-btn" class="control control-next">
    //     <i class="fas fa-angle-right"></i>
    //   </div>
    // </div>
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

  initApp() {
    this._initProps();
    this._initControls();
    this._initListeners();
    this._tick();
  },
};
