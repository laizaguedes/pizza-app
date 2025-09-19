import { Product } from "@prisma/client"
import { create } from "zustand";

type Store = {
    products: Product[];
    setProducts: (data: Product[]) => void;
}

//hook useProducts
export const useProducts = create<Store>((set) => ({
    products: [],
    setProducts: (data) => set({products: data})
}));