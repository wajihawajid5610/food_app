 
import prisma from "@/app/utils/connection"
import { NextRequest, NextResponse } from "next/server";

// Fetch all Products..... ok

export const GET = async (req: NextRequest) => {

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

  } 
 

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

