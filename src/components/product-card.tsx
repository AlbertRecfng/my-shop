import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Product, Category } from '@prisma/client'

type ProductWithCategory = Product & { category: Category }

export default function ProductCard({ product }: { product: ProductWithCategory }) {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-48 bg-gray-100">
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Скидка
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category.name}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold hover:underline line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ${Number(product.oldPrice).toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          В корзину
        </Button>
      </CardFooter>
    </Card>
  )
}