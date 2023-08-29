class testimonialView {
  _btnRight = document.querySelector(".btn__right");
  _btnLeft = document.querySelector(".btn__left");
  _testimonials = document.querySelectorAll(".testimonial");
  _slide = 0;
  constructor() {
    this._scrollToSlide(0);
    this._addHandlerSlide(this._scrollToSlide.bind(this));
  }
  _scrollToSlide(slide) {
    this._testimonials.forEach((testimonial, i) => {
      testimonial.setAttribute("data-testimonial", i);
      testimonial.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }
  _addHandlerSlide(handler) {
    this._btnLeft.addEventListener(
      "click",
      function () {
        if (this._slide === 0) {
          this._slide = this._testimonials.length - 1;
          handler(this._slide);
          return;
        }
        this._slide--;
        handler(this._slide);
      }.bind(this)
    );
    this._btnRight.addEventListener(
      "click",
      function () {
        if (this._slide === this._testimonials.length - 1) {
          this._slide = 0;
          handler(this._slide);
          return;
        }
        this._slide++;
        handler(this._slide);
      }.bind(this)
    );
  }
}
export default new testimonialView();
