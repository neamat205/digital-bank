class sectionView {
  _sections = document.querySelectorAll(".section");
  constructor() {
    this._addHandlerReveal(this._revealSection);
  }
  _revealSection(section) {
    section.classList.add("reveal__el");
  }
  _addHandlerReveal(handler) {
    this._sections.forEach((section) => {
      if (section.classList.contains("header")) return;
      new IntersectionObserver(
        function (e) {
          const [entries] = e;
          if (entries.isIntersecting) {
            handler(section);
          }
        },
        {
          root: null,
          threshold: 0.15,
        }
      ).observe(section);
    });
  }
}
export default new sectionView();
