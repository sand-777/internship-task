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

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/top-products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching top products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top 5 Best-Selling Products
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {products.map((product) => (
            <ListItem
              key={product.product_id}
              component={Card}
              variant="outlined"
              sx={{ mb: 1 }}
            >
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <ListItemText primary={`${product.quantity_sold} sold`} />
              </CardContent>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default TopProducts;
