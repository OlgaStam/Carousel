(function () {
  // оптимизация запросов не по всему документу а только в карусели
  const container = document.querySelector("#container");
  const slides = container.querySelectorAll(".slide");

  const pauseBtn = container.querySelector("#pause-btn");
  const prevBtn = container.querySelector("#prev-btn");
  const nextBtn = container.querySelector("#next-btn");

  const indicatorsContainer = container.querySelector("#indicators-container");
  // также можно искать индикаторы внутри родителя а не всей карусели
  const indicatorItems = indicatorsContainer.querySelectorAll(".indicator");

  const SLIDES_COUNT = slides.length;
  const CODE_ARROW_RIGHT = "ArrowRight";
  const CODE_ARROW_LEFT = "ArrowLeft";
  const CODE_SPACE = "Space";

  const FA_PAUSE = '<i class="fas fa-pause-circle">';
  const FA_PLAY = '<i class="fas fa-play-circle">';

  let currentSlide = 0;
  let timerID = null;
  let isPlaying = true;
  let interval = 1000;
  let startPosX = 0;
  let endPosX = 0;

  function gotoNth(n) {
    slides[currentSlide].classList.toggle("active");
    indicatorItems[currentSlide].classList.toggle("active");
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    /*n + SLIDES_COUNT удлиннили цикл итераций чтобы в обратную сторону не получить -1*/
    indicatorItems[currentSlide].classList.toggle("active");
    slides[currentSlide].classList.toggle("active");
  }
  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }
  function gotoNext() {
    gotoNth(currentSlide + 1);
  }

  function tick() {
    timerID = setInterval(gotoNext, interval);
  }

  function playHandler() {
    tick();
    pauseBtn.innerHTML = FA_PAUSE;
    isPlaying = true;
  }
  function pauseHandler() {
    clearInterval(timerID);
    pauseBtn.innerHTML = FA_PLAY;
    isPlaying = false;
  }
  const pausePlay = () => (isPlaying ? pauseHandler() : playHandler());

  function prev() {
    pauseHandler();
    gotoPrev();
  }
  function next() {
    pauseHandler();
    gotoNext();
  }

  function indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      pauseHandler();
      // Метод getAttribute() всегда возвращает значение атрибута как строку, независимо от типа атрибута. поэтому ставим +
      // gotoNth(+target.getAttribute("data-slide-to"));
      gotoNth(+target.dataset.slideTo);
    }
  }

  function pressKey(e) {
    // console.log("🚀 ~ pressKey ~ e:", e);
    // key: 'ArrowRight'
    // 'ArrowLeft'
    // 'Space'
    if (e.code === CODE_ARROW_RIGHT) next();
    if (e.code === CODE_ARROW_LEFT) prev();
    if (e.code === CODE_SPACE) pausePlay();
  }

  function swipeStart(e) {
    startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  }
  function swipeEnd(e) {
    endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;

    if (endPosX - startPosX > 100) prev();
    if (endPosX - startPosX < -100) next();
    // 100 вместо 0 чтобы не учитывать случайное касание
  }

  function initListeners() {
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
  }
  function initApp() {
    initListeners();
    tick();
  }
  initApp();
})();
