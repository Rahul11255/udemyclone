import React, { useEffect, useState } from 'react';
import "./user.css";
import usericon from '../../../assets/teamwork.png';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  Button,
} from "@mui/material";

import moment from "moment";
import axios from "axios";

const ListofUsers = () => {
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUser(response.data.user);
      setFilteredUsers(response.data.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = "List of All Users";
  }, []);

  useEffect(() => {
    filterUsers();
  }, [nameFilter, dateFilter]);

  const filterUsers = () => {
    let filtered = user;
    if (nameFilter) {
      filtered = filtered.filter(user => 
        `${user.fname} ${user.lname}`.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (dateFilter) {
      filtered = filtered.filter(user => 
        moment(user.updatedAt).format('YYYY-MM-DD') === dateFilter
      );
    }
    setFilteredUsers(filtered);
  };

  return (
    <div className='users_container'>
      <div className='myusers_Text'>
        All users <img src={usericon} width={42} alt="user-icon" /> <span>{user.length}</span>
      </div>
      <div className='filters'>
        <TextField 
          label="Search by Name" 
          variant="outlined" 
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)} 
          style={{ marginRight: 10 }}
        />
        <TextField 
          label="Filter by Date" 
          type="date" 
          InputLabelProps={{ shrink: true }}
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)} 
        />
      </div>
      <div className='users_table_data'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='user_th_cell'>
                    S.No
                  </TableCell>
                  <TableCell className='user_th_cell'>
                    User Name
                  </TableCell>
                  <TableCell className='user_th_cell'>
                    User Email-Id
                  </TableCell>
                  <TableCell className='user_th_cell'>
                    Register Date
                  </TableCell>
                  <TableCell className='user_th_cell'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className='user_td_cell'>
                      {index + 1}
                    </TableCell>
                    <TableCell className='user_td_cell' sx={{ textTransform: "capitalize" }}>
                      {data.fname} {data.lname} <span className='admin'> {data.email === "ajaypatel@gmail.com" ? "Admin" : ""}</span>
                    </TableCell>
                    <TableCell className='user_td_cell'>
                      {data.email}
                    </TableCell>
                    <TableCell className='user_td_cell'>
                      {moment(data.updatedAt).format("MMMM Do, h:mm a")}
                    </TableCell>
                    <TableCell className='user_td_cell'>
                      <Button>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default ListofUsers;
