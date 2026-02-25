 
import prisma from "@/app/utils/connection"
import { NextRequest, NextResponse } from "next/server";
//import { Product } from '@/app/generated/prisma';
import type { Product } from '@prisma/client';
// Fetch all Products..... ok

/* export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url)
    const cat = searchParams.get("cat")

    try {
        const products = await prisma.product.findMany({
            where: {
                ...(cat ? { catSlug: cat } : { isFeatured: true }),

            }
        });
       

        return new NextResponse(
            JSON.stringify(products),
            { status: 200 }
        )
    } catch (error) {
        console.error("API ERROR:", error);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong", error: String(error) }),
            { status: 500 }
        );
    }

  }  */
 export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });

   const safeProducts = products.map((product: Product) => ({
  ...product,
  price: product.price.toString(), // 🔥 important (Decimal → string for JSON)
}));

    return NextResponse.json(safeProducts);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

  export const POST= async(req:NextRequest)=>{
    try {
        const body = await req.json()
        const product = await prisma.product.create({
            data:body,
        });
       

        return new NextResponse(
            JSON.stringify(product),
            { status: 201 }
        )
    } catch (error) {
        console.error("API ERROR:", error);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong", error: String(error) }),
            { status: 500 }
        );
    }
  }