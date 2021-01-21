import React, { Component } from "react";
import Header from '../header/Header';
import Total from '../total/Total';
import History from '../history/History';
import Operation from '../operation/Operation';

export default class App extends Component {

  state = {
    transactions: [],
    description: '',
    amount: '',
    resultIncome: 0,
    resultExpenses: 0,
    totalBalance: 0
  }

  addTransaction = (bool) => {
    const transactions = [...this.state.transactions,
    {
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      bool
    }
    ];

    this.setState({
      transactions,
      description: '',
      amount: ''
    }, this.getTotal);
  }

  addAmount = (event) => {
    this.setState({ amount: parseFloat(event.target.value) })
  }

  addDescription = (event) => {
    this.setState({ description: event.target.value })
  }

  getIncome = () =>
    this.state.transactions.reduce((acc, item) => item.bool ? acc + item.amount : acc, 0)


  getExpenses = () =>
    this.state.transactions.reduce((acc, item) => !item.bool ? acc + item.amount : acc, 0)



  getTotal() {
    const resultIncome = this.getIncome();
    const resultExpenses = this.getExpenses();

    const totalBalance = resultIncome - resultExpenses;

    this.setState({
      resultIncome,
      resultExpenses,
      totalBalance
    })
  }

  render() {
    return (
      <>
        <Header title='Кошелек' subtitle='Калькулятор расходов' />
        <main>
          <div className="container">
            <Total resultExpenses={this.state.resultExpenses}
              resultIncome={this.state.resultIncome}
              totalBalance={this.state.totalBalance} />
            <History transactions={this.state.transactions} />
            <Operation
              addTransaction={this.addTransaction}
              addAmount={this.addAmount}
              addDescription={this.addDescription}
              description={this.state.description}
              amount={this.state.amount}
            />
          </div>
        </main>
      </>
    )
  }

}

