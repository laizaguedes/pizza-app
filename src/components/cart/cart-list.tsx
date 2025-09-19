"use client"

import { useCart } from "@/stores/cart";
import { Button } from "../ui/button";
import { useProducts } from "@/stores/product";
import { useEffect, useState } from "react";
import { Cartproduct } from "./cart-product";
import { decimalToMoney } from "@/lib/utils";

export const CartList = () => {
    const cart = useCart();
    const products = useProducts();

    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(10);

    const calculateSubtotal = () => {
        let sub = 0;

        for (let item of cart.items) {
            const prod = products.products.find(pitem => pitem.id === item.productId);
            if (prod)
                sub += item.quantity * parseFloat(prod.price.toString())
        }
        setSubtotal(sub);
    }

    useEffect(calculateSubtotal, [cart])

    return (
        <>
            <div className="flex flex-col">
                {cart.items.map(item => (
                    <Cartproduct key={item.productId} data={item} />
                ))}
            </div>
            <div className="my-4 text-right">
                <div>Sub-total: {decimalToMoney(subtotal)}</div>
                <div>Frete: {decimalToMoney(shipping)}</div>
                <div className="font-bold">Total: {decimalToMoney(subtotal + shipping)}</div>
            </div>

            <Button>Finalizar compra</Button>
        </>
    );
}