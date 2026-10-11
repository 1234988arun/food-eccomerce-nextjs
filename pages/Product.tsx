'use client'

import { useState } from 'react'
import { food_items } from '@/components/Foodlist'
import { Button, Input, Select, Card, Pagination } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

const Products = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All')
  const [maxPrice, setMaxPrice] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const products = food_items.filter((item) =>
    item.food_name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || item.food_category === category) &&
    (type === 'All' || item.food_type === type) &&
    (maxPrice === 'All' || item.price <= Number(maxPrice))
  )

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setType('All')
    setMaxPrice('All')
  }
const startIndex = (currentPage - 1) * pageSize
const paginatedProducts = products.slice(startIndex, startIndex + pageSize)

  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5 p-4   sm:p-6 !pb-0 sm:pt-19">

      {/* Left Filters */}
        <aside className="sticky top-20 self-start rounded-lg shadow p-4">
          
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        <div className="mb-4">
          <label className="text-sm font-medium">Search Title</label>
          <Input
            className="mt-2"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">Category</label>
          <Select
            className="w-full mt-2"
            value={category}
            onChange={setCategory}
            options={[
              { label: 'All', value: 'All' },
              { label: 'Breakfast', value: 'Breakfast' },
              { label: 'Soups', value: 'Soups' },
              { label: 'Pasta', value: 'Pasta' },
              { label: 'Main Course', value: 'MainCourse' },
              { label: 'Pizza', value: 'Pizza' },
              { label: 'Burger', value: 'Burger' },
            ]}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">Food Type</label>
          <Select
            className="w-full mt-2"
            value={type}
            onChange={setType}
            options={[
              { label: 'All', value: 'All' },
              { label: 'Veg', value: 'veg' },
              { label: 'Non Veg', value: 'non_veg' },
            ]}
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium">Maximum Price</label>
          <Select
            className="w-full mt-2"
            value={maxPrice}
            onChange={setMaxPrice}
            options={[
              { label: 'Any Price', value: 'All' },
              { label: 'Under ₹400', value: '400' },
              { label: 'Under ₹600', value: '600' },
              { label: 'Under ₹900', value: '900' },
              { label: 'Under ₹1200', value: '1200' },
            ]}
          />
        </div>

        <Button type="primary" danger block onClick={clearFilters}>
          Clear Filters
        </Button>
      </aside>

      {/* Product Grid */}
      <main className="min-w-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">All Products</h1>
          <span className="text-sm text-gray-500">
            {products.length} products
          </span>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {
            
            paginatedProducts.map((item) => (
              <Card
                key={item.id}
                hoverable
                className="h-full"
                styles={{ body: { padding: 12 } }}
                cover={
                  <Image
                    src={item.food_image}
                    alt={item.food_name}
                    width={300}
                    height={200}
                    className="h-[180px] w-full object-cover"
                  />
                }
              >
                <div className="flex flex-col">
                  <h3 className="font-semibold text-base truncate">
                    {item.food_name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.food_description.replace(/\n/g, ' ')}
                  </p>

                  <p className="font-semibold text-green-600 mt-2">
                    ₹{item.price}
                  </p>

                  <Button
                    block
                    className="!mt-3 !bg-green-300 hover:!bg-green-500"
                  >
                    <Link href={`/product/${item.id}`}>
                      View Product
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

    </div>
    <div className='flex justify-center py-8'>
      <Pagination current={currentPage} pageSize={pageSize} 
        onChange={(page) => setCurrentPage(page)}
         total={products.length}
      defaultCurrent={1}  />
    </div>
    </div>
  )
}

export default Products
