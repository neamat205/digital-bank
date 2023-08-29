import "core-js";
import { MESS__DUR } from "./config";
import testimonialView from "./view/testimonialView";
import navView from "./view/navView";
import headerView from "./view/headerView";
import operationView from "./view/operationView";
import sectionView from "./view/sectionView";
import loginWindowView from "./view/loginWindowView";
import uploadWindowView from "./view/uploadWindowView";
import appView from "./view/appView";
import * as model from "./model";
const renderApp = function () {
  appView.putData(model.state.account);
  appView._renderCurrentBalance();
  appView._renderTitle();
  appView._renderMovTitleDate();
  appView._renderCashIn();
  appView._renderCashOut();
  model.sortMovs();
  appView._renderMovements();
};
const controlCreateAccount = function (newAcc) {
  const hasExist = model.createAccount(newAcc);
  if (hasExist) uploadWindowView._renderExistMessage();
  if (!hasExist) uploadWindowView._renderSuccessMessage();
  setTimeout(function () {
    uploadWindowView._closeWindow();
  }, MESS__DUR * 1000);
};
const controlLogin = function (user) {
  const isLogin = model.loadAccount(user);
  if (!isLogin) return;
  loginWindowView._openApp();

  appView._startCount();
  renderApp();
};
const controlAddMoney = function (newAdd) {
  const isAdd = model.addMoney(newAdd);
  if (!isAdd) return;
  console.log(isAdd);
  renderApp();
};
const controlTransferMoney = function (newTrans) {
  const isTrans = model.transferMoney(newTrans);
  if (!isTrans) return;
  console.log(isTrans);
  renderApp();
};
const controlCloseAccount = function (closeAcc) {
  const isClosed = model.closeAccount(closeAcc);
  if (!isClosed) return;
  appView._closeApp();
};
const controlSorting = function (newSort) {
  model.sortMovs();

  appView._renderMovements();
};
const init = function () {
  appView._addHandlerSorting(controlSorting);
  appView._addHandlerAccClose(controlCloseAccount);
  appView._addHandlerTransMoney(controlTransferMoney);
  appView._addHandlerAddMoney(controlAddMoney);
  loginWindowView._addHandlerLogin(controlLogin);
  uploadWindowView._addhandlerCreateAccount(controlCreateAccount);
};

init();
