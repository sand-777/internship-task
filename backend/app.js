require("dotenv").config();
const Shopify = require("shopify-api-node");
const cors = require("cors");

const express = require("express");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8080;

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE_URL,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_ACCESS_TOKEN,
});

app.get("/top-products", async (req, res) => {
  try {
    const orders = await shopify.order.list({
      status: "any",
      financial_status: "any",
      fulfillment_status: "any",
      limit: 250, // Adjust limit if needed for larger datasets
    });

    const productSales = {};

    orders.forEach((order) => {
      order.line_items.forEach((item) => {
        const productId = item.product_id;
        const quantity = item.quantity;

        if (productSales[productId]) {
          productSales[productId].quantity_sold += quantity;
        } else {
          productSales[productId] = {
            product_id: productId,
            title: item.title,
            quantity_sold: quantity,
          };
        }
      });
    });

    // Convert object to array and sort by quantity sold in descending order
    const sortedProducts = Object.values(productSales).sort(
      (a, b) => b.quantity_sold - a.quantity_sold
    );

    // Get top 5 products
    const top5Products = sortedProducts.slice(0, 5);

    res.json(top5Products);
  } catch (error) {
    console.log("Error fetching top products:", error);
    res.status(500).json({ error: "Error fetching top products" });
  }
});

app.get("/top-customers", async (req, res) => {
  try {
    //Fetch all orders
    const customers = await shopify.customer.list({
      limit: 250,
    });

    const sortedCustomers = customers
      .map((customer) => ({
        customer_id: customer.id,
        name: `${customer.first_name} ${customer.last_name}`,
        email: customer.email,
        total_spent: parseFloat(customer.total_spent),
      }))
      .sort((a, b) => b.total_spent - a.total_spent);

    //Get top 5 customers

    const top5Customers = sortedCustomers.slice(0, 5);

    res.json(top5Customers);
  } catch (error) {
    console.error("Error fetching top customers:", error);
    res.status(500).json({ error: "Error fetching top customers" });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>my app is running....</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
