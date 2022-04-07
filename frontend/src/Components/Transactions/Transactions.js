import { useMoralis, useMoralisQuery} from "react-moralis";
import Moralis from "moralis";
import Contract from "../../Contracts/AlexeiToken.json"
import {useEffect, useState} from "react";
import { useMoralisWeb3Api } from "react-moralis";
import 'bootstrap/dist/css/bootstrap.css';

function TransactionData() {
  const th ={
    "font-family": "Arial",
    "font-size": "10px",
    "padding": "5px",
  }
  
  const th2 ={
    "font-family": "Arial",
    "font-size": "6px",
    "padding": "1px",
  }

  const {  web3, account,isAuthenticated, enableWeb3,isWeb3Enabled } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [Transactions, setTransactions] = useState();



  useEffect(async() => {
    
    if(!isWeb3Enabled){
      let res = await enableWeb3()
      }
   
      if(isAuthenticated ){

        try{
        
        
          console.log("account: ",account)
          const query = new Moralis.Query("BscTokenTransfers");
          //query.equalTo("from_address", account);
          let res = await query.find()
          console.log("data:", res)
          await res.reverse()
          setTransactions(res)
         
        }
        catch(err){
          console.log("error get ethAddress: ",err)
        }
      }
    
  },[isAuthenticated]);


    return (

      
      <div >
      <div >
  <h2 >Transactions</h2>         
  <div className="table-responsive"> 
  <table className="table table-bordered table-condensed table-hover">
    <thead>
      <tr>
        
        <th>Timestamp</th>
        <th>Transaction Hash </th>
        <th>From  </th>
        <th>To </th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      
      {}
      {Transactions?Transactions.map((trans)=>{return(<tr > <td style={th}> {trans.attributes.updatedAt.toString().split(' ').slice(0,6).toString()}</td> <td style={th}><a href={"https://testnet.bscscan.com/tx/"+trans.attributes.transaction_hash}>{trans.attributes.transaction_hash}</a></td>  <td style={th}>{trans.attributes.from_address}</td> <td style={th}>{trans.attributes.to_address}</td>   <td style={th}>{trans.attributes.decimal.value.$numberDecimal}</td> </tr>)}):isAuthenticated?"Loading ...":<a href="/">Please authenticate with metamask</a>}
       
    </tbody>
  </table>
  </div>
</div>
      </div>
    );
  }
  
  export default TransactionData;
  