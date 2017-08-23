import React from 'react';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider());
const version = web3.version.api;

export default class App extends React.Component {
  constructor(props) {
    super(props);
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
  componentDidMount() {
    this.checkContract();
  }
  render() {
    return(
      <div>
        <h1>Ethereum Project</h1>
        <ul>

        </ul>
      </div>
    )
  }
}
