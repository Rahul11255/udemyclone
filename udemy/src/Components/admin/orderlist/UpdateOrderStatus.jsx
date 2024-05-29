import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from '@mui/material';


const UpdateOrderStatus = ({item , statusUpdates,handleStatusChange,updateOrderStatus}) => {
  return (
    <div style={{ marginTop: "30px" }}>
    <FormControl fullWidth>
      <InputLabel
        id={`status-select-label-${item._id}`}
      ></InputLabel>
      <Select
        labelId={`status-select-label-${item._id}`}
        id={`status-select-${item._id}`}
        value={statusUpdates[item._id] || item.status}
        onChange={(event) =>
          handleStatusChange(
            item._id,
            event.target.value
          )
        }
      >
        {[
          "Pending",
          "Processing",
          "Shipped",
          "Delivered",
        ].map((statusOption) => (
          <MenuItem
            key={statusOption}
            value={statusOption}
          >
            {statusOption}
          </MenuItem>
        ))}
      </Select>
      <Button
        size="small"
        sx={{ mt: 2 }}
        variant="contained"
        className="order_save_btn"
        onClick={() => updateOrderStatus(item._id)}
      >
        Save
      </Button>
    </FormControl>
  </div>
  )
}

export default UpdateOrderStatus