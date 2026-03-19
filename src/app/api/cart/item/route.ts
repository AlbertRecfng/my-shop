import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { cartItemId, quantity } = await req.json()

  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  })

  return NextResponse.json({ success: true })
}