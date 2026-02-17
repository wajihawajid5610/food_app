
import prisma from "@/app/utils/connection"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/auth/auth"

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { message: "You are not authenticated!" },
      { status: 401 }
    )
  }

  try {
    if (session.user.isAdmin) {
      const orders = await prisma.order.findMany()
      return NextResponse.json(orders, { status: 200 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userEmail: session.user.email!,
      },
    })

    return NextResponse.json(orders, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    )
  }
}

// CREATE ORDER
export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { message: "You are not authenticated!" },
      { status: 401 }
    )
  }

  try {
    const body = await req.json()

    const order = await prisma.order.create({
      data: body,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    )
  }
}