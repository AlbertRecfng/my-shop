import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/product-card'
import ProductFilters from '@/components/product-filters'

interface Props {
  searchParams: { category?: string; search?: string; sort?: string }
}

export default async function ProductsPage({ searchParams }: Props) {
  const categories = await prisma.category.findMany()

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(searchParams.category && {
        category: { slug: searchParams.category },
      }),
      ...(searchParams.search && {
        name: { contains: searchParams.search, mode: 'insensitive' },
      }),
    },
    include: { category: true },
    orderBy:
      searchParams.sort === 'price_asc'
        ? { price: 'asc' }
        : searchParams.sort === 'price_desc'
        ? { price: 'desc' }
        : { createdAt: 'desc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>
      <div className="flex gap-8">
        {/* Фильтры */}
        <aside className="w-64 shrink-0">
          <ProductFilters categories={categories} />
        </aside>
        {/* Товары */}
        <div className="flex-1">
          {products.length === 0 ? (
            <p className="text-gray-500">Товары не найдены</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}