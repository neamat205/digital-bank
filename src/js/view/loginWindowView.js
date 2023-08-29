class loginWindowView {
  _opnBtn = document.querySelector(".login__btn");
  _window = document.querySelector(".window__login");
  _overlay = document.querySelector(".overlay");
  _app = document.querySelector(".app");
  _landingPage = document.querySelector(".landing__page");
  _navContainer = document.querySelector(".nav__links");

  constructor() {
    this._addHandlerToggleWindow(
      this._openWindow.bind(this),
      this._closeWindow.bind(this)
    );
  }
  _addHandlerToggleWindow(handler__1, handler__2) {
    this._opnBtn.addEventListener(
      "click",
      function (e) {
        handler__1();
      }.bind(this)
    );
    this._window.addEventListener(
      "click",
      function (e) {
        const target = e.target.closest(".login__btn__close");
        if (!target) return;
        handler__2();
      }.bind(this)
    );
  }
  _addHandlerLogin(handler) {
    this._window.addEventListener(
      "click",
      function (e) {
        const target = e.target.closest(".login__submit__btn");
        if (!target) return;
        const form = target
          .closest(".window__login")
          .querySelector(".login__form");
        const dataArry = [...new FormData(form)];
        const data = Object.fromEntries(dataArry);
        handler(data);
      }.bind(this)
    );
  }
  _openApp() {
    this._closeWindow();
    this._landingPage.classList.add("hidden");
    this._app.classList.remove("hidden");
  }
  _openWindow() {
    this._window.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
    this._window.innerHTML = "";
    this._window.insertAdjacentHTML("afterbegin", this._generateMarkup());
  }
  _closeWindow() {
    this._window.classList.add("hidden");
    this._overlay.classList.add("hidden");
    this._navContainer.classList.remove("reveal__nav");
  }
  _generateMarkup() {
    return `<button class="btn__close login__btn__close">
    &#10006</i>
      </button>
      <h4>Log in account here</h4>
      <form class="login__form" action="">
        <label for="">User-id</label>
        <input name='id' value=''type="text" />
        <label for="">Password</label>
        <input name='password'value=""type="password" />
      </form>
      <input class="login__submit__btn" type="submit"/>`;
  }
}
export default new loginWindowView();
