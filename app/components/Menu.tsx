 "use client"
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react'
import CartIcon from './CartIcon';

const Menu = () => {
    const [open , setopen] = useState(false);
    // temp
    const user= true
    const links =[
        {id:1, title: "Homepage", url: "/"},
        {id:2, title: "Menu", url: "/menu"},
        {id:3, title: "working Hours", url: "/"},
        {id:4, title: "Contact", url: "/"},
    ];   
  return (
    
    <div>
         {!open ? (<Image src="/open.png" alt='open menu' height={20} width={20} onClick={()=>setopen(true)}/>) : (<Image src="/close.png" alt='close menu' height={20} width={20} onClick={()=>setopen(false)}/>)}
    
    {open &&  <div className='bg-red-500 text-white left-0 top-24 w-full  absolute h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-3xl gap-8 z-10'>
        {
            links.map((item)=>(
            <Link key={item.id} onClick={()=>setopen(false)} href={item.url}>{item.title}</Link>
            ))
        }
        
        {/* {!user ? <Link href="/login" onClick={()=>setopen(false)}>Login</Link> : <Link href="/orders" onClick={()=>setopen(false)}>Orders</Link>} */}
        <Link href="/login" onClick={()=>setopen(false)}>Login</Link>
        <Link href="/orders" onClick={()=>setopen(false)}>Orders</Link>
        <Link href="/cart" onClick={()=>setopen(false)}><CartIcon/></Link>
        
            
        </div>}



    </div>

   
  )
}

export default Menu
 
