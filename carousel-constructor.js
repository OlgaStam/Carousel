// ==1== экстендимся от класса карусель
class SwipeCarousel extends Carousel {
  //  ==2== вызываем конструктор, в котором параметры получаем уже не через arguments, а через рест-оператор
  // Рест-оператор (...): Он используется для сбора оставшихся аргументов функции в массив или для превращения
  // части массива в отдельные переменные. Это позволяет обрабатывать функции с переменным числом аргументов.
  constructor(...args) {
    //  ==3== Carousel.apply(this); заменяем на
    //   вызываем базовый класс и отдаем ему все параметры, раскладывая их снова в список
    super(...args);
    //   todo: исправить позже
    this.slidesContainer = this.container.querySelector(".slides");
  }

  // выбрасываем работу с прототипами
  // все остальное становится методами класса

  _initListeners() {
    // Carousel.prototype._initListeners.apply(this);
    //   вместо этой строчки обращаемся к супер-классу и у него вызываем инитлисенер
    // никаких больше прототипов, єплаем и восстановления контекста
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
