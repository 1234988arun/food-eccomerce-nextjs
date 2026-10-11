'use client';

import { useContext, useEffect, useState } from 'react';
import { FoodContext } from '@/context/FoodContext';
import { Button, Empty } from 'antd';
import { CheckCircleFilled, PrinterOutlined, HomeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const context = useContext(FoodContext);
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  
  const add = context?.add ?? [];
   

  useEffect(() => {
    setOrderId(`ORD${Date.now().toString().slice(-8)}`);
  }, []);

  const subtotal = add.reduce(
    (total: number, item: any) => total + item.price * item.food_quantity,
    0
  );
  const deliveryFees = add.length ? 40 : 0;
  const taxes = subtotal * 0.04;
  const total = subtotal + deliveryFees + taxes;

  const printOrder = () => window.print();

const orderPlaced = context?.orderPlaced ?? false;
if (!orderPlaced) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">You have to order first!</h1>
      <Button type="primary" size='large' className='!bg-green-500 hover:!bg-green-600' onClick={() => router.push('/')}>
        Go to Homepage
      </Button>
    </main>
  );
}

if (add.length === 0) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          You have to order first!
        </h1>

        <p className="mt-3 text-gray-500">
          Your cart is empty. Please order something before visiting this page.
        </p>

        <Button
          type="primary"
          size="large"
          icon={<HomeOutlined />}
          onClick={() => router.push('/')}
          className="mt-6 !h-12 !bg-green-600"
        >
          Go to Homepage
        </Button>
      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">

        {/* Success Header */}
        <section className="rounded-3xl bg-white px-5 py-8 text-center shadow-sm sm:px-10 sm:py-12">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircleFilled className="text-5xl text-green-500" />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-green-600">
            Order Confirmed
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Order Placed Successfully!
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Thank you for your order! Your delicious food is being prepared.
            We hope you enjoy every bite.
          </p>

          <div className="mt-7 inline-block rounded-xl bg-gray-50 px-6 py-3">
            <p className="text-xs text-gray-500">Order Reference</p>
            <p className="mt-1 font-bold tracking-wider text-gray-900">
              {orderId || 'Generating...'}
            </p>
          </div>
        </section>

        {/* Actual Cart Items */}
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Your Order
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {add.length} {add.length === 1 ? 'item' : 'items'} ordered
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
              Confirmed
            </span>
          </div>

          {add.length === 0 ? (
            <Empty
              description="Your cart is empty. No order items are available to display."
            >
              <Button onClick={() => router.push('/')}>
                Go to Homepage
              </Button>
            </Empty>
          ) : (
            <div className="space-y-5">
              {add.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-24 sm:w-24">
                    <Image
                      src={item.food_image}
                      alt={item.food_name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 font-bold text-gray-800 sm:text-lg">
                      {item.food_name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Quantity: {item.food_quantity}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      ₹{item.price} × {item.food_quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-base font-bold text-gray-900 sm:text-lg">
                    ₹{item.price * item.food_quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          {add.length > 0 && (
            <>
              <div className="mt-7 space-y-4 border-t border-dashed border-gray-200 pt-6">
                <div className="flex justify-between gap-4 text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFees.toFixed(2)}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm text-gray-600">
                  <span>Taxes (4%)</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
                  <span className="text-lg font-bold text-gray-900">
                    Total Paid
                  </span>
                  <span className="text-2xl font-extrabold text-green-600">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="large"
                  icon={<HomeOutlined />}
                  onClick={() => router.push('/')}
                  className="h-12 flex-1"
                >
                  Go to Homepage
                </Button>

                <Button
                  size="large"
                  type="primary"
                  icon={<PrinterOutlined />}
                  onClick={printOrder}
                  className="h-12 flex-1 !bg-green-600"
                >
                  Print Order
                </Button>
              </div>
            </>
          )}
        </section>

        <p className="mt-6 text-center text-sm text-gray-400">
          Thank you for choosing us ❤️
        </p>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          button {
            display: none !important;
          }
          main {
            padding: 0 !important;
            background: white !important;
          }
          section {
            box-shadow: none !important;
            break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}
