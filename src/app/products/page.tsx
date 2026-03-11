import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Props {
  searchParams: { category?: string; search?: string }
}

export const dynamic = 'force-dynamic'

export default async function ProductsPage({ searchParams }: Props) {
  const categories = await prisma.category.findMany()

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(searchParams.category && { categoryId: searchParams.category }),
      ...(searchParams.search && {
        name: { contains: searchParams.search, mode: 'insensitive' },
      }),
    },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>

      {/* Поиск */}
      <form className="flex gap-2 mb-6">
        <Input
          name="search"
          placeholder="Поиск товаров..."
          defaultValue={searchParams.search}
          className="max-w-sm"
        />
        <Button type="submit">Найти</Button>
      </form>

      {/* Фильтр по категориям */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/products">
          <Badge variant={!searchParams.category ? 'default' : 'outline'}>
            Все
          </Badge>
        </Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/products?category=${cat.id}`}>
            <Badge variant={searchParams.category === cat.id ? 'default' : 'outline'}>
              {cat.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Сетка товаров */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-16">Товары не найдены</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}