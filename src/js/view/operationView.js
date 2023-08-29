class operationView {
  _btnContainer = document.querySelector(".operation__btns");
  _operations = document.querySelectorAll(".operation");
  _btns = document.querySelectorAll(".operation__btn");
  constructor() {
    this._addHandlerActive(
      this._activeBtn.bind(this),
      this._activeOperation.bind(this)
    );
  }

  _addHandlerActive(handler__1, handler__2) {
    this._btnContainer.addEventListener(
      "click",
      function (e) {
        const targetPage = e.target.dataset.operation;
        const btnClicked = e.target;
        handler__1(btnClicked);
        handler__2(targetPage);
      }.bind(this)
    );
  }
  _activeBtn(btn) {
    btn.classList.add("active__btn");
    this._btns.forEach((_btn) => {
      if (btn === _btn) return;
      _btn.classList.remove("active__btn");
    });
  }
  _activeOperation(page) {
    this._operations.forEach((operation) => {
      const currPage = operation.dataset.operation;
      if (currPage === page) {
        operation.classList.add("active__operation");
        return;
      }
      operation.classList.remove("active__operation");
    });
  }
}
export default new operationView();
