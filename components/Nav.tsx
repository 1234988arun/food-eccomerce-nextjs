
'use client';

import { FoodContext } from '@/context/FoodContext';
import {
  CoffeeOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  CloseOutlined,
  ShoppingOutlined,
  HomeOutlined,
  GiftOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Dropdown, Input, message, Space } from 'antd';
import type { MenuProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const Nav = () => {
  const { setInput, open, setOpen, add, setAdd } = useContext(FoodContext)!;
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);

  const subtotal = add.reduce(
    (total, item) => total + item.price * item.food_quantity,
    0
  );
  const deliveryFees = add.length ? 40 : 0;
  const taxes = subtotal * 0.04;
  const total = subtotal + deliveryFees + taxes;

  const deleteProduct = (id: number) => {
    setAdd(add.filter((item) => item.id !== id));
    message.success('Product deleted successfully');
  };

  const addQty = (item: (typeof add)[number]) => {
    setAdd(add.map((i) =>
      i.id === item.id ? { ...i, food_quantity: i.food_quantity + 1 } : i
    ));
  };

  const decQty = (item: (typeof add)[number]) => {
    if (item.food_quantity <= 1) {
      message.warning("Quantity can't be less than 1");
      return;
    }

    setAdd(add.map((i) =>
      i.id === item.id ? { ...i, food_quantity: i.food_quantity - 1 } : i
    ));
  };

  const accountItems: MenuProps['items'] = [
    { key: 'account', label: <Link href="/account">Your Account</Link> },
    { key: 'orders', label: <Link href="/order">Your Orders</Link> },
    { key: 'login', label: <Link href="/login">Login</Link> },
    { key: 'logout', label: <Link href="/login">Logout</Link> },
  ];

  const navLinks = [
    { label: 'Home', href: '/', icon: <HomeOutlined /> },
    { label: 'Products', href: '/product', icon: <ShoppingOutlined /> },
    { label: 'My Orders', href: '/order', icon: <OrderedListOutlined /> },
    { label: 'Login', href: '/login', icon: <UserOutlined /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

          {/* LEFT: LOGO + LOCATION */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl text-white">
                <CoffeeOutlined />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                Food<span className="text-orange-500">ie</span>
              </span>
            </Link>

            <div className="hidden border-l border-gray-200 pl-4 sm:block">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <EnvironmentOutlined className="text-orange-500" />
                Dehradun
              </div>
              <p className="mt-0.5 text-xs text-gray-500">Your delivery location</p>
            </div>
          </div>

          {/* CENTER: NAVIGATION */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 border-b-2 border-transparent py-2 text-sm font-medium text-gray-600 transition hover:border-orange-500 hover:text-orange-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT: FAVOURITES, CART, ACCOUNT */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            <button
              onClick={() => setOpen(true)}
              aria-label="Open cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
            >
              <ShoppingCartOutlined />
              {add.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {add.length}
                </span>
              )}
            </button>

            <div className="hidden sm:block">
              <Dropdown menu={{ items: accountItems }} trigger={['click']} placement="bottomRight">
                <button
                  aria-label="Account menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-lg text-gray-700 hover:border-orange-300 hover:text-orange-500"
                >
                  <UserOutlined />
                </button>
              </Dropdown>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle navigation"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-lg text-gray-700 lg:hidden"
            >
              {mobileMenu ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="border-t border-gray-100 px-4 py-3 lg:hidden">
          <Input
            size="large"
            allowClear
            prefix={<span className="text-gray-400"><ShoppingOutlined /></span>}
            placeholder="Search your favourite food..."
            onChange={(e) => setInput(e.target.value)}
            className="!rounded-xl"
          />
        </div>

        {/* MOBILE NAVIGATION */}
        {mobileMenu && (
          <div className="border-t border-gray-100 bg-white px-4 py-3 shadow-lg lg:hidden">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}



              <Link
                href="/account"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50"
              >
                <UserOutlined /> Your Account
              </Link>

              <div className="mt-2 flex items-center gap-2 border-t border-gray-100 px-3 pt-4 text-sm text-gray-500 sm:hidden">
                <EnvironmentOutlined className="text-orange-500" />
                Delivering to Dehradun
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-orange-500">Your Cart ({add.length})</span>
          </div>
        }
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        size="100%"
        styles={{
          wrapper: { width: '100%', maxWidth: '850px' },
          body: { padding: '16px' },
        }}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            {add.length > 0 ? (
              add.map((item) => (
                <div key={item.id} className="mb-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Image
                        src={item.food_image}
                        alt={item.food_name}
                        width={100}
                        height={90}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="break-words font-semibold">{item.food_name}</p>
                        <p className="mt-1 text-sm text-gray-500">₹{item.price} each</p>
                        <div className="mt-2 flex h-8 w-24 items-center justify-between overflow-hidden rounded-lg border border-orange-300">
                          <button onClick={() => decQty(item)} className="h-full flex-1 hover:bg-orange-50">−</button>
                          <span className="text-sm">{item.food_quantity}</span>
                          <button onClick={() => addQty(item)} className="h-full flex-1 hover:bg-orange-50">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-3">
                      <span className="font-bold">₹{item.price * item.food_quantity}</span>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        aria-label={`Remove ${item.food_name}`}
                        className="text-lg text-red-500 hover:text-red-700"
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <ShoppingCartOutlined className="text-5xl text-gray-300" />
                <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
                <p className="mt-1 text-sm text-gray-500">Add something delicious to get started.</p>
                <Button
                  type="primary"
                  className="!mt-4 !bg-orange-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>

          {add.length > 0 && (
            <div className="h-fit rounded-xl border border-gray-200 p-5">
              <h2 className="mb-5 border-b pb-3 text-lg font-bold">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-2">
                  <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Delivery Fee</span><span>₹{deliveryFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Taxes (4%)</span><span>₹{taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-4 text-lg font-bold">
                  <span>Total</span><span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                block
                size="large"
                type="primary"
                className="!mt-6 !border-0 !bg-orange-500 hover:!bg-orange-600"
                onClick={() => {
                  setOpen(false);
                  router.push('/checkout');
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Nav;
