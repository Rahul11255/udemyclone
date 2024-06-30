import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
} from "@mui/material";
import myordericon from "../../../assets/courier.png";
import "./order.css";
import moment from "moment";
import axios from "axios";
import Loading from "../../Loading";
import SnackBar from "./SnackBar";
import UpdateOrderStatus from "./UpdateOrderStatus";


const OrderList = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates((prevStatusUpdates) => ({
      ...prevStatusUpdates,
      [id]: newStatus,
    }));
  };
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/orders");
      setData(response.data.order);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id) => {
    const token = localStorage.getItem("token");
    const newStatus = statusUpdates[id];
    if (!newStatus) return;
  
    try {
      const response = await axios.put(
        `http://localhost:3000/update/order/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      setStatusUpdates((prevStatusUpdates) => ({
        ...prevStatusUpdates,
        [id]: "",
      }));
      fetchData();
      setSnackbarMessage("Order status updated successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  

  useEffect(() => {
    fetchData();
    document.title = "List of All Orders";
  }, []);

  const discountPrice = (price, dis) => {
    const discountPrice = price * (dis / 100);
    const actualPrice = price - discountPrice;
    const roundedPrice = actualPrice.toFixed(0); // Rounds to the nearest whole number
    return <span style={{ marginRight: "5px" }}>₹{roundedPrice}</span>;
  };

  const filteredData = data.filter((order) => {
    const searchString = filter.toLowerCase();
    const formattedDate = moment(order.updatedAt)
      .format("MMMM Do, h:mm a")
      .toLowerCase();
    const city = order.address.city.toLowerCase();
    const status = order.status.toLowerCase()
    const cname = order.address.name.toLowerCase();
    return (
      order.orderID.toLowerCase().includes(searchString) ||
      formattedDate.includes(searchString) ||
      city.includes(searchString) ||
      cname.includes(searchString) || status.includes(searchString)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="order_container">
      <div className="myorders_Text">
        My Orders <img src={myordericon} width={40} alt="myordericon" />
        {filteredData.length}
      </div>
      <div className="order_filter">
        <TextField
          label="Filter by Order ID, Date, or City"
          sx={{ mt: "15px" }}
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          style={{ marginBottom: "20px" }}
        />
        <p className="order_td_cell">
          Filter by Order ID, Date, City, or Customer name
        </p>
      </div>
      <div className="order_table_data">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>Error: {error}</p>
        ) : filteredData.length === 0 ? (
          <p>Orders not found.</p>
        ) : (
          <>
            <TableContainer>
              <Table sx={{ border: "1px solid grey" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: "1px solid grey",
                        textAlign: "center",
                        backgroundColor: "#007791",
                        color: "white",
                      }}
                    >
                      S.No
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid grey",
                        textAlign: "center",
                        backgroundColor: "#007791",
                        color: "white",
                      }}
                    >
                      Order-id
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid grey",
                        textAlign: "center",
                        backgroundColor: "#007791",
                        color: "white",
                      }}
                    >
                      Product Details
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid grey",
                        textAlign: "center",
                        backgroundColor: "#007791",
                        color: "white",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid grey",
                        textAlign: "center",
                        backgroundColor: "#007791",
                        color: "white",
                      }}
                    >
                      Customer Address
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid grey",
                        textAlign: "center",
                        backgroundColor: "#007791",
                        color: "white",
                      }}
                    >
                      Total Amount
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid grey",
                        textAlign: "center",
                        backgroundColor: "#007791",
                        color: "white",
                      }}
                    >
                      Order Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            width: "30px",
                            border: "1px solid grey",
                            textAlign: "center",
                          }}
                        >
                          {index + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid grey", textAlign: "center" }}
                        >
                          {item.orderID}
                        </TableCell>
                        <TableCell
                          sx={{
                            maxWidth: "250px",
                            border: "1px solid grey",
                            textAlign: "center",
                          }}
                        >
                          {item.items.map((items, index) => {
                            return (
                              <div key={index}>
                                <TableCell className="order_td_cell">
                                  {index + 1}
                                </TableCell>
                                <TableCell
                                  style={{ color: "#5567EE" }}
                                  className="order_title order_td_cell"
                                >
                                  {items.title}
                                </TableCell>
                                <TableCell
                                  style={{
                                    color: "green",
                                    fontWeight: "600",
                                  }}
                                  className="order_td_cell"
                                >
                                  {discountPrice(
                                    items.price,
                                    items.discountPercentage
                                  )}
                                </TableCell>
                                <TableCell
                                  style={{ color: "blue" }}
                                  className="order_td_cell"
                                >
                                  <span>*</span>
                                  {items.quantity}
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
                          className="order_td_cell"
                        >
                          {moment(item.updatedAt).format("MMMM Do, h:mm a")}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid grey", textAlign: "left" }}
                          className="order_td_cell"
                        >
                          <p className="order_td_cell">
                            <b> Name: </b>
                            {item.address.name}
                          </p>
                          <p className="order_td_cell">
                            <b> Ph :</b> {item.address.phoneNumber}
                          </p>
                          <p className="order_td_cell">
                            <b> Landmark :</b> {item.address.landmark}
                          </p>
                          <p className="order_td_cell">
                            <b> House-no :</b> {item.address.houseNo}
                          </p>
                          <p className="order_td_cell">
                            <b>City :</b> {item.address.city}
                          </p>
                          <p className="order_td_cell">
                            <b> Pincode:</b> {item.address.pincode}
                          </p>
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px solid grey",
                            textAlign: "center",
                            maxWidth: "160px",
                          }}
                          className="order_td_cell"
                        >
                          {item.totalAmount}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px solid grey",
                            textAlign: "center",
                            maxWidth: "150px",
                          }}
                          className="order_td_cell"
                        >
                          <p className="status_text">{item.status}</p>
                          <UpdateOrderStatus item={item} statusUpdates={statusUpdates} handleStatusChange={handleStatusChange} updateOrderStatus={updateOrderStatus}/>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </div>
      <SnackBar snackbarMessage={snackbarMessage}  snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />

    </div>
  );
};

export default OrderList;
