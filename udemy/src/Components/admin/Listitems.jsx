import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const Listitems = ({ selected, onClick, text ,icons }) => {
  return (
    <>
       <ListItem disablePadding selected={selected} onClick={onClick}>
      <ListItemButton
        // sx={{
        //   backgroundColor: selected ? ' rgba(6, 82, 72, 0.74)' : '', // Change background color when se
        //   color:selected ? 'white':"black",
        // }}
      >
        <ListItemIcon >
         {icons}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
    
    </>
  )
}

export default Listitems