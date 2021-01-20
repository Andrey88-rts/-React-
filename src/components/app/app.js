import React, { Component } from "react";
import Header from '../header/Header';
import Total from '../total/Total';
import History from '../history/History';
import Operation from '../operation/Operation';

export default class App extends Component {

  state = {
    transactions: [],
    description: '',
    amount: ''
  }

  addTransaction = (bool) => {
    const transactions = [...this.state.transactions];

    transactions.push({
      id: `cmr${(+new Date).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      bool
    });
    this.setState({
      transactions,
      description: '',
      amount: ''
    });
  }

  addAmount = (event) => {
    this.setState({ amount: event.target.value })
  }

  addDescription = (event) => {
    this.setState({ description: event.target.value })
  }



  render() {
    return (
      <>
        <Header title='Кошелек' subtitle='Калькулятор расходов' />
        <main>
          <div className="container">
            <Total />
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

