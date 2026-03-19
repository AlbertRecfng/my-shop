import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product, Category } from '@prisma/client'
import AddToCartButton from '@/components/add-to-cart-button'

type ProductWithCategory = Product & { category: Category }

export default function ProductCard({ product }: { product: ProductWithCategory }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Нет фото
            </div>
          )}
          {product.oldPrice && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Скидка
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category.name}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold hover:underline line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${Number(product.oldPrice).toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  )
}