import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    const cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
        include: {
            items: {
                include: { product: true },
            },
        },
    })
    
    return NextResponse.json(cart)
}

export async function POST(req: Request){
    const session = await auth()
    if(!session?.user?.id) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    const {productId, quantity} = await req.json() 
    
    let cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
    })

    if(!cart){
        cart = await prisma.cart.create({
            data: {
                userId: session.user.id,
            },
        })
    }

    const existing = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId,
            },
        },
    })

    if(existing){
        await prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity },
        })
    }else{
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            },
        })
    }
    
    return NextResponse.json({success: true})
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { cartItemId } = await req.json()
  await prisma.cartItem.delete({ where: { id: cartItemId } })

  return NextResponse.json({ success: true })
}
