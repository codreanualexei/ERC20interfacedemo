import Moralis from "moralis";

const Merge = ()=> {

  Moralis.onAccountChanged( async (account) => {
    alert("Wallet account was changed")
    
      //await Moralis.link(account);
  
  });


} 

export {Merge}