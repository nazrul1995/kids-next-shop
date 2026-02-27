"use client";

import { createOrder } from "@/actions/server/Order";
import { useSession } from "next-auth/react";
import { useMemo, useState, useEffect } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems = [] }) => {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  // Prefill name and email from session
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      Swal.fire("Error", "Your cart is empty!", "error");
      return;
    }

    const result = await createOrder(formData);

    if (result.success) {
      Swal.fire("Success", "Order placed successfully!", "success");
      // Optional: redirect to order confirmation page
    } else {
      Swal.fire("Error", "Failed to place order!", "error");
    }
  };

  if (status === "loading") return <h2>Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="md:col-span-2 card bg-base-100 shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="input input-bordered w-full"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="input input-bordered w-full"
          required
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          className="textarea textarea-bordered w-full"
          required
          value={formData.address}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="input input-bordered w-full"
            required
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            className="input input-bordered w-full"
            required
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="notes"
          placeholder="Order Notes (Optional)"
          className="textarea textarea-bordered w-full"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary w-full mt-4">
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="card bg-base-100 shadow-lg p-6 h-fit">
        <h3 className="text-2xl font-bold mb-4">Order Summary</h3>

        <div className="space-y-2 mb-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm"
            >
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>৳ {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <hr className="my-3" />

        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>৳ {subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>৳ {shipping}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">৳ {total}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;