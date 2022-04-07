import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import Contract from "../../Contracts/AlexeiToken.json"
import {useEffect, useState} from "react";
import { useMoralisWeb3Api } from "react-moralis";
import TransactionData from "../Transactions/Transactions";

function TransferFrom() {
  const { user, account,isAuthenticated, enableWeb3,isWeb3Enabled } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [amount, setamount] = useState(0);
  const [to, setto] = useState("");
  const [from, setfrom] = useState("");
  const [allow, setallow] = useState("");
  const [Transactions, setTransactions] = useState();
  const [Allowloading, setAllowloading] = useState(null);


  const transfer = async (e)=>{
    const option ={
      contractAddress:"0x6B6c186EE83d123609f95E4936f02159F2B7D63a",
      functionName: "transferFrom",
      abi:Contract.abi,
      params:{
        from:from,
        to:to,
        amount: Moralis.Units.ETH(amount)
      },
    }

    console.log("option",option)
    let res = await Moralis.executeFunction(option)
    console.log("Execution:",res)

  }


  const allowance = async (e)=>{
    const option ={
      contractAddress:"0x6B6c186EE83d123609f95E4936f02159F2B7D63a",
      functionName: "allowance",
      abi:Contract.abi,
      params:{
        owner:from,
        spender:account
      },
    }

    console.log("option",option)
    setAllowloading(true)
    let res = await Moralis.executeFunction(option)
    console.log("Execution:",res.toString())
    setallow((res/10**18).toString())
    setAllowloading(false)

  }


  useEffect(async() => {
    

    if(!isWeb3Enabled){
      let res = await enableWeb3()
      }
   
    
  },[isAuthenticated,isWeb3Enabled]);
    return (
      <div className="card">
      <div className="card-header">Transfer amount of tokens from another account if it's approved</div>
      
      <div className="card-body">
      <h5>Account</h5>
      <h6>{account?account:"Please connect your metamask"}</h6>
      </div>

      <br></br>

      <div> 

      <text>From address: </text>
      <input onChange={e=>{setfrom(e.target.value)}} ></input>
      <text>Amount: </text>
      <input onChange={e=>{setamount(e.target.value)}} ></input>
      <text>To address: </text>
      <input onChange={e=>{setto(e.target.value)}} ></input>
      <button onClick={transfer} disabled={!isAuthenticated}>Tranfer</button>
      <br></br>
      <br></br>
      <button onClick={allowance} disabled={!isAuthenticated}>Verify Allowance</button>
      <label> {Allowloading? <div> Loading... </div>: <div> {allow} </div>}</label>
      </div>


      <div >
        <br></br>
        <br></br>
       <TransactionData/>
      </div>

      </div>
    );
  }
  
  export default TransferFrom;
  