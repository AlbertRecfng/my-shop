import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const electronics = await prisma.category.create({
    data: {
      name: 'Электроника',
      slug: 'electronics',
      description: 'Смартфоны, ноутбуки и другая электроника',
    },
  })

  const clothing = await prisma.category.create({
    data: {
      name: 'Одежда',
      slug: 'clothing',
      description: 'Одежда для мужчин и женщин',
    },
  })

  await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description: 'Последний флагман от Apple с титановым корпусом',
        price: 999.99,
        oldPrice: 1099.99,
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
          'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400'
        ],
        stock: 50,
        categoryId: electronics.id,
      },
      {
        name: 'MacBook Air M2',
        slug: 'macbook-air-m2',
        description: 'Тонкий и легкий ноутбук с процессором M2',
        price: 1299.99,
        images: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
        ],
        stock: 25,
        categoryId: electronics.id,
      },
      {
        name: 'Nike Air Max 90',
        slug: 'nike-air-max-90',
        description: 'Классические кроссовки с максимальной амортизацией',
        price: 149.99,
        oldPrice: 189.99,
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400'
        ],
        stock: 100,
        categoryId: clothing.id,
      },
      {
        name: 'Levi\'s 501',
        slug: 'levis-501',
        description: 'Классические джинсы с прямым кроем',
        price: 89.99,
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
          'https://images.unsplash.com/photo-1594633312681-425c7b97cc1e?w=400'
        ],
        stock: 75,
        categoryId: clothing.id,
      },
    ],
  })

  console.log('Тестовые данные созданы!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
