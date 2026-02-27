"use client";

import React, { useMemo, useState } from "react";
import CartItem from "../carrds/CartItem";
import Link from "next/link";

const Cart = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);

  const totalItems = useMemo(
    () => items.reduce((acm, item) => acm + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (acm, item) => acm + item.quantity * item.price,
        0
      ),
    [items]
  );

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, q) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: q } : item
      )
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          ))
        )}
      </div>

      {/* Order Summary */}
      <div className="card bg-base-100 shadow-lg p-6 h-fit">
        <h3 className="text-2xl font-bold mb-4">Order Summary</h3>

        <div className="flex justify-between mb-2">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>৳ {totalPrice}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>৳ 0</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">৳ {totalPrice}</span>
        </div>

        <Link href={"/checkout"} className="btn btn-primary w-full mt-6">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;