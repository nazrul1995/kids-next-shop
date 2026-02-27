"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
  const session = useSession();
  const path = usePathname();
  const router = useRouter();
  const islogin = session?.status == "authenticated";
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd2Cart = async() => {
    if (islogin) {
      const result = await handleCart(product._id)
      if(result.success){
        Swal.fire("Added to cart", product?.title, "success")
      }else{
        Swal.fire("Opps", product?.title, "error")
      }
      setIsLoading(false)
    }
    else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false)
    }
  };

  return (
    <div>
      <button
        disabled={session.status == "loading" || isLoading }
        onClick={handleAdd2Cart}
        className="btn btn-primary btn-full flex gap-2"
      >
        <FaCartPlus />
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;
