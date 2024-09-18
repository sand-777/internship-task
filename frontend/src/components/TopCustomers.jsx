import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const TopCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/top-customers`
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching top customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCustomers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top 5 Most Valuable Customers
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {customers.map((customer) => (
            <ListItem
              key={customer.customer_id}
              component={Card}
              variant="outlined"
              sx={{ mb: 1 }}
            >
              <CardContent>
                <Typography variant="h6">{customer.name}</Typography>
                <ListItemText primary={`$${customer.total_spent.toFixed(2)}`} />
              </CardContent>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default TopCustomers;
