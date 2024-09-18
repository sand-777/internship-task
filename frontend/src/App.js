import React from "react";
import TopProducts from "./components/TopProducts";
import TopCustomers from "./components/TopCustomers";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>Shopify Store Insights</h1>
      <TopProducts />
      <TopCustomers />
    </div>
  );
};

export default App;
