import { getCart } from "@/actions/server/cart";
import Cart from "@/components/home/Cart";

const CartPage = async () => {
  const cartItems = await getCart();

  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold py-4 border-l-8 border-primary pl-8">
        My Cart
      </h2>

      <Cart cartItem={formattedItems} />
    </div>
  );
};

export default CartPage;