import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import "./list.css"
import { Button } from '@mui/material';

const columns = [
  { id: 'sno', label: 'S.no', minWidth: 170 },
  { id: 'thumbnail', label: 'Thumbnail/img', minWidth: 100 },
  { id: 'tile', label: 'Title', minWidth: 170, align: 'center' },
  { id: 'category', label: 'Category', minWidth: 170, align: 'center' },
  { id: 'price', label: 'Price', minWidth: 170, align: 'center' },
  { id: 'rating', label: 'Rating', minWidth: 170, align: 'center' },
  { id: 'discount', label: 'Discount', minWidth: 170, align: 'center' },
  { id: 'stock', label: 'Stock', minWidth: 170, align: 'center' },
  { id: 'brand', label: 'Brand', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' },
];

export default function ListOfProducts() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = "List of All Products"
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className='listofproducts_container'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "#007FFF" , border:"1px solid blue"}}>
                <TableRow  sx={{ backgroundColor: "#007FFF" , border:"1px solid blue"}}>
                  {columns.map((column) => (
                    <TableCell
                    sx={{ backgroundColor: "#007FFF" , border:"1px solid blue",color:"white"}}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align='center'>{index + 1}</TableCell>
                      <TableCell align='center' className='thumb_img'> <img src={row.thumbnail} alt={row.title} /> </TableCell>
                      <TableCell align='center'>{row.title}</TableCell>
                      <TableCell align='center'>{row.category}</TableCell>
                      <TableCell align='center'>{row.price}</TableCell>
                      <TableCell align='center'>{row.rating}</TableCell>
                      <TableCell align='center'>{row.discountPercentage}</TableCell>
                      <TableCell align='center'>{row.stock}</TableCell>
                      <TableCell align='center'>{row.brand}</TableCell>
                      <TableCell align='center'> <Button>Edit</Button> <Button>Delete</Button> </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
