/* import prisma from "@/app/utils/connection";
import { NextResponse } from "next/server";

export const PUT = async ({ params }: { params: { intentId: string } }) => {
  const { intentId } = params;

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    ); 
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}; */


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/connection";

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ intentId: string }> }
) => {
  try {
    const { intentId } = await params;   // ← required in Next.js 15+

    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: {
        status: "Being prepared!",
      },
    });

    return NextResponse.json(
      { message: "Order has been updated" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating order:", err); // better logging

    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};