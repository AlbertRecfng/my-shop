'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, User, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
    const {data: session} = useSession()
    
    return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Лого */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Store className="h-6 w-6" />
          My Shop
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products" className="text-sm hover:text-gray-600 transition">
            Каталог
          </Link>
        </nav>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {session ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Выйти
              </Button>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button size="sm">Войти</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
