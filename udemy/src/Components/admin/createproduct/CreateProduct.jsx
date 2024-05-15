import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, CircularProgress  } from '@mui/material';
import axios from "axios"

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    price: '',
    thumbnail: "",
    rating: '',
    discountPercentage: '',
    description: '',
    images: [],
    stock: '',
    brand: '',
    message:"",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileThumbnailChange = (e) => {
    setProductData(prevState => ({ ...prevState, thumbnail: e.target.files[0] }));
  };

  const handleFileImagesChange = (e) => {
    setProductData(prevState => ({ ...prevState, images: [...prevState.images, ...e.target.files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    
    const formData = new FormData();
    for (const key in productData) {
      if (key === 'images') {
        for (let i = 0; i < productData.images.length; i++) {
          formData.append('images', productData.images[i]);
        }
      } else {
        formData.append(key, productData[key]);
      }
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3000/createproduct', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      
      console.log('Server Response:', response.data);

      // Clear form data after successful submission
      setProductData({
        title: '',
        brand: '',
        description: '',
        category: '', 
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        thumbnail: null,
        images: [],
        message:response.data.message
      });

      setTimeout(() => {
        setProductData(prevState => ({ ...prevState, message: '' }));
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating product. Please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  };


  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{color:""}}>
        Create Product
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
       {productData.message}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              value={productData.discountPercentage}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              value={productData.rating}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="file" name='thumbnail'  onChange={handleFileThumbnailChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="file" name='images'  onChange={handleFileImagesChange} multiple/>
          </Grid>
          <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateProduct;
