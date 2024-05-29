import React from 'react'
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const SnackBar = ({snackbarMessage,snackbarOpen,setSnackbarOpen}) => {
  return (
    <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    open={snackbarOpen}
    autoHideDuration={1500}
    onClose={() => setSnackbarOpen(false)}
  >
    <SnackbarContent
      sx={{ backgroundColor: "green" }}
      message={snackbarMessage}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  </Snackbar>
  )
}

export default SnackBar