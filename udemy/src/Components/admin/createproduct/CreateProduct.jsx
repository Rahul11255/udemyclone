import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./create.css";

const CreateProduct = () => {

  const [productData, setProductData] = useState({
    title: "",
    category: "",
    price: "",
    thumbnail: "",
    rating: "",
    discountPercentage: "",
    description: "",
    images: [],
    stock: "",
    brand: "",
    message: "",
    thumbnailUrl: "", // URL for the thumbnail image
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
      message: "",
    }));
  };
  const [filename, setFilename] = useState("No file selected");
  const handleFileThumbnailChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevState) => ({
      ...prevState,
      thumbnail: file,
      thumbnailUrl: URL.createObjectURL(file), // Create URL for the thumbnail image
    }));
    setFilename(file.name); // Set the filename state
  };

  useEffect(()=>{
    document.title = "Create Products"
  })

  const [filename1, setFilename1] = useState("No file selected");
  const handleFileImagesChange = (e) => {
    const files = e.target.files;
    const updatedImages = [...productData.images];
    const updatedFilenames = [...filename1]; // Assuming you have a state for filenames

    for (let i = 0; i < files.length; i++) {
      updatedImages.push(files[i]);
      updatedFilenames.push(files[i].name);
    }

    setProductData((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
    setFilename1(updatedFilenames); // Update filenames state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    const formData = new FormData();
    for (const key in productData) {
      if (key === "images") {
        for (let i = 0; i < productData.images.length; i++) {
          formData.append("images", productData.images[i]);
        }
      } else {
        formData.append(key, productData[key]);
      }
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/createproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server Response:", response.data);

      // Clear form data after successful submission
      setProductData({
        title: "",
        brand: "",
        description: "",
        category: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        thumbnail: null,
        images: [],
        thumbnailUrl: "", // URL for the thumbnail image
        message: response.data.message,
      });

      setTimeout(() => {
        setProductData((prevState) => ({ ...prevState, message: "" }));
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setProductData({
        ...productData,
        message: error.response.data.error,
      });
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  };
 
  const dropdownOptions = [
    { value: null , label: 'Select Category' },
    { value: 'Decor lighting Accessories', label: 'Decor lighting Accessories' },
    { value: 'Smart Watch', label: 'Smart Watch' },
    { value: 'Neon light', label: 'Neon Light' },
    { value: 'Ear Buds', label: 'Ear Buds' },
  ];


  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "" }}>
        Create Product
      </Typography>
      <div align="center"  className="error_success_create" >
        <p
          style={{
            color: productData.message.includes("successfully")
              ? "#0BDA51"
              : "#EF0107",
          }}
        >
          {productData.message}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '18px', borderColor: 'rgba(0, 0, 0, 0.23)', borderRadius: '4px',  fontSize:"18px",color:"#5567EE" }}
          >
            {dropdownOptions.map((option) => (
              <option key={option.value} style={{color:"#222222",fontSize:"18px", padding:"10px"}} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              value={productData.discountPercentage}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              value={productData.rating}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Stock"
              name="stock"
              value={productData.stock}
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
          <Grid item xs={12} sm={3}>
            <input
              type="file"
              id="thumbnail"
              required
              name="thumbnail"
              hidden
              onChange={handleFileThumbnailChange}
            />
            <label htmlFor="thumbnail" className="thumbnail_file_button">
              <p>
                {" "}
                <AddPhotoAlternateIcon sx={{ mr: "2px" }} /> upload thumbnail
                image{" "}
              </p>
            </label>
            <Typography variant="body1">{filename}</Typography>
            {/* Display filename */}
            {productData.thumbnailUrl && (
              <img
                src={productData.thumbnailUrl}
                alt="Thumbnail"
                style={{
                  width: "350px",
                  height: "160px",
                  objectFit: "contain",
                }}
              />
            )}
            {/* Display thumbnail image */}
          </Grid>
          <Grid item xs={12} sm={3}>
            <input
              required
              type="file"
              name="images"
              onChange={handleFileImagesChange}
              multiple
              hidden
              id="images"
            />
            <label htmlFor="images" className="thumbnail_file_button">
              <p>
                {" "}
                <AddPhotoAlternateIcon sx={{ mr: "2px" }} /> Images{" "}
              </p>
            </label>
            <Typography variant="body1">{filename1}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span style={{ marginRight: "5px" }}>Sending..</span>
                  <CircularProgress size={24} color="inherit" />
                </>
              ) : (
                "Create"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateProduct;
