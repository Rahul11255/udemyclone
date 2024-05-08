import React from 'react';
import { useCart } from 'react-use-cart';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart, // Function to empty the cart
  } = useCart();

  if (isEmpty) return <p>Your cart is empty shop now</p>;

  return (
    <>
      <h1>Cart ({totalUniqueItems})</h1>

   

      <ul style={{ marginLeft: '30%' }}>
        {items.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.title} &mdash;
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
              <DeleteIcon />
            </button>
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
              <AddOutlinedIcon />
            </button>
            <button onClick={() => removeItem(item.id)}>
              <HighlightOffIcon />
            </button>
          </li>
        ))}
      </ul>
      <button onClick={emptyCart} style={{ marginBottom: '1rem' }}>
        Clear Cart
      </button>
    </>
  );
};

export default Cart;
