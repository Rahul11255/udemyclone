import React, { useEffect, useState } from 'react'
import "./single.css";
import ReactImageMagnify from "react-image-magnify";


const Imgsection = ({userdata}) => {


    const [productImg, setProductImg] = useState("");
    const [selectedImg, setSelectedImg] = useState("");
  
    useEffect(() => {
      if (userdata && userdata.thumbnail) {
        setProductImg(userdata.thumbnail);
        setSelectedImg(userdata.thumbnail);
      }
    }, [userdata]);
  
    const getImg = (img) => {
      console.log("single", img);
      setProductImg(img);
      setSelectedImg(img);
    };

  return (
    <>

<div className="single_left_top">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: productImg,
                },
                largeImage: {
                  src: productImg,
                  width: 1200,
                  height: 1200,
                },
              }}
            />
          </div>
          <div className="single_left_bottom">
            <div>
              <img
                src={userdata.thumbnail}
                alt={userdata.title}
                onMouseMove={() => getImg(userdata.thumbnail)}
                style={{
                  border:
                    selectedImg === userdata.thumbnail
                      ? "2px solid #5567EE"
                      : "none",
                  padding: "5px",
                  cursor: "pointer",
                }}
              />
            </div>
            {userdata?.images?.map((img, key) => (
              <div
                key={key}
                onMouseMove={() => getImg(img)}
                style={{
                  border: selectedImg === img ? "2.5px solid #5567EE" : "none",
                  cursor: "pointer",
                }}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        
    </>
  )
}

export default Imgsection