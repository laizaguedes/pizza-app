"use client"

import { Product } from "@/generated/prisma";
import Image from "next/image"
import { Button } from "@/components/ui/button"

type Props = {
    data: Product;//pega os types do próprio model
}

export const PizzaItem = ({ data }: Props) => {

    const handleAddToCart = () => {

    }

    return (
        <div className="text-sm bg-secondary p-4 rounded-md">
            <Image
                src={data.image}
                alt={data.name}
                width={200}
                height={200}
                className="w-full mb-3"
            />
            <div className="text-lg font-bold">{data.name}</div>
            <div>{data.price.toString()}</div>
            <div className="truncate mb-3">{data.ingredients}</div>
            <div className="text-center">
                <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
            </div>
        </div>
    );
}