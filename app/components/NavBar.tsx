
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";
import Menu from "./Menu";

const NavBar = () => {
  const { data: session } = useSession();

  const links = [
    { id: 1, title: "HOME", url: "/" },
    { id: 2, title: "MENU", url: "/menu" },
    { id: 4, title: "CONTACT", url: "/contact" },
  ];

  return (
    <div className="h-12 lg:px-20 xl:px-40 md:h-24 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500">
      
      {/* Left Links */}
      <div className="hidden md:flex gap-4 flex-1">
        {links.map((val) => (
          <Link key={val.id} href={val.url}>{val.title}</Link>
        ))}

      
      </div>

      {/* Logo */}
      <div className="text-2xl md:font-bold flex-1 md:text-center">
        <Link href="/">Taj Mehal Restaurant</Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Menu />
      </div>

      {/* Right Links */}
      <div className="hidden md:flex items-center justify-end gap-4 flex-1">
       
        <UserLinks />

        <CartIcon />
      </div>
            {/* Only show Add Product link if user is admin */}
        {session?.user?.isAdmin && (
          <Link href="/add" className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-2xl ml-4">
            AddProduct
          </Link>
        )}
      

    </div>
    
  );
};

export default NavBar;
