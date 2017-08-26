import React from 'react';
import Web3 from 'web3';
import abi from './Abi.json';

const web3 = new Web3(global.web3.currentProvider);
const contractAddress = '0x97DCE7cdF030d9F0B9Df59468B85213298E65Af4';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      balance: '',
      contract: contractAddress,
      votes: {}
    };
    this.getContractData = this.getContractData.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
  }
  getAccounts() {
    web3.eth.getAccounts((err,accounts) => {
      if (!err) {
        this.setState({
          address:  accounts[0]
        });
      } else {
        console.log(err);
      }
    });
  }
  getContractData(index) {
    const contract = web3.eth.contract(abi).at(contractAddress);
    console.log(contract);
    contract.votes(index,(resp, smth) => {
      this.setState({
        votes: {
          [index]: smth.c[0]
        }
      });
    });
  }
  componentDidMount() {
    this.getAccounts();
    this.getContractData(0);
  }
  render() {
    return(
      <div>
        <h1>Ethereum Project</h1>
        <h3>Address: {this.state.address ? this.state.address: null}</h3>
        <h3>Contract: {this.state.contract ? this.state.contract : null}</h3>
        <h3>Communities:
          <br/> 0: {this.state.votes['0'] ? this.state.votes['0'] : null}
          <br/> 1: {this.state.votes['1'] ? this.state.votes['1'] : null}</h3>
        <ul>
        </ul>
      </div>
    )
  }
}
