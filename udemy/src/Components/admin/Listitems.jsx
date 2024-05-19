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
        sx={{
          backgroundColor: selected ? "#B9D9EB":""
        }}
      >
        <ListItemIcon 
        sx={{
          color: selected ? "#5567EE":""
        }}
        >
         {icons}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
    
    </>
  )
}

export default Listitems