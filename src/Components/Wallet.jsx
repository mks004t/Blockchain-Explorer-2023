import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
// import Web3 from 'web3';

const Wallet = ({ web3, updateProvider }) => {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [network, setNetwork] = useState();

  // const web3 = new Web3(Web3.givenProvider);
  async function loadAccount() {
    const accounts = await web3.eth.requestAccounts();
    console.log("account");
    setAccount(accounts[0]);
    return accounts[0];
  }

  async function loadBalance(acc) {
    console.log("balance");
    const net = await web3.eth.net.getNetworkType();
    const bal = await web3.eth.getBalance(acc);
    setNetwork(net)
    setBalance((bal / 1e18).toFixed(4));
    return balance;
  }
  
  const connectWallet = (() => {
    updateProvider();
    console.log("kro", web3);
    loadAccount()
      .then((acc) => loadBalance(acc))
      .catch((err) => {
        console.log(new Error(err.message));
      })
    // loadDetails();
  });

  
  return (
    <Box>
      <button style={{ margin: "20px 0" }} onClick={connectWallet}>Connect Wallet</button>
      <h4>Address : {account}</h4>
      <h4>Balance : {balance ? `${balance} (${network})` : ""}</h4>
    </Box >
  )
}

export default Wallet