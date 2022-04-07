import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <MoralisProvider serverUrl="https://vsesznizeba7.usemoralis.com:2053/server" appId="WaqE6qaCHk6kxomTBZqxJMfnDJyGfOtf2ymjzAXF">
    <App />
    </MoralisProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
