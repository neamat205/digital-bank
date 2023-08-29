export const state = {
  account: {},
};
const craeteAccountObject = function (data) {
  return {
    firstName: data.first__name,
    lastName: data.last__name,
    id: data.mobile__number,
    password: data.password,
    movements: [
      {
        type: "deposit",
        amount: 500,
        date: data.date,
      },
    ],
    country: data.country,
    get fullName() {
      return `${this.firstName.toUpperCase()} ${this.lastName.toUpperCase()}`;
    },
  };
};
const stateAccount = function (account) {
  state.account = account;
};
const createCreditMov = function (data) {
  return {
    type: "deposit",
    amount: +data.amount,
    date: data.date,
  };
};
const createDebitMov = function (data) {
  return {
    type: "withdrawal",
    amount: +data.amount,
    date: data.date,
  };
};
const loadAccounts = function () {
  let accounts = [];
  const storage = localStorage.getItem("accounts");
  if (storage) accounts = JSON.parse(storage);
  if (!storage) accounts = [];
  return accounts;
};
const findAccount = function (accounts, id) {
  return accounts.find((acc) => acc.id === id);
};
export const sortMovements = function () {
  state.account.movements = state.account.movements.sort(
    (mov1, mov2) => mov1 - mov2
  );
};
const storeAccounts = function (accounts) {
  localStorage.setItem("accounts", JSON.stringify(accounts));
};
export const createAccount = function (newAcc) {
  const accounts = loadAccounts();
  const newAccObj = craeteAccountObject(newAcc);
  if (accounts.some((acc) => acc.id === newAccObj.id)) return true;
  accounts.push(newAccObj);
  storeAccounts(accounts);
  return false;
};
export const loadAccount = function (user) {
  const accounts = loadAccounts();
  const account = accounts.find(
    (acc) => acc.password === user.password && acc.id === user.id
  );
  if (!account) return false;
  // account.movements.reverse();
  state.account = account;
  return true;
};
export const addMoney = function (newAdd) {
  if (+newAdd.amount <= 0) return false;
  const accounts = loadAccounts();
  const account = accounts.find((acc) => acc.id === state.account.id);
  account.movements.push(createCreditMov(newAdd));
  storeAccounts(accounts);
  loadAccount(account);
  return true;
};
export const transferMoney = function (newTrans) {
  const newCreditMov = createCreditMov(newTrans);
  const newDebitMov = createDebitMov(newTrans);
  const accounts = loadAccounts();
  const accountTo = findAccount(accounts, newTrans.id);
  const accountFrom = findAccount(accounts, state.account.id);
  const currentBalance = accountFrom.movements.reduce((sum = 0, mov) => {
    return (sum = sum + (mov.type === "deposit" ? mov.amount : -mov.amount));
  }, 0);
  if (
    accountTo.id === state.account.id ||
    !accountTo ||
    +newTrans.amount < 0 ||
    !(currentBalance >= +newTrans.amount)
  )
    return false;
  accountTo.movements.push(newCreditMov);
  accountFrom.movements.push(newDebitMov);
  console.log(currentBalance);
  storeAccounts(accounts);
  loadAccount(accountFrom);
  return true;
};
export const closeAccount = function (closeAcc) {
  if (
    state.account.id !== closeAcc.id ||
    state.account.password !== closeAcc.password
  )
    return false;
  const accounts = loadAccounts();
  const index = accounts.findIndex((acc) => acc.id === closeAcc);
  console.log(accounts[index]);
  accounts.splice(index, 1);
  console.log(accounts);
  storeAccounts(accounts);
  return true;
};
export const sortMovs = function () {
  state.account.movements.reverse();
};
