function SwipeCarousel() {
  // 1 восстанавливаем контекст
  Carousel.apply(this, arguments);
}

// 2 прототипное наследование
SwipeCarousel.prototype = Object.create(Carousel.prototype);
// 3 восстанавливаем конструктор
SwipeCarousel.prototype.constructor = SwipeCarousel;
// 4 создаем методы
SwipeCarousel.prototype._swipeStart = function (e) {
  this.startPosX =
    e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
};

SwipeCarousel.prototype._swipeEnd = function (e) {
  this.endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;

  if (this.endPosX - this.startPosX > 100) this.prev();
  if (this.endPosX - this.startPosX < -100) this.next();
};
SwipeCarousel.prototype._initListeners = function () {
  this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
  this.prevBtn.addEventListener("click", this.prev.bind(this));
  this.nextBtn.addEventListener("click", this.next.bind(this));
  this.indicatorsContainer.addEventListener("click", this._indicate.bind(this));
  this.container.addEventListener("touchend", this._swipeEnd.bind(this));
  this.container.addEventListener("mousedown", this._swipeStart.bind(this));
  this.container.addEventListener("mouseup", this._swipeEnd.bind(this));
  document.addEventListener("keydown", this._pressKey.bind(this));
};
