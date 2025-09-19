"use client"

import { decimalToMoney } from "@/lib/utils";
import { useProducts } from "@/stores/product";
import { CartItem } from "@/types/cart-item"
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCart } from "@/stores/cart";

type Props = {
    data: CartItem;
}

export const Cartproduct = ({ data }: Props) => {
    const [quantity, setQuantity] = useState(data.quantity); /* state criado pois a quantidade irá mudar */

    const cart = useCart();

    const products = useProducts();
    const product = products.products.find(p => p.id === data.productId);

    if(!product) return null;

    const handleMinusClick = () => {
        if(quantity -1 <= 0){
            cart.removeItem(data.productId);
        } else {
            cart.addItem({ productId: data.productId, quantity: -1 }); /* adiciona mais um produto */
            setQuantity(quantity - 1);
        }
    }

    const handlePlusClick = () => {
        cart.addItem({ productId: data.productId, quantity: 1 }); /* adiciona mais um produto */
        setQuantity(quantity + 1);
    }

    return (
        <div className="flex items-center gap-3 mb-3">
            <div className="w-10">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="w-full"
                />
            </div>
            <div className="flex-1">
                <div>{product.name}</div>
                <div className="text-sm">{decimalToMoney(product.price)}</div>
            </div>
            <div className="flex items-center bg-secondary p-2 rounded-md">
                <Button size="sm" variant="ghost" onClick={handleMinusClick}>-</Button>
                <div className="mx-3">{quantity}</div>
                <Button size="sm" variant="ghost" onClick={handlePlusClick}>+</Button>
            </div>
        </div>
    );
}