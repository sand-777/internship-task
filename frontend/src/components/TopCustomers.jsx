import React, { useEffect, useState } from "react";
import axios from "axios";

const TopCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/top-customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching top customers:", error);
      }
    };

    fetchTopCustomers();
  }, []);

  return (
    <div>
      <h2>Top 5 Most Valuable Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customer_id}>
            {customer.name}: ${customer.total_spent.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCustomers;
