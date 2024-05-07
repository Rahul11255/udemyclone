// ProductsCard.js
import  { useEffect, useState } from "react";
import "./topproducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ProductsCard = ({ data }) => {
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 750) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      watchSlidesProgress={true}
      slidesPerView={slidesPerView}
      spaceBetween={25}
      className="mySwiper"
    >
      {data.map((product, index) => (
        <SwiperSlide key={index} className="card">
          <div className="card_img">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <h3>{product.title}</h3>
          <p>₹ {product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <h5>Rating: {product.rating}</h5>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsCard;
