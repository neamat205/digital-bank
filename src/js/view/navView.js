class navView {
  _header = document.querySelector(".header");
  _nav = document.querySelector(".nav");
  _navLinksContainer = document.querySelector(".nav__links");
  _openBtn = document.querySelector(".humberger");
  _overlay = document.querySelector(".overlay");
  _barndImg = document.querySelector(".brand__img");
  _brandName = document.querySelector(".brand__name");
  _search = document.querySelector(".nav__search");
  _navOverlay = document.querySelector(".nav__overlay");
  _navLinks = document.querySelectorAll(".nav__link");
  constructor() {
    this._revealNavElements.call(this);
    this._addHandlerToggle(this._toggleNavLinks.bind(this));
    this._addHandlerScroll(this._scrollIntoView.bind(this));
    this._addHandlerStickUnstick(
      this._stickNav.bind(this),
      this._unStickNav.bind(this)
    );
  }
  _toggleNavLinks() {
    this._navLinksContainer.classList.toggle("reveal__nav");
  }
  _addHandlerToggle(handler) {
    this._openBtn.addEventListener("click", handler);
  }
  _addHandlerScroll(handler) {
    this._navLinksContainer.addEventListener(
      "click",
      function (e) {
        if (!e.target.hasAttribute("data-section")) return;
        const target = e.target.getAttribute("data-section");
        const page = document.querySelector(
          `${target === "0" ? ".header" : `#section--${target}`}`
        );
        if (this._navLinksContainer.classList.contains("reveal__nav"))
          this._toggleNavLinks();
        handler(page);
      }.bind(this)
    );
  }
  _scrollIntoView(page) {
    page.scrollIntoView({ behavior: "smooth" });
  }
  _stickNav() {
    this._nav.classList.add("nav__sticky");
    this._navOverlay.classList.remove("hidden");
  }
  _unStickNav() {
    this._nav.classList.remove("nav__sticky");
    this._navOverlay.classList.add("hidden");
  }
  _addHandlerStickUnstick(handler__1, handler__2) {
    new IntersectionObserver(
      function (e) {
        const [entries] = e;
        if (!entries.isIntersecting) {
          handler__1();
        }
        if (entries.isIntersecting) {
          handler__2();
        }
      },
      {
        root: null,
        rootMargin: "85px",
        threshold: 0,
      }
    ).observe(this._header);
  }
  _revealNavElements() {
    this._brandName.classList.add("reveal__el");
    this._barndImg.classList.add("reveal__el");
    this._search.classList.add("reveal__el");
  }
}
export default new navView();
