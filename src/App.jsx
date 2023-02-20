import { Stack, Box, Container, CircularProgress } from '@mui/material';
import Wallet from './components/Wallet';
import { useEffect, useState } from 'react'
import Web3 from 'web3';
import './App.css'
import Search from './components/Search';
import Result from './Components/Result';
import Heading from './Components/Heading';

function App() {
  const [loading, setLoading] = useState(true);


  const [result, setResult] = useState("");
  const [type, setType] = useState("")

  const [provider, setProvider] = useState("https://fragrant-thrilling-owl.ethereum-goerli.discover.quiknode.pro/c01e3d1b82d48d65698422207dd6cba6153b6953/")
  const [web3, setWeb3] = useState(new Web3(provider));

  const updateProvider = () => {
    console.log("Updating1", provider)
    setProvider(Web3.givenProvider);
    setWeb3(new Web3(provider))
    console.log("Updating2", provider)
  }

  useEffect(() => {
    setLoading(false)
  }, [result])

  const handleSearch = (input, type) => {
    setLoading(true);
    console.log("provider", provider)
    if (isNaN(input)) { setLoading(false); setResult("Input is not a Number or Hash!"); return; }
    console.log('type :>> ', type);
    if (type === "block") {
      web3.eth.getBlock(input).then((block) => {
        if (block !== null) {
          console.log("Block is ", block);
          const res = { hash: block.hash, number: block.number, gasLimit: block.gasLimit, gasUsed: block.gasUsed, difficulty: block.difficulty, parent: block.parentHash, timestamp: block.timestamp, firstTransation: block.transactions[0] };
          setResult(res);
        }
        else {
          console.log("No block found")
          setResult(`No ${type} found`);
        }
        setType("Block");

      }).catch((err) => {
        const errorMessage = new Error(err.message);
        console.log("Block not found\n", errorMessage);
        setResult("Invalid Input!")
      });;
    }
    else {
      web3.eth.getTransaction(input).then((transaction) => {
        if (transaction !== null) {
          console.log("Transaction is ", transaction);
          const res = { hash: transaction.hash, gas: transaction.gas, gasPrice: transaction.gasPrice, blockHash: transaction.blockHash, blockNumber: transaction.blockNumber, from: transaction.from, to: transaction.to };
          setResult(res);
        } else {
          console.log("No transaction found")
          setResult(`No ${type} found`);
        }
        setType("Transaction")
      }).catch((err) => {
        const errorMessage = new Error(err.message);
        console.log("Transaction not found\n", errorMessage);
        setResult("Invalid Input!")
      });
    }
  }

  return (
    <Container maxWidth="xxl" sx={{ margin: "0 !important", padding: "0 !important", width: "100vw", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "space-between", }}>

     
        <Box className="border" sx={{ width: "40vw" }}>
          <Wallet web3={web3} setProvider={setProvider} updateProvider={updateProvider} />
        </Box>

        <Box className="border" sx={{ flexDirection: "column", display: "flex", alignItems: "flex-start", justifyContent: "space-evenly", width: "600px" }}>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Heading margin={"-15px 0 5px 0px"} text={" Search "} />
          </Box>
          <Search headText={'Search by Block no / Hash'} handleSearch={handleSearch} />
          <Search headText={'Search by Transaction Hash'} handleSearch={handleSearch} />
        </Box>
       
      
       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        {loading && <CircularProgress sx={{ position: "relative", top: "30%", marginTop: "40px", zIndex: "100" }} />}
        {!loading &&
          result.length !== 0 ? <Box sx={{ textAlign: "left", width: "87vw", border: "1px solid gray", borderRadius: "10px", margin: "auto", padding: "30px" }}>
          <Result type={type} result={result} />
        </Box> : <></>
        }
      </Box>
    </Container>
  )
}

export default App
