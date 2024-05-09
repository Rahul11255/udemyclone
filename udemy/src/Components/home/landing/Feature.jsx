import CardF from "./CardF";
import "./feature.css";
import watchimg from "../../../assets/watch_png.png";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

const Feature = () => {
  useEffect(()=>{
    Aos.init({duration:2000})
  })
  return (
    <section className="feature_container" style={{overflow:"hidden"}}>
      <div className="feature_grid">
        <div className="grid_item_left" data-aos="fade-right">
          <img loading="lazy" src={watchimg} alt="watch_img" />
        </div>
        <div className="grid_item_right" data-aos="fade-up-left">
          <CardF
            watchimg={"https://m.media-amazon.com/images/I/41yGQGSDVfL.jpg"}
            title="Build Quality and Design"
          />
          <CardF
            watchimg={
              "https://rajadigitalplanets.com/cdn/shop/products/31UHhMPnKES_d5fffb7a-85c7-47cf-8e21-a03100bda8c1_480x480@2x.jpg?v=1624256428"
            }
            title="Excellent battery life"
          />
          <CardF
            watchimg={
              "https://m.media-amazon.com/images/I/615jI2hiFRL._SX679_.jpg"
            }
            title="Accurate activity tracking"

          />
          <CardF
            watchimg={
              "https://m.media-amazon.com/images/I/61a0cECYM8L._SX569_.jpg"
            }
            title="Bluetooth Calling"

          />
        </div>
      </div>
    </section>
  );
};

export default Feature;
