import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Prisma } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const decimalToMoney = (price: string | number | Prisma.Decimal) => {
  return parseFloat(price.toString())
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
}