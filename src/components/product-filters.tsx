'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* Поиск */}
      <div>
        <h3 className="font-semibold mb-2">Поиск</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Найти товар..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setParam('search', search)}
          />
          <Button size="sm" onClick={() => setParam('search', search)}>
            🔍
          </Button>
        </div>
      </div>

      {/* Категории */}
      <div>
        <h3 className="font-semibold mb-2">Категории</h3>
        <div className="space-y-1">
          <button
            onClick={() => setParam('category', '')}
            className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100 ${
              !searchParams.get('category') ? 'font-semibold bg-gray-100' : ''
            }`}
          >
            Все товары
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setParam('category', cat.slug)}
              className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100 ${
                searchParams.get('category') === cat.slug ? 'font-semibold bg-gray-100' : ''
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Сортировка */}
      <div>
        <h3 className="font-semibold mb-2">Сортировка</h3>
        <div className="space-y-1">
          {[
            { label: 'Новинки', value: '' },
            { label: 'Цена: по возрастанию', value: 'price_asc' },
            { label: 'Цена: по убыванию', value: 'price_desc' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setParam('sort', option.value)}
              className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100 ${
                (searchParams.get('sort') || '') === option.value ? 'font-semibold bg-gray-100' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}