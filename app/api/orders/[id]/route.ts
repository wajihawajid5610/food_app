/* import prisma from "@/app/utils/connection";
import { NextRequest, NextResponse } from "next/server";



export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const body = await req.json();

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: body },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

 */


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/connection";

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }   // ← this is the key change
) => {
  try {
    const { id } = await params;   // ← MUST await here

    // Assuming you're updating an order by its numeric/string ID
    // Adjust the where clause if your model uses a different field (e.g. orderId, uuid, etc.)
    await prisma.order.update({
      where: {
        id: id,               // if id is string → keep as-is
        // id: parseInt(id),  // if your Prisma id is Int → uncomment & use this
      },
      data: {
        // Put whatever fields you actually want to update here
        // Example:
        status: "updated",   // or "paid", "shipped", etc. — change as needed
        // updatedAt: new Date(), // if you want auto-timestamp
      },
    });

    return NextResponse.json(
      { message: "Order updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating order:", err);

    return NextResponse.json(
      { message: "Failed to update order", error: (err as Error).message },
      { status: 500 }
    );
  }
};