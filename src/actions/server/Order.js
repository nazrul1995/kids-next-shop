'use server'

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";

const { dbConnect, collections } = require("@/lib/dbConnect")

const orderCollection = dbConnect(collections.ORDER);

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  const cart = await getCart();
  if (cart.length == 0) {
    return { success: false };
  }
  //   const products = cart.map((item) => ({
  //     _id: new ObjectId(cart.productId),
  //     quantity: cart.quantiy,
  //   }));

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart,
    ...payload,
    totalPrice,
  };

  const result = await orderCollection.insertOne(newOrder);

  if (Boolean(result.insertedId)) {
    const clearResult = await clearCart();
  }

   await sendEmail({
    to: user.email,
    subject: "🎉Your Order Invoice - Hero Kidz",
    html: orderInvoiceTemplate({
      orderId: result.insertedId.toString(),
      items: cart,
      totalPrice,
    }),
  });

  return {
    success: result.insertedId,
  };
};