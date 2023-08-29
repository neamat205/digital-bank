class uploadWindowView {
  _overlay = document.querySelector(".overlay");
  _openBtns = document.querySelectorAll(".upload__btn");
  _window = document.querySelector(".window__upload");
  _navContainer = document.querySelector(".nav__links");
  constructor() {
    this._addHandlerWindowOpen(this._openWindow.bind(this));
    this._addHandlerWindowClose(this._closeWindow.bind(this));
  }
  _addhandlerCreateAccount(handler) {
    this._window.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        const target = e.target.closest(".upload__btn__submit");
        if (!target) return;
        const form = e.target
          .closest(".window__upload")
          .querySelector(".upload__form");
        const dataArr = [...new FormData(form)];
        if (!dataArr.every((entry) => entry[1] !== "")) return;
        const data = Object.fromEntries(dataArr);
        data.date = new Date();
        handler(data);
      }.bind(this)
    );
  }
  _renderSuccessMessage() {
    const markup =
      "<p class='success__message'style='font-size:2rem'>&#128522 Congratulations ! You have successfully created your account</p>";
    this._window.innerHTML = "";
    this._window.insertAdjacentHTML("afterbegin", markup);
  }
  _renderExistMessage() {
    const markup =
      "<p class='exist__message' style='font-size:2rem'>&#128540 You already have an account</P>";
    this._window.innerHTML = "";
    this._window.insertAdjacentHTML("beforeend", markup);
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
  _addHandlerWindowClose(handler) {
    this._window.addEventListener("click", function (e) {
      console.log(e);
      const target = e.target.closest(".upload__btn__close");
      if (!target) return;
      handler();
    });
  }
  _addHandlerWindowOpen(handler) {
    this._openBtns.forEach((btn) =>
      btn.addEventListener("click", handler.bind(this))
    );
  }
  _generateMarkup() {
    return `
      <button class=" btn__close upload__btn__close">
       &#10006</i>
      </button>
  <h2 class="upload__header">Open your bank account in just 5 minutes</h2>
      <form action="" class="upload__form">
        <label>First name</label>
        <input
          name="first__name"
          value=""
          type="text"
          placeholder=""
        />
        <label>Last name</label>
        <input
          name="last__name"
          value=""
          type="text"
          placeholder=""
        />
        <label>Password</label>
        <input
          name="password"
          value=""
          type="number"
          placeholder=""
        />
        <label>Mobile-number</label>
        <input
          name="mobile__number"
          value=""
          type="text"
          placeholder=""
        />
        <label for="country">Country</label>
        <select name="country">
          <option value="Bangladesh">Bangladesh</option>
          <option value="USA">USA</option>
          <option value="Any Country in Europe">Any Country in Europe</option>
        </select>
      </form>
      <button class="upload__btn__submit">Submit</button>
 `;
  }
}
export default new uploadWindowView();
