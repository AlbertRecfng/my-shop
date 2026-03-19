'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2, Minus, Plus } from 'lucide-react'
import { toast } from 'sonner'

interface CartItem {
  id: string
  quantity: number
  product: { id: string }
}

export default function CartItemControls({ item }: { item: CartItem }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const updateQuantity = async (delta: number) => {
  setLoading(true)
  try {
    const newQty = item.quantity + delta
    if (newQty < 1) return

    await fetch('/api/cart/item', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItemId: item.id, quantity: newQty }),
    })
    window.dispatchEvent(new Event('cart-updated'))
    router.refresh()
  } finally {
    setLoading(false)
  }
}

const removeItem = async () => {
  setLoading(true)
  try {
    await fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItemId: item.id }),
    })
    toast.success('Товар удалён из корзины')
    window.dispatchEvent(new Event('cart-updated'))
    router.refresh()
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="flex items-center gap-2 mt-3">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateQuantity(-1)}
        disabled={loading || item.quantity <= 1}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center font-medium">{item.quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateQuantity(1)}
        disabled={loading}
      >
        <Plus className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-500 hover:text-red-600 ml-2"
        onClick={removeItem}
        disabled={loading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}