import "./offer.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Timer from "./Timer";


const Offer = () => {
  const [open, setOpen] = useState(false);

  const toggleClosebutton = () => {
    setOpen(!open);
  };


  return (
    <section
      className="offer_container"
      style={{ display: open ? "none" : "block" }}
    >
      <div className="offer_text">
        <p>
          <b>Its the last day to save</b> | The skills for now — now on sale. 
        </p>
        <Timer />
      </div>
      <div className="offer_close">
        <IconButton onClick={toggleClosebutton}>
          <CloseIcon className="close_icon" sx={{ color: "black" }} />
        </IconButton>
      </div>
    </section>
  );
};

export default Offer;
