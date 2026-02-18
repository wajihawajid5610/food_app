import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/utils/connection"
import { getServerSession } from "next-auth"
import  { authOptions } from "@/app/auth/auth"

// ============================
// GET SINGLE PRODUCT
// ============================
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

// ============================
// DELETE SINGLE PRODUCT (ADMIN ONLY)
// ============================
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params

  const session = await getServerSession(authOptions)

  // Not logged in
  if (!session) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    )
  }

  // Not admin
  if (!session.user.isAdmin) {
    return NextResponse.json(
      { message: "You are not allowed!" },
      { status: 403 }
    )
  }

  try {
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "Product has been deleted!" },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    )
  }
}