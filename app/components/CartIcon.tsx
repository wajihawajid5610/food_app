"use client"
import { useCartStore } from '@/app/utils/store';
import Image from 'next/image'
import Link from 'next/link'


const CartIcon = () => {
  const { totalItems} = useCartStore();
  return (
    <Link href="/cart" className="flex gap-4">
      <div className="relative w-8 h-8 md:h-5 md:w-5">
        <Image src="/cart.png" alt="cart image" fill />
      </div>
      <span>Cart ({totalItems})</span> 
   
    </Link>
  )
}

export default CartIcon