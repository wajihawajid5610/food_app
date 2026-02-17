


import prisma from "@/app/utils/connection";
import { NextResponse } from "next/server"



//fetch categories from ....ok
export const GET = async() =>{
    try {
        const categories = await prisma.category.findMany()
        return new NextResponse(
            JSON.stringify(categories),
            {status:200}
        )
        
    } catch (error) {
        return new NextResponse(JSON.stringify({messsage:"Something went wrong"}),
        {status:500}
    );        
    }
}


export const POST = ()=>{
    return new NextResponse("hello", {status:200})
}