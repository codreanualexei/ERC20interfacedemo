import { useMoralis  } from "react-moralis";
import Moralis from "moralis";
import Contract from "../../Contracts/AlexeiToken.json"
import {useState,useEffect} from "react";
import Transfer from "../Tranfer/transfer";
import "./MainPage.css"
import {Merge} from "../MergeAccount/mergeaccount";

function MainPage() {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout,hasAuthError,authError,enableWeb3,isWeb3Enabled } = useMoralis();
  const [Addr, setAddr] = useState('You are not authenticated, Please connect your Metamask wallet')
  const [Balance, setBalance] = useState()


  const login = async () => {
    if (!isAuthenticated) {
         await authenticate()
         .catch((err)=>{
           alert("error connection of you account, please setup your!")
         })

    }

  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
    setAddr('You are not authenticated, Please connect your Metamask wallet')
    setBalance(null)
  }

  //Merge()

  const getBalance = async () => {
    
    const option ={
      contractAddress:"0x6B6c186EE83d123609f95E4936f02159F2B7D63a",
      functionName: "balanceOf",
      abi:Contract.abi,
      params:{
        account:Addr
      }
    }

    console.log("option",option)
    let res =  Moralis.executeFunction(option)

    return res
  }

  useEffect(async() => {
    
    if(isAuthenticated){
      try{
        let addr = await user.get("ethAddress")
        setAddr(addr)

      }
      catch(err){
        console.log("error get ethAddress: ",err)
      }
    }

    if(isWeb3Enabled && isAuthenticated){

      try{
      let balance = await getBalance()
      if(!balance)
      console.log("Balance2:",(balance/10**18).toString())
      balance = (balance/10**18).toString()+" ATOK"
      setBalance(balance)
      console.log("Balance2",Balance)
      }
      catch(err){
        console.log("err: ",err)
        window.location.reload(false);
      }
    }else{
      await enableWeb3()
    }
      
  },[isAuthenticated,isWeb3Enabled,isAuthenticating]);

    return (
      <body className="background-pages">
      {isAuthenticating? (<div> Authenticating ...</div>):

      (
      <div className="card" >
      <div className="card-header">Authentication</div>
      <div className="card-body">
      <h5>Account</h5>
      <h6 >{hasAuthError?authError:Addr} </h6>
       {  Balance? (<div > Balance: {Balance} </div>) : (<div> No data</div>) }  
      <br></br>
      <button onClick={login} disabled={isAuthenticated} >Metamask Login</button>
      <button onClick={logOut} disabled={!isAuthenticated}>Logout</button>
      </div>
      </div>
      ) }

      </body>
    );
  }
  
  export default MainPage;
  