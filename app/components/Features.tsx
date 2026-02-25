'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProductType } from "../types/types";
import { useRouter } from "next/navigation";

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/products"); // use relative path in production
        const json = await res.json();
        console.log("API RESPONSE:", json);
        setFeaturedProducts(json);


        console.log("API RESPONSE:", json);

      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    getData();

  }, []);



  const scrollOne = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const firstChild = container.children[0] as HTMLElement;
    if (!firstChild) return;
    const scrollAmount = firstChild.offsetWidth;
    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  const handleGoToProduct = (id: string | number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="relative w-screen">
      {/* Scroll triggers */}
      <div
        onMouseEnter={() => scrollOne("left")}
        className="absolute top-0 left-0 h-full w-[10%] cursor-pointer z-10"
      ></div>
      <div
        onMouseEnter={() => scrollOne("right")}
        className="absolute top-0 right-0 h-full w-[10%] cursor-pointer z-10"
      ></div>

      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {Array.isArray(featuredProducts) &&
          featuredProducts.map((item) => (
            <div
              key={item.id}
              className="snap-start flex flex-col shrink-0 transition-all duration-300 p-4 items-center justify-around hover:bg-fuchsia-50 w-screen md:w-[50vw] xl:w-[33vw] h-[60vh] md:h-[80vh] xl:h-[90vh]"
            >
              {item.img && (
                <div className="relative flex-1 w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              )}

              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
                <p className="p-4 2xl:p-8">{item.desc}</p>
                <span className="text-xl font-bold">${item.price}</span>

                {/* Go to Product Page Button */}
                <button
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleGoToProduct(item.id)}
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Featured;
