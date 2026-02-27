"use client";

import { decreaseItemDb, deleteItemFromCart, increaseItemDb } from "@/actions/server/cart";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({ item, removeItem, updateQuantity }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { _id } = item;

    const onIncrease = async () => {
        const result = await increaseItemDb(_id, quantity)
        if (result.success) {
            Swal.fire("success", "quantity increased", "success");
            updateQuantity(_id, quantity + 1)
        }
    };

    const onDecrease = async () => {
        const result = await decreaseItemDb(_id, quantity)
        if (result.success) {
            Swal.fire("success", "quantity increased", "success");
            updateQuantity(_id, quantity - 1)
        }
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This item will be removed from your cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (!confirm.isConfirmed) return;

        startTransition(async () => {
            const result = await deleteItemFromCart(_id);

            if (result?.success) {
                removeItem(_id);
                await Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Item removed successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed!",
                    text: "Something went wrong.",
                });
            }
        });
    };

    const totalPrice = item.price * quantity;

    return (
        <div className="card card-side bg-base-100 shadow-md p-4 items-center gap-4 relative">

            {/* Remove Button */}
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="btn btn-sm btn-error btn-circle absolute top-2 right-2"
            >
                {isPending ? (
                    <span className="loading loading-spinner loading-xs"></span>
                ) : (
                    <FaTrash />
                )}
            </button>

            {/* Product Image */}
            <figure className="w-24 h-24">
                <Image
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg object-cover w-full h-full"
                    width={96}
                    height={96}
                />
            </figure>

            {/* Product Info */}
            <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>

                <p className="text-primary font-bold mt-1">
                    ৳ {totalPrice}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={onDecrease}
                        className="btn btn-sm btn-outline btn-circle"
                    >
                        <FaMinus />
                    </button>

                    <span className="text-lg font-medium">{quantity}</span>

                    <button
                        onClick={onIncrease}
                        className="btn btn-sm btn-outline btn-circle"
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;