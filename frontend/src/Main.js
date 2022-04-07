import { Routes, Route } from "react-router-dom";
import About from "./Components/About/About";
import Approve from "./Components/Approve/approve";
import Contact from "./Components/Contact/Contact";
import Error from "./Components/Error/Error"
import MainPage from "./Components/MainPage/MainPage"
import Transfer from "./Components/Tranfer/transfer";
import TransactionData from "./Components/Transactions/Transactions";
import TransferFrom from "./Components/Transferfrom/transferfrom";

function Main() {
  return (
        <div>
        
        <Routes>

          <Route exact path="/"  element={<MainPage />} />
          <Route exact path="/transactions" element={<TransactionData />} />
            <Route exact path="/transfer" element={<Transfer />} />
            <Route exact path="transferfrom" element={<TransferFrom />} />
            <Route exact path="approve" element={<Approve />} />
            <Route path="*" element={<Error />} />
          
        </Routes>
      
      </div>
  );
}

export default Main;
