import React, { useEffect, useState } from 'react'
import AccountComp from '../Components/userAccount/AccountComp'
import { Link } from 'react-router-dom'
import axios from "axios"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


const Account = () => {
  const [user,setUser] = useState('')

  const fetchData = async()=>{

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/user",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data)
      setUser(response.data)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
    
  return (
    <>
      <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon /> Account  <KeyboardArrowRightIcon/> <p style={{textTransform:"capitalize"}}> {user.fname} {user.lname} </p>
        </p>
      </section>
        <AccountComp data={user}/>
    </>
  )
}

export default Account