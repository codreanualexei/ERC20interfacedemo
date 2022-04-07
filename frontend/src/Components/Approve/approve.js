import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import Contract from "../../Contracts/AlexeiToken.json"
import {useEffect, useState} from "react";
import { useMoralisWeb3Api } from "react-moralis";
import TransactionData from "../Transactions/Transactions";

function Approve() {
  const { user, account,isAuthenticated, enableWeb3,isWeb3Enabled } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [amount, setamount] = useState(0);
  const [to, setto] = useState(null);
  const [ApproveLoading, setApproveLoading] = useState(false);

  const approve = async (e)=>{
    const option ={
      contractAddress:"0x6B6c186EE83d123609f95E4936f02159F2B7D63a",
      functionName: "approve",
      abi:Contract.abi,
      params:{
        spender:to,
        amount: Moralis.Units.ETH(amount)
      },
    }

    console.log("option",option)
    setApproveLoading(true)
    let res = await Moralis.executeFunction(option)
    console.log("Execution:",res.toString())
    setApproveLoading(false)

  }

  useEffect(async() => {
    

    if(!isWeb3Enabled){
      let res = await enableWeb3()
      }
   
    
  },[isWeb3Enabled]);

    return (
      <div className="card">
      <div className="card-header">You can approve another account to spend amount of tokens</div>
      
      <div className="card-body">
      <h5>Account</h5>
      <h6>{account?account:"Please connect your metamask"}</h6>
      </div>

      <br></br>

      <div> 
      <text>Amount: </text>
      <input onChange={e=>{setamount(e.target.value)}} ></input>
      <text>For address: </text>
      <input onChange={e=>{setto(e.target.value)}} ></input>
      <button onClick={approve} disabled={!isAuthenticated}>Tranfer</button>
      <label>{ApproveLoading?"Loading..." : "Done, Please check the transactions list" }</label>
      </div>

      </div>
    );
  }
  
  export default Approve;
  