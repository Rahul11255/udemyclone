import { useCart } from "react-use-cart";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useEffect, useState } from "react";
import "./topproducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Tooltip, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';

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
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

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
            delay: 3000,
            disableOnInteraction: false,
          }}
      >
        {data.slice(startSlice, endSlice).map((product, index) => (
          <SwiperSlide key={index} className="card">
            <div className="card_img">
              <img src={product.thumbnail} alt={product.title} />
              <div className="cart_buton" onClick={() => addtoCart(product)}>
                <Tooltip title="add to cart">
                  <ShoppingCartOutlinedIcon />
                </Tooltip>
              </div>
            </div>
            <h3>{product.title}</h3>
            <p>₹ {product.price}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
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
