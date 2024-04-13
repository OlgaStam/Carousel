import SwipeCarousel from "./carousel-constructor.js";
// .js указать вручную
// ошибка - does not provide an export named 'default'
//  говорим - надо взять, а в carousel-constructor.js не отдали
// идем туда вниз, прописываем экспорт
const carousel = new SwipeCarousel("#myslider", ".item", 1000);
carousel.initApp();
