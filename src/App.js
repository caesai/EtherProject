import React from 'react';
import Web3 from 'web3';
import ProviderEngine from 'web3-provider-engine';
import FixtureSubprovider from 'web3-provider-engine/subproviders/fixture.js';
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js';

const engine = new ProviderEngine();
const initialWeb3 = new Web3(engine);
engine.addProvider(new FixtureSubprovider({
  web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
  net_listening: true,
  eth_hashrate: '0x00',
  eth_mining: false,
  eth_syncing: true
}));

engine.addProvider(new RpcSubprovider({
  rpcUrl: 'https://testrpc.metamask.io/'
}))
console.log(global.web3);

const web3 = new Web3(global.web3.currentProvider);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      balance: ''
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
        console.log(error);
      }
    })
  }
  getAccounts() {
    web3.eth.getAccounts((err,accounts) => {
      if (!err) {
        console.log(accounts);
        this.setState({
          address:  accounts[0]
        });
      } else {
        console.log(err);
      }
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
