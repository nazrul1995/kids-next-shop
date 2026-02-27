'use server'

import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cache } from "react";

const { dbConnect, collections } = require("@/lib/dbConnect")

const cartCollection = dbConnect(collections.CART);
export const handleCart = async(productId)=>{
    const {user} = await getServerSession(authOptions);
    //console.log(user);
    if(!user) return { success: false}
    // getCartItem-> user.email && productId
    const query = {email: user?.email, productId}
    const isAdded = await cartCollection.findOne(query)
  if(isAdded){
    // if exist update cart
    const updatedData = {
        $inc:{
            quantity:1,
        },
    };
    const result = await cartCollection.updateOne(query, updatedData)
    return {success: Boolean(result.modifiedCount)}
  }else{
    const product = await dbConnect(collections.PRODUCTS).findOne({_id: new ObjectId(productId)});
    const newData = {
        productId: product?._id,
        email: user?.email,
        title: product.title,
        quantity: 1,
        image: product.image,
        username: user?.name,
        price: product.price - (product.price * product.discount)/100,
    }

    const result = await cartCollection.insertOne(newData)
    return {success: result.acknowledged}
  }

}

export const getCart = cache(async () =>{
    const {user} = await getServerSession(authOptions);
    //console.log(user);
    if(!user) return [];
    const query = { email: user?.email};
    const result = await cartCollection.find(query).toArray();
    return result;
})

export const deleteItemFromCart = async (id)=>{
   const {user} = await getServerSession(authOptions);
    //console.log(user);
    if(!user) return {success: false};
    if(id?.length != 24){
      return {success: false}
    }
    const query = {_id: new ObjectId(id), email: user?.email};
    const result = await cartCollection.deleteOne(query);
    return {success: Boolean(result.deletedCount)}
}

export const increaseItemDb = async (id) => {
  const { user } = await getServerSession(authOptions);
  if (!user) return { success: false };

  const query = {
    _id: new ObjectId(id),
    quantity: { $lt: 10 }, // max 10
  };

  const result = await cartCollection.updateOne(query, {
    $inc: { quantity: 1 },
  });

  return { success: Boolean(result.modifiedCount) };
};

export const decreaseItemDb = async (id) => {
  const { user } = await getServerSession(authOptions);
  if (!user) return { success: false };

  const query = {
    _id: new ObjectId(id),
    quantity: { $gt: 1 }, // min 1
  };

  const result = await cartCollection.updateOne(query, {
    $inc: { quantity: -1 },
  });

  return { success: Boolean(result.modifiedCount) };
};

export const clearCart = async () =>{
  const {user} = await getServerSession(authOptions);
    //console.log(user);
    if(!user) return {success:false};
    const query = { email: user?.email};
    const result = await cartCollection.deleteMany(query);
    return result;
}