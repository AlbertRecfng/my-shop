'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

export default function AddToCartButton({product}: {product: Product}){
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleAddToCart = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id, quantity: 1 })
            })
            if (res.status === 401){
                toast.error("Войдите в аккаунт чтобы добавить в корзину")
                router.push("/auth/login")
                return
            }
            if(!res.ok){
                throw new Error();
            }
            toast.success("Товар успещно добавен в количката")
            window.dispatchEvent(new Event('cart-updated'))
            router.refresh()
        } catch {
            toast.error("Грешка при добавяне на товар в количката")
        } finally {
            setLoading(false)
        }
    }
    return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleAddToCart}
      disabled={loading || product.stock === 0}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {loading ? 'Добавление...' : 'В корзину'}
    </Button>
  )
}
