
import { useCart } from "react-use-cart";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";

const ShoppingCart = () => {
  const { totalItems, items, updateItemQuantity, removeItem ,emptyCart,isEmpty} = useCart();
  console.log("items", items);
if (isEmpty) return <EmptyCart/>
  return (
    <section className="cart_container">
      <div className="cart_grid">
        <div className="cart_item">
          <div className="cart_title">
            <h6>My Cart :</h6> <p>{totalItems} Items</p>{" "}
          </div>
          {items.map((item, key) => {
            // Calculate total price for each item
            const totalPrice = item.price * item.quantity;

            return (
              <div className="cart_card" key={key}>
                <div className="product_dict">
                  <div className="product_img">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div className="product_description">
                    <p>{item.category}</p>
                    <p>{item.title}</p>
                    <p>
                      <b>Rating</b> {item.rating}
                    </p>
                    <p>${item.price}</p>
                  </div>
                </div>
                <div className="product_quantity">
                  <div>
                    <p onClick={() => updateItemQuantity(item.id, item.quantity - 1)}> <RemoveIcon/> </p>
                    <p >{item.quantity}</p>
                    <p onClick={() => updateItemQuantity(item.id, item.quantity + 1)}><AddOutlinedIcon/></p>
                  </div>
                  <p onClick={() => removeItem(item.id)}><DeleteIcon sx={{color:"red",cursor:"pointer"}}/></p>
                </div>
                {/* Display total price for the item */}
                <div className="product_total_price">Total Price: ${totalPrice.toFixed(2)}</div>
              </div>
            );
          })}
          <div className="cart_buttons">
           <Link className="link" to={'/product'}>
          <Button>CONTINUE SHOPPING</Button>
          </Link>
          <Button onClick={emptyCart}>CLEAR CART</Button>

          </div>
        </div>
        <div className="cart_total">
          {/* Calculate and display total items and total price */}
          <div>Total Items: {totalItems}</div>
          <div> Sub Total: ${
            items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
          }</div>
        </div>
      </div>  
    </section>
  );
};

export default ShoppingCart;
