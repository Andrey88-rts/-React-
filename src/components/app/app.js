import React, { Component } from "react";
import Header from '../header/Header';
import Total from '../total/Total';
import History from '../history/History';
import Operation from '../operation/Operation';

export default class App extends Component {

  state = {
    transactions: JSON.parse(localStorage.getItem('calcMoney1')) || [],
    description: '',
    amount: '',
    resultIncome: 0,
    resultExpenses: 0,
    totalBalance: 0
  }

  UNSAFE_componentWillMount() {
    this.getTotal();
  }

  componentDidUpdate() {
    this.addLocalStorage();
  }

  addTransaction = (bool) => {
    const transactions = [...this.state.transactions,
    {
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: parseFloat(this.state.amount),
      bool
    }
    ];

    this.setState({
      transactions,
      description: '',
      amount: ''
    },
      this.getTotal
    );
  }

  addAmount = (event) => {
    this.setState({ amount: event.target.value })
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


  addLocalStorage() {
    localStorage.setItem('calcMoney1', JSON.stringify(this.state.transactions));
  }

  delTransaction = (id) => {
    const transactions = this.state.transactions.filter(item => item.id !== id);
    this.setState({ transactions }, this.getTotal);
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
            <History
              transactions={this.state.transactions}
              delTransaction={this.delTransaction} />
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

