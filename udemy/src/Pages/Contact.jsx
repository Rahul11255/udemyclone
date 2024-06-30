import React from 'react'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from 'react-router-dom';
import ContactComp from '../Components/contact/ContactComp';

const Contact = () => {
  return (
    <>
    <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon /> CONTACT
        </p>
      </section>
      <ContactComp/>
    </>
  )
}

export default Contact