


import Link from "next/link";
import ExploreBtn from "../buttons/ExploreBtn";
import { MenuType } from "../types/types";

const getData = async ()=>{
  const res = await fetch("http://localhost:3000/api/categories",
    {
      cache:"no-store"
    }
  )
  if(!res.ok){
    throw new Error("Failed")
  }
  return res.json()
}

const MenuPage = async() => 
  
  {

    const menu:MenuType = await getData();
  return (
    <div className="p-5 m-3 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => ( 
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className=" h-1/3 bg-cover md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2  p-4`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-5">{category.desc}</p>
            <ExploreBtn category={category} />

          </div>
        </Link>
      ))}
      
    </div>
  );
};

export default MenuPage;