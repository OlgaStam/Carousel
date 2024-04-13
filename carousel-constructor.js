import Carousel from "./carousel.js"; //.js не забываем вручную
// файл появился, ошибка - нет экспорта по дефолту из carousel.js, идем туда, добавляем внизу
class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args);
    //   todo: исправить позже
    this.slidesContainer = this.container.querySelector(".slides");
  }

  _initListeners() {
    super._initListeners();
    this.slidesContainer.addEventListener(
      "touchstart",
      this._swipeStart.bind(this)
    );
    this.slidesContainer.addEventListener(
      "mousedown",
      this._swipeStart.bind(this)
    );
    this.slidesContainer.addEventListener(
      "touchend",
      this._swipeEnd.bind(this)
    );
    this.slidesContainer.addEventListener("mouseup", this._swipeEnd.bind(this));
  }

  _swipeStart(e) {
    this.startPosX =
      e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  }

  _swipeEnd(e) {
    this.endPosX =
      e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;

    if (this.endPosX - this.startPosX > 100) this.prev();
    if (this.endPosX - this.startPosX < -100) this.next();
  }
}
export default SwipeCarousel;
// отдали, теперь ошибка Carousel is not defined at carousel-constructor.js:1:29
//  идем в 1 строку имортируем карусель
