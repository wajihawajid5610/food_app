
import prisma from "@/app/utils/connection";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (
  req: Request,
  context: { params: Promise<{ orderId: string }> }
) => {
  const { orderId } = await context.params; // ✅ REQUIRED in Next 16 

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    /*  const paymentIntent = await stripe.paymentIntents.create({
       amount: Math.round(Number(order.price) * 100),
       currency: "usd",
       automatic_payment_methods: { enabled: true },
     }); */

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.price.toNumber() * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: { id: orderId },
      data: { intent_id: paymentIntent.id },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};