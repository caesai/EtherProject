import React from 'react';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider());
const version = web3.version.api;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      loaded: false,
      balance: '',
      transactions: []
    };
    this.getListOfTransactions = this.getListOfTransactions.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.checkContract = this.checkContract.bind(this);
  }
  checkContract() {
    return fetch('http://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', {

    })
    .then((response) => {
      return response.json();
    })
    .then((contractABI) => {
      if (contractABI != ''){
        let cntrct = []
        let prop;
        let aBI = JSON.parse(contractABI.result);
        var MyContract = new web3.eth.Contract(aBI, '0x97dce7cdf030d9f0b9df59468b85213298e65af4');
        console.log(MyContract);
      } else {
          console.log("Error" );
      }
    })
  }
  getListOfTransactions() {
    return fetch('http://ropsten.etherscan.io/api?module=account&action=txlist&address=0x97dce7cdf030d9f0b9df59468b85213298e65af4&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken',{

    })
    .then((response) => {
      return response.json();
    })
    .then((data)=>{
      let transactions = data.result;
      this.setState({
        ready: true,
        transactions: transactions
      })
    })
  }
  getBalance(){
    return fetch('https://ropsten.etherscan.io/api?module=account&action=balance&address=0x97dce7cdf030d9f0b9df59468b85213298e65af4&tag=latest&apikey=YourApiKeyToken',{

    })
    .then((response) => {
      return response.json();
    })
    .then((data)=>{
      let balance = data.result;
      this.setState({
        loaded: true,
        balance: balance
      })
    })
  }
  componentDidMount() {
    this.getBalance();
    this.getListOfTransactions();
    this.checkContract();
  }
  render() {
    return(
      <div>
        <h1>Ethereum Project</h1>
        <h2>Balance: {this.state.loaded ? this.state.balance : null}</h2>
        <ul>
          {this.state.ready ? this.state.transactions.map((item, key)=>{
            return (
              <li key={key}>
                <b>blockNumber:</b> {item.blockNumber} <br />
                <b>timeStamp</b> {item.timeStamp} <br />
                <b>hash</b> {item.blockHash} <br />
                <b>value</b> {item.value} <br />
              </li>
            )
          }): null}
        </ul>
      </div>
    )
  }
}
