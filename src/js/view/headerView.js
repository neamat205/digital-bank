import { MOV_INTERVAL, MOV_START } from "../config";
class headerView {
  _btn = document.querySelector(".title__btn");
  _heading = document.querySelector(".title__heading");
  _img = document.querySelector(".title__img");
  _subHeading = document.querySelector(".title__sub-heading");
  constructor() {
    this._revealTitleEl();
  }
  _revealTitleEl() {
    setTimeout(
      function () {
        this._heading.style.visibility = "visible";
        this._heading.style.transform = "translate(0,0)";
      }.bind(this),
      MOV_START
    );
    setTimeout(
      function () {
        this._subHeading.style.visibility = "visible";
        this._subHeading.style.transform = "translate(0,0)";
      }.bind(this),
      MOV_START
    );
    setTimeout(
      function () {
        this._btn.style.visibility = "visible";
        this._btn.style.transform = "translate(0,0)";
      }.bind(this),
      MOV_START
    );
    setTimeout(
      function () {
        this._img.style.visibility = "visible";
        this._img.style.transform = "translate(0,0)";
      }.bind(this),
      MOV_START
    );
  }
}
export default new headerView();
