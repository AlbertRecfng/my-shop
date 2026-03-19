import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import AddToCartButton from '@/components/add-to-cart-button'

interface Props {
    params: { slug: string}
}

export default async function ProductPage({ params }: Props) {
    const product = await prisma.product.findUnique({
        where: { slug: params.slug },
        include: { category: true}
    })

    if (!product) notFound()

        return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Изображения */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
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
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.slice(1).map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Информация */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary">{product.category.name}</Badge>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-gray-400 line-through">
                ${Number(product.oldPrice).toFixed(2)}
              </span>
            )}
            {product.oldPrice && (
              <Badge className="bg-red-500">
                -{Math.round((1 - Number(product.price) / Number(product.oldPrice)) * 100)}%
              </Badge>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="text-sm">
            <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
              {product.stock > 0 ? `✓ В наличии (${product.stock} шт.)` : '✗ Нет в наличии'}
            </span>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}