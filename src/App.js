import React from 'react';
import Web3 from 'web3';

const web3 = new Web3(window['web3'].currentProvider);
const version = web3.version.api;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      balance: '',
    };
    this.getBalance = this.getBalance.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
  }
  getBalance() {
    web3.eth.getBalance('0x189417951DFaD6D665571D893a3C505A821aECAe', (error, result) => {
      if (!error) {
        this.setState({
          balance: result.toNumber()
        });
      } else {
        console.error(error);
      }
    })
  }
  getAccounts() {
    web3.eth.getAccounts((err,accounts) => {
      this.setState({
        address:  accounts[0]
      });
    });
  }
  componentDidMount() {
    this.getAccounts();
    this.getBalance();
  }
  render() {
    return(
      <div>
        <h1>Ethereum Project</h1>
        <h3>Address: {this.state.address ? this.state.address: null}</h3>
        <h3>Balance: {this.state.balance ? this.state.balance : null}</h3>
        <ul>
        </ul>
      </div>
    )
  }
}
