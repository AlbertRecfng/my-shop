import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CartItemControls from '@/components/cart-item-controls'

export default async function CartPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  const items = cart?.items ?? []
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  )

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-gray-500 mb-8">Добавьте товары из каталога</p>
        <Link href="/products">
          <Button>Перейти в каталог</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товаров */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                {item.product.images[0] ? (
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    Нет фото
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Link href={`/products/${item.product.slug}`}>
                  <h3 className="font-semibold hover:underline">{item.product.name}</h3>
                </Link>
                <p className="text-gray-500 text-sm mt-1">
                  ${Number(item.product.price).toFixed(2)} за шт.
                </p>
                <CartItemControls item={item} />
              </div>
              <div className="text-right">
                <p className="font-bold">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Итого */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4 sticky top-24">
            <h2 className="text-xl font-bold">Итого</h2>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">Товары ({items.length})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Доставка</span>
              <span className="text-green-600">Бесплатно</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Итого</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full" size="lg">
                Оформить заказ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}