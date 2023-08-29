class appView {
  _timer;
  _data;
  _parentEl = document.querySelector(".app");
  _landingPage = document.querySelector(".landing__page");
  _btnLogout = document.querySelector(".log__out__btn");
  _currBalance = document.querySelector(".current__balance__amount");
  _cashIn = document.querySelector(".cash__in__amount");
  _cashOut = document.querySelector(".cash__out__amount");
  _formTransfer = document.querySelector(".transfer__form");
  _formAddMoney = document.querySelector(".addmoney__form");
  _formClose = document.querySelector(".delete__form");
  _movTitleDate = document.querySelector(".date");
  _movContainer = document.querySelector(".movements");
  _title = document.querySelector(".title");
  _btnSorting = document.querySelector(".sorting");
  _counter = document.querySelector(".counter");
  constructor() {
    this._addHandlerCloseApp(this._closeApp.bind(this));
  }
  putData(newData) {
    this._data = newData;
  }
  _startCount() {
    const counter = document.querySelector(".counter");
    let sec = 0;
    this._timer = setInterval(function () {
      sec++;
      const minutes = String(Math.trunc(sec / 60)).padStart(2, 0);
      const seconds = String(sec % 60).padStart(2, 0);
      const time = `${minutes}:${seconds}`;
      counter.firstChild.nodeValue = time;
    }, 1000);
  }
  _renderMovTitleDate() {
    const date = new Date();
    this._movTitleDate.firstChild.nodeValue = date.toDateString();
  }
  _addHandlerSorting(handler) {
    this._btnSorting.addEventListener("click", function () {
      console.log(this);
      const sort = this.dataset.sort;
      handler(sort);
    });
  }
  _renderMovements() {
    this._movContainer.innerHTML = "";
    const markup = this._data.movements
      .map((mov) => {
        return `<li class="movemen ${mov.type}">
            <p class="movement__type">${mov.type.toUpperCase()}</p>
            <p class="movement__date">${new Date(mov.date).toDateString()}</p>
            <p class="movement__value">${
              mov.type === "deposit" ? mov.amount : -mov.amount
            } BDT</p>
          </li>`;
      })
      .join("");
    this._movContainer.insertAdjacentHTML("afterbegin", markup);
  }
  _renderMovement() {
    this._movContainer.insertAdjacentHTML("afterbegin", this._generateMarkup());
  }
  _generateMarkup() {
    const mov = this._data.movements[this._data.movements.length - 1];
    return `<li class="movement ${mov.type}">
            <p class="movement__type">${
              mov.type === "withdrawal"
                ? `${mov.type.slice(0, 7).toUpperCase()}..`
                : mov.type.toUpperCase()
            }</p>
            <p class="movement__date">${new Date(mov.date).toDateString()}</p>
            <p class="movement__value">${
              mov.type === "deposit" ? mov.amount : -mov.amount
            } BDT</p>
          </li>`;
  }
  _closeApp() {
    this._parentEl.classList.add("hidden");
    this._landingPage.classList.remove("hidden");
    clearInterval(this._timer);
    this._counter.firstChild.nodeValue = "00:00";
  }
  _addHandlerCloseApp(handler) {
    this._btnLogout.addEventListener("click", handler);
    clearInterval(this._timer);
  }
  _renderTitle() {
    this._title.firstChild.nodeValue = `WELCOME ! ❤️ ${this._data.fullName} ❤️`;
  }
  _renderCashIn() {
    const amount = this._data.movements
      .filter((mov) => mov.type !== "withdrawal")
      .reduce((sum = 0, mov) => {
        return (sum = sum + mov.amount);
      }, 0);
    this._cashIn.firstChild.nodeValue = `${amount} BDT`;
    this._data.value;
  }
  _renderCashOut() {
    const amount = this._data.movements
      .filter((mov) => mov.type !== "deposit")
      .reduce((sum = 0, mov) => {
        return (sum = sum + mov.amount);
      }, 0);
    this._cashOut.firstChild.nodeValue = `${amount} BDT`;
  }
  _renderCurrentBalance() {
    const amount = this._data.movements.reduce((sum = 0, mov) => {
      return (sum = sum + (mov.type === "deposit" ? mov.amount : -mov.amount));
    }, 0);
    this._currBalance.firstChild.nodeValue = `${amount} BDT`;
  }
  _addHandlerAddMoney(handler) {
    this._formAddMoney.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        const dataArr = [...new FormData(this._formAddMoney)];
        const data = Object.fromEntries(dataArr);
        data.date = new Date();
        handler(data);
      }.bind(this)
    );
  }
  _addHandlerTransMoney(handler) {
    this._formTransfer.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        const dataArr = [...new FormData(this._formTransfer)];
        const data = Object.fromEntries(dataArr);
        data.date = new Date();
        handler(data);
      }.bind(this)
    );
  }
  _addHandlerAccClose(handler) {
    this._formClose.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(this);
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      data.date = new Date();
      handler(data);
    });
  }
}
export default new appView();
