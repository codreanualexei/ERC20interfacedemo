import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import Contract from "../../Contracts/AlexeiToken.json"
import {useEffect, useState} from "react";
import { useMoralisWeb3Api } from "react-moralis";
import TransactionData from "../Transactions/Transactions";

function Transfer() {
  const { user, account,isAuthenticated, enableWeb3,isWeb3Enabled } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [amount, setamount] = useState(0);
  const [to, setto] = useState("");
  const [Transactions, setTransactions] = useState();

  const transfer = async (e)=>{
    const option ={
      contractAddress:"0x6B6c186EE83d123609f95E4936f02159F2B7D63a",
      functionName: "transfer",
      abi:Contract.abi,
      params:{
        to:to,
        amount: Moralis.Units.ETH(amount)
      },
    }

    console.log("option",option)
    let res = await Moralis.executeFunction(option)
    console.log("Execution:",res)

  }

  const fetchTransactions = async () => {
    const options = {
      chain: "bsc testnet",
      address: account,
      order: "desc",
      from_block: "0",
    };

    const bscTransactions = await Web3Api.account.getTransactions(options);
    return bscTransactions
  };

  useEffect(async() => {
    

    if(!isWeb3Enabled){
      let res = await enableWeb3()
      }
   
      if(1){

        try{
        
          let trans = await fetchTransactions()
          console.log(trans.result)
          if(trans.result)
          setTransactions(trans.result)
          else console.log("no transactions")
        
          
  
        }
        catch(err){
          console.log("error get ethAddress: ",err)
        }
      }
    
  },[isAuthenticated,isWeb3Enabled]);
    return (
      <div className="card">
      <div className="card-header">You can transfer amount of money to another account</div>
      
      <div className="card-body">
      <h5>Account</h5>
      <h6>{account?account:"Please connect your metamask"}</h6>
      </div>

      <br></br>

      <div> 
      <text>Amount: </text>
      <input onChange={e=>{setamount(e.target.value)}} ></input>
      <text>To address: </text>
      <input onChange={e=>{setto(e.target.value)}} ></input>
      <button onClick={transfer} disabled={!isAuthenticated}>Tranfer</button>
      </div>


      <div >
        <br></br>
        <br></br>
       <TransactionData/>
      </div>

      </div>
    );
  }
  
  export default Transfer;
  