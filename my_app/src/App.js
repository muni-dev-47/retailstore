import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Routes from './RetailMarket/Routes/Routes';
import "./App.css";
import { Provider } from "react-redux";
import { store } from './RetailMarket/Redux/store';
import Login from './RetailMarket/Components/Login';
function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
