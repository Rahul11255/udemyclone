import { useCart } from "react-use-cart";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useEffect, useState } from "react";
import "./topproducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Tooltip, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Link } from "react-router-dom";


const ProductsCard = ({ data, startSlice, endSlice }) => {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [addedProductTitle, setAddedProductTitle] = useState('');
  const { addItem } = useCart();

  const addtoCart = (product) => {
    addItem(product);
    setAddedProductTitle(product.title);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setSlidesPerView(1.15);
      } else if (window.innerWidth <= 750) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(4.15);
      }
      Aos.init({duration:2000})
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

  const discountPrice = (price,dis)=>{
  
    const discountPrice = price * (dis / 100);
    const actualPrice = price - discountPrice;
    const roundedPrice = actualPrice.toFixed(0); // Rounds to the nearest whole number
    return <span style={{marginRight:"5px"}}>₹{roundedPrice}</span>;
  }


  return (
    <>
      <Swiper
        pagination={true}
        modules={[Autoplay]}
        watchSlidesProgress={true}
        slidesPerView={slidesPerView}
        spaceBetween={25}
        className="mySwiper"
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
      >
        {data.slice(startSlice, endSlice).map((product, index) => (
          <SwiperSlide key={index} className="card"  >
            <div className="card_img" data-aos="zoom-in">
           <Link to={`/product/` + product.slug } target="_blank">  <img src={product.thumbnail} alt={product.title} /> </Link> 
              <div className="cart_buton" onClick={() => addtoCart(product)}>
                <Tooltip title="add to cart">
                  <ShoppingCartOutlinedIcon />
                </Tooltip>
              </div>
              <div className="discount_btn">
                        -{product.discountPercentage.toFixed(0)}%
              </div>
            </div>
            <h3>{product.title}</h3>
            <p> {discountPrice(product.price,product.discountPercentage)}  <del> ₹{product.price}</del></p>
          </SwiperSlide>
        ))}
      </Swiper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpenSnackbar(false)}>
          "{addedProductTitle}" added to cart
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductsCard;
