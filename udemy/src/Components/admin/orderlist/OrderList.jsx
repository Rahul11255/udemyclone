import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
} from "@mui/material";
import myordericon from "../../../assets/courier.png";
import "./order.css";
import moment from "moment";
import axios from "axios";

const OrderList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders");
      setData(response.data.order);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const flattenData = data.flatMap((order) =>
  //   order.items.map((item) => ({
  //     ...item,
  //     orderId: order._id,
  //     customerAddress: `${order.address.name}, ${order.address.phoneNumber}, ${order.address.landmark}, ${order.address.houseNo}, ${order.address.city}, ${order.address.pincode}`,
  //     city: order.address.city,
  //     totalAmount: order.totalAmount,
  //     createdAt: moment(order.updatedAt).format("MMMM Do, h:mm a"),
  //   }))
  // );

  // const filteredRows = flattenData.filter((item) => {
  //   const { title, category, customerName, price, orderId } = item;
  //   const titleLowerCase = title ? title.toLowerCase() : ""; // Check if title exists
  //   const categoryLowerCase = category ? category.toLowerCase() : ""; // Check if category exists
  //   const customerNameLowerCase = customerName
  //     ? customerName.toLowerCase()
  //     : ""; // Check if customerName exists
  //   const priceString = price ? price.toString() : ""; // Check if price exists

  //   return (
  //     titleLowerCase.includes(filter) ||
  //     categoryLowerCase.includes(filter) ||
  //     customerNameLowerCase.includes(filter) ||
  //     priceString.toLowerCase().includes(filter) ||
  //     orderId.toLowerCase().includes(filter)
  //   );
  // });
  const discountPrice = (price, dis) => {
    const discountPrice = price * (dis / 100);
    const actualPrice = price - discountPrice;
    const roundedPrice = actualPrice.toFixed(0); // Rounds to the nearest whole number
    return <span style={{ marginRight: "5px" }}>₹{roundedPrice}</span>;
  };
  return (
    <div className="order_container">
      <div className="myorders_Text">
        My Orders <img src={myordericon} width={40} alt="myordericon" />
        {data.length}
      </div>
      <div className="order_filter">
        <TextField
          label="Filter"
          sx={{ mt: "15px" }}
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          style={{ marginBottom: "20px" }}
        />
      </div>
      <div className="order_table_data">
        <TableContainer>
          <Table sx={{ border: "1px solid grey" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    border: "1px solid grey",
                    textAlign: "center",
                    backgroundColor: "#222222",
                    color: "white",
                  }}
                >
                  S.No
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid grey",
                    textAlign: "center",
                    backgroundColor: "#222222",
                    color: "white",
                  }}
                >
                  Order-id
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid grey",
                    textAlign: "center",
                    backgroundColor: "#222222",
                    color: "white",
                  }}
                >
                  Product Details
                  <TableCell
                    sx={{
                      border: "1px solid grey",
                      textAlign: "center",
                      backgroundColor: "#222222",
                      color: "white",
                    }}
                  >
                    S-no
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid grey",
                      textAlign: "center",
                      backgroundColor: "#222222",
                      color: "white",
                    }}
                  >
                    P - Title
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid grey",
                      textAlign: "center",
                      backgroundColor: "#222222",
                      color: "white",
                    }}
                  >
                    D-Price
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid grey",
                      textAlign: "center",
                      backgroundColor: "#222222",
                      color: "white",
                    }}
                  >
                    Qty
                  </TableCell>
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid grey",
                    textAlign: "center",
                    backgroundColor: "#222222",
                    color: "white",
                  }}
                >
                  Date
                </TableCell>

                <TableCell
                  sx={{
                    border: "1px solid grey",
                    textAlign: "center",
                    backgroundColor: "#222222",
                    color: "white",
                  }}
                >
                  Customer Address
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid grey",
                    textAlign: "center",
                    backgroundColor: "#222222",
                    color: "white",
                  }}
                >
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      width: "30px",
                      border: "1px solid grey",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid grey", textAlign: "center" }}
                  >
                    {item._id}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "150px",
                      border: "1px solid grey",
                      textAlign: "center",
                    }}
                  >
                    {item.items.map((items, index) => {
                      return (
                        <div key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell
                            style={{ color: "#5567EE" }}
                            className="order_title"
                          >
                            {items.title}{" "}
                          </TableCell>
                          <TableCell
                            ell
                            style={{ color: "green", fontWeight: "600" }}
                          >
                            {discountPrice(
                              items.price,
                              items.discountPercentage
                            )}{" "}
                          </TableCell>
                          <TableCell style={{ color: "blue" }}>
                            {" "}
                            <span>*</span>
                            {items.quantity}{" "}
                          </TableCell>
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid grey",
                      textAlign: "center",
                      maxWidth: "80px",
                    }}
                  >
                    {moment(item.updatedAt).format("MMMM Do, h:mm a")}
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid grey", textAlign: "left" }}
                  >
                    <p>
                      <b> Name: </b>
                      {item.address.name}
                    </p>
                    <p>
                      <b> Ph :</b> {item.address.phoneNumber}
                    </p>
                    <p>
                      <b> Landmark :</b> {item.address.landmark}
                    </p>
                    <p>
                      <b> House-no :</b> {item.address.houseNo}
                    </p>
                    <p>
                      <b>City :</b> {item.address.city}
                    </p>
                    <p>
                      <b> Pincode:</b> {item.address.pincode}
                    </p>
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid grey",
                      textAlign: "center",
                      maxWidth: "160px",
                    }}
                  >
                    {item.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </div>
    </div>
  );
};

export default OrderList;
