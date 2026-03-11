import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">🛍️ My Shop</h1>
      <p className="text-gray-500 mb-8">Добро пожаловать в наш магазин</p>
      <Link
        href="/products"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Перейти в каталог
      </Link>
    </main>
  )
}