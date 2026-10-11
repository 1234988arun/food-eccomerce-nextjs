import { food_items } from '@/components/Foodlist'
import { Button, Carousel } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

const ViewProduct = ({ id }: { id: string }) => {
  const items = food_items.find((item) => item.id === Number(id))

  if (!items) return <p>Product not found</p>

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-10 py-6 sm:py-9">

        {/* Carousel */}
        <div className="w-full min-w-0 overflow-hidden rounded-xl lg:h-[400px]">
          <Carousel arrows infinite={false} autoplay>
            <div className="h-[280px] sm:h-[350px] lg:!h-[400px] overflow-hidden rounded-xl">
              <Image
                width={400}
                height={400}
                alt={items.food_name}
                src={items.food_image}
                className="h-full w-full object-cover"
              />
            </div>
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="flex min-w-0 flex-col items-start justify-center gap-3 sm:gap-4 py-2 lg:py-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
            {items.food_name}
          </h2>

          <p className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 max-w-2xl">
            {items.food_description.replace(/\n/g, ' ')}
          </p>

          <p className="text-xl sm:text-2xl font-bold text-green-600">
            ₹{items.price}
          </p>

          <Button
            size="large"
            className="!mt-2 !bg-green-300 hover:!bg-green-500 hover:!text-white !h-11 !px-8 !font-semibold"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Related Products */}
      <section className="pb-8">
        <h1 className="text-xl sm:text-2xl font-bold py-4">
          Related Products
        </h1>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">
          {food_items.slice(18, 23).map((item) => (
            <div
              key={item.id}
              className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl shadow"
            >
              <Image
                width={218}
                height={203}
                alt={item.food_name}
                src={item.food_image}
                className="h-[180px] sm:h-[203px] w-full object-cover"
              />

              <div className="flex flex-1 flex-col bg-gray-100 p-3 sm:p-4">
                <p className="min-h-[48px] text-center font-bold">
                  {item.food_name}
                </p>

                <p className="min-h-[60px] line-clamp-3 text-sm text-gray-500">
                  {item.food_description.replace(/\n/g, ' ')}
                </p>

                <p className="mt-3 font-semibold text-green-600">
                  ₹{item.price}
                </p>

                <div className="mt-auto pt-3">
                  <Button className="!h-[40px] w-full !bg-green-300 hover:!bg-green-500 hover:!text-white">
                    <Link href={`/product/${item.id}`}>
                      View Product
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default ViewProduct
