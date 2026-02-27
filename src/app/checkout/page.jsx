import { getCart } from '@/actions/server/cart';
import CheckOut from '@/components/home/CheckOut';
import React from 'react';

const CheckOutPage = async () => {
    const cartItems = await getCart();
    const formattedItems = cartItems.map((item) => ({
        ...item,
        _id: item._id.toString(),
    }));
    return (
        <div>
            <h2 className="text-4xl font-bold py-4 border-l-8 border-primary pl-8">
                Check Out Page
            </h2>
            <CheckOut cartItems={formattedItems}></CheckOut>
        </div>
    );
};

export default CheckOutPage
    ;