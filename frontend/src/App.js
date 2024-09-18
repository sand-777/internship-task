import React from "react";
import TopProducts from "./components/TopProducts";
import TopCustomers from "./components/TopCustomers";
import { Container, Typography, Paper } from "@mui/material";
import "./App.css";

const App = () => {
  return (
    <Container maxWidth="lg" className="App">
      <Typography variant="h2" component="h1" gutterBottom>
        Shopify Store Insights
      </Typography>
      <Paper elevation={3} className="section">
        <TopProducts />
      </Paper>
      <Paper elevation={3} className="section">
        <TopCustomers />
      </Paper>
    </Container>
  );
};

export default App;
