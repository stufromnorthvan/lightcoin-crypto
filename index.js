// let balance = 500.00;

class Account {

  constructor(name) {
    this.name = name;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {


  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      console.log(`Insufficient Funds. You cannot withdraw`, this.amount, "You only have", this.account.balance)
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance > this.amount);
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

// OLD TESTS:

// t1 = new Withdrawal(50.25);
// t1.commit();
// console.log('Transaction 1:', t1, "New Balance: ", balance);

// t2 = new Withdrawal(9.99);
// t2.commit();
// console.log('Transaction 2:', t2, "New Balance: ", balance);

// t3 = new Deposit(9.99);
// t3.commit();
// console.log('Transaction 3:', t3, "New Balance: ", balance);

const myAccount = new Account("stu da money god");
console.log(`New account created for ${myAccount.name}. Your initial balance is ${myAccount.balance}, cause you haven't made a deposit yet`);
const firstDeposit = new Deposit(400.67, myAccount);
firstDeposit.commit();
console.log(`You made a deposit of `, myAccount.transactions[0].amount, ` at `, myAccount.transactions[0].time);
const badWithdrawal = new Withdrawal(500, myAccount)
badWithdrawal.commit();
// console.log(`You made a withdrawal of `, myAccount.transactions[1].amount, ` at `, myAccount.transactions[1].time);
console.log(firstDeposit.account.name, " Final Balance: ", Number(myAccount.balance.toFixed(2)));
