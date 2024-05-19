import React, { useEffect, useState } from "react";
import axios from "axios";

const Check = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders");
      console.log(response.data.order);
      setData(response.data.order);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>s.no</th>
            <th>Order-id</th>
            <th>
              Order-Details
              <tr>
              <th>Tite</th>
              <th>Tite</th>
              </tr>
            </th>
            <th>address</th>
            <th>total price without discount</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody >
        {data.map((item, index) => {
          return (
          
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item._id + 1}</td>
              <td>
                {item.items.map((data) => {
                  return <tr>
                    <td>{data.title}</td>
                    <td>{data.price}</td>
                    <td>{data.quantity}</td>
                  </tr>;
                })}
              </td>
              <td>
                {item.address.name},{item.address.phNumber}
              </td>
              <td>{item.pricewithoutdiscount}</td>
              <td>{item.totalAmount}</td>
              </tr>
          );
        })}
        </tbody>

      </table>
    </div>
  );
};

export default Check;
