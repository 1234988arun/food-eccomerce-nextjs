
'use client';

import { food_items } from '@/components/Foodlist';
import { FoodContext } from '@/context/FoodContext';
import {
  AppstoreOutlined, CoffeeOutlined, ExperimentOutlined,
  EnvironmentOutlined, ContainerOutlined, PieChartOutlined,
  ShopOutlined, SearchOutlined, HeartOutlined, HeartFilled,
  FilterOutlined, FireOutlined, ClockCircleOutlined,
  CarOutlined, CreditCardOutlined, CustomerServiceOutlined,
  SafetyCertificateOutlined, IeOutlined, GiftOutlined,
  StarFilled, ShoppingCartOutlined
} from '@ant-design/icons';
import {
  Button, Card, Carousel, Checkbox, Input, InputNumber,
  message, Select, Slider, Empty
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';

const categories = [
  { name: 'All', icon: <AppstoreOutlined /> },
  { name: 'Breakfast', icon: <CoffeeOutlined /> },
  { name: 'Soups', icon: <ExperimentOutlined /> },
  { name: 'Pasta', icon: <EnvironmentOutlined /> },
  { name: 'MainCourse', icon: <ContainerOutlined /> },
  { name: 'Pizza', icon: <PieChartOutlined /> },
  { name: 'Burger', icon: <ShopOutlined /> },
];

export default function Homepage() {
  const { input, setInput, add, setAdd } = useContext(FoodContext)!;

  const [category, setCategory] = useState('All');
  const [foodType, setFoodType] = useState('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [appliedFilters, setAppliedFilters] = useState({
    type: 'all',
    price: [0, 1000],
    rating: 0,
  });
  const [favorites, setFavorites] = useState<number[]>([]);
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const maxPrice = Math.max(
    1000,
    ...food_items.map((item) => Number(item.price) || 0)
  );

const filteredItems = useMemo(() => {
  const searchTerm = (input ?? '').trim().toLowerCase();

  const result = food_items.filter((item) => {
    const matchesSearch = item.food_name.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === 'All' ||
      item.food_category.toLowerCase() === category.toLowerCase();

    const matchesType =
      appliedFilters.type === 'all' ||
      item.food_type === appliedFilters.type;

    const matchesPrice =
      Number(item.price) >= appliedFilters.price[0] &&
      Number(item.price) <= appliedFilters.price[1];

    return matchesSearch && matchesCategory && matchesType && matchesPrice;
  });

  if (sortBy === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    result.sort((a, b) => a.food_name.localeCompare(b.food_name));
  }

  return result;
}, [input, category, appliedFilters, sortBy]);
  const topRated = filteredItems.filter(
    (item) => Number(item.price) >= 0
  );

  const favoritesList = food_items.filter(
    (item) => favorites.includes(item.id)
  );

  const recentlyViewed = recentIds
    .map((id) => food_items.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  const handleDish = (item: (typeof food_items)[number]) => {
    const exists = add.find((data: (typeof food_items)[number]) => data.id === item.id);

    if (exists) {
      message.info('Item already added to cart');
      return;
    }

    setAdd([...add, { ...item, food_quantity: 1 }]);
    message.success(`${item.food_name} added to cart`);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const viewItem = (id: number) => {
    setRecentIds((prev) => [id, ...prev.filter((item) => item !== id)].slice(0, 6));
  };

  const applyFilters = () => {
    setAppliedFilters({
      type: foodType,
      price: priceRange,
      rating: minRating,
    });
    message.success('Filters applied');
  };

  const resetFilters = () => {
    setFoodType('all');
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setAppliedFilters({
      type: 'all',
      price: [0, maxPrice],
      rating: 0,
    });
    setCategory('All');
    message.success('Filters reset');
  };

  const applyCoupon = () => {
  if (subtotal < 499) {
    setDiscount(0);
    message.warning('Coupon ke liye minimum order ₹499 hona chahiye');
    return;
  }

  if (coupon.trim().toUpperCase() === 'SAVE20') {
    setDiscount(20);
    message.success('Coupon applied! 20% discount');
  } else {
    setDiscount(0);
    message.error('Invalid coupon code');
  }
};

  const subtotal = add.reduce(
    (total: number, item: (typeof food_items)[number]) =>
      total + item.price * item.food_quantity,
    0
  );

  useEffect(() => {
  const img = new window.Image();
  img.src = '/slider1.jpg';
}, []);

  // useEffect(() => {
  //   if (discount && subtotal < 499) {
  //     setDiscount(0);
  //   }
  // }, [subtotal, discount]);



  
  const SideTitle = ({
    icon,
    title,
  }: {
    icon: React.ReactNode;
    title: string;
  }) => (
    <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-800">
      <span className="text-orange-500">{icon}</span>
      {title}
    </h3>
  );



  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800">

      {/* HERO */}
<section className="mx-auto max-w-[1500px] px-3 pt-5 sm:px-5 lg:px-8">
  <Carousel autoplay arrows>
    {[
      {
        image: '/slider1.jpg',
        title: 'Fresh Ingredients. Unforgettable Flavors.',
        desc: 'Delicious food, freshly prepared and delivered to your door.',
      },
      {
        image: '/slider2.jpg',
        title: 'Your Cravings, Our Priority',
        desc: 'Discover your favourites and enjoy every bite.',
      },
      {
        image: '/slider3.jpg',
        title: 'Taste That Makes You Crave More',
        desc: 'Great food, great taste, great moments.',
      },
    ].map((slide, index) => (
      <div key={slide.title}>
        <div className="relative flex min-h-[260px] items-center overflow-hidden rounded-2xl bg-gray-900 sm:min-h-[330px] lg:min-h-[360px]">

          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 1500px"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

          <div className="relative z-[2] max-w-2xl px-6 py-10 sm:px-10 lg:px-12">
            <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white">
              🔥 SPECIAL OFFER
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-gray-200 sm:text-base">
              {slide.desc}
            </p>

            <Link href="/product">
              <Button
                type="primary"
                size="large"
                className="!mt-6 !h-12 !rounded-xl !border-0 !bg-orange-500 !px-7 !font-bold"
              >
                Order Now →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </Carousel>
</section>

      {/* MAIN CONTENT + SIDEBAR */}
      <main className="mx-auto grid max-w-[1500px] grid-cols-1 items-start gap-5 px-3 py-6 sm:px-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 xl:grid-cols-[minmax(0,1fr)_320px]">

        {/* LEFT CONTENT */}
        <div className="min-w-0">

          {/* SEARCH + SORT */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <Input
              size="large"
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="Search your favourite food..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              allowClear
              className="!h-12 !rounded-xl !bg-white"
            />
            <Select
              size="large"
              value={sortBy}
              onChange={setSortBy}
              className="w-full sm:!w-[220px] sm:!shrink-0"
              options={[
                { label: 'Recommended', value: 'recommended' },
                { label: 'Price: Low to High', value: 'price-low' },
                { label: 'Price: High to Low', value: 'price-high' },
                { label: 'Name: A to Z', value: 'name' },
              ]}
            />
          </div>

          {/* CATEGORIES */}
          <section className="mb-7">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold sm:text-2xl">Explore Categories</h2>
              <span className="text-sm text-gray-500">Find your favourite</span>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {categories.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCategory(item.name)}
                  className={`flex min-h-[100px] flex-col items-center justify-center gap-3 rounded-xl border bg-white p-3 transition hover:-translate-y-1 hover:shadow-md ${
                    category === item.name
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : 'border-gray-100'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-center text-xs font-semibold sm:text-sm">
                    {item.name === 'MainCourse' ? 'Main Course' : item.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* OFFERS */}
          <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex min-h-[135px] items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-green-100 to-emerald-50 p-5">
              <div>
                <p className="text-xs font-bold uppercase text-green-700">Special deal</p>
                <h3 className="mt-2 text-xl font-extrabold">Use Code SAVE20</h3>
                <p className="mt-1 text-sm text-gray-600">20% off on orders above ₹499</p>
                <button
                  onClick={() => {
                    setCoupon('SAVE20');
                    message.info('SAVE20 coupon is ready to apply in the sidebar');
                  }}
                  className="mt-3 rounded-full bg-green-600 px-4 py-2 text-xs font-bold text-white"
                >
                  Get Coupon →
                </button>
              </div>
              <GiftOutlined className="text-5xl text-green-600 sm:text-6xl" />
            </div>

            <div className="flex min-h-[135px] items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-orange-100 to-amber-50 p-5">
              <div>
                <p className="text-xs font-bold uppercase text-orange-600">Hungry?</p>
                <h3 className="mt-2 text-xl font-extrabold">Exclusive Offers</h3>
                <p className="mt-1 text-sm text-gray-600">Good food. Great deals.</p>
                <button
                  onClick={() => setCategory('All')}
                  className="mt-3 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white"
                >
                  Explore Food →
                </button>
              </div>
              <IeOutlined className="text-5xl text-orange-500 sm:text-6xl" />
            </div>
          </section>

          {/* FOOD CARDS */}
          <section id="food-menu" className="mb-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold sm:text-2xl">
                  <FireOutlined className="mr-2 text-orange-500" />
                  Popular Dishes
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Fresh picks for your next meal
                </p>
              </div>
              <span className="text-sm font-semibold text-orange-500">
                {filteredItems.length} items
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <Card className="!rounded-2xl">
                <Empty description="No food found. Try changing your search or filters." />
                <div className="mt-4 text-center">
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item, index) => (
                  <Card
                    key={item.id}
                    className="!overflow-hidden !rounded-2xl !border-gray-100 !shadow-sm transition hover:!-translate-y-1 hover:!shadow-lg"
                    styles={{ body: { padding: 10 } }}
                    cover={
                      <div className="relative h-[135px] overflow-hidden sm:h-[175px]">
                        <Image
                          src={item.food_image}
                          alt={item.food_name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition duration-300 hover:scale-105"
                        />
                        {index === 0 && (
                          <span className="absolute left-2 top-2 rounded-md bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                            Bestseller
                          </span>
                        )}
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          aria-label="Toggle favourite"
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
                        >
                          {favorites.includes(item.id) ? (
                            <HeartFilled className="text-lg text-red-500" />
                          ) : (
                            <HeartOutlined className="text-lg" />
                          )}
                        </button>
                      </div>
                    }
                  >
                    <div className="flex min-h-[150px] flex-col">
                      <h3 className="line-clamp-2 min-h-10 text-sm font-bold">
                        {item.food_name}
                      </h3>

                      <div className="mt-2 flex items-center justify-between gap-1">
                        <span className="font-extrabold text-gray-900">
                          ₹{item.price}
                        </span>
                        <span className={`text-[10px] font-semibold sm:text-xs ${
                          item.food_type === 'veg' ? 'text-green-600' : 'text-red-500'
                        }`}>
                          ● {item.food_type === 'veg' ? 'Veg' : 'Non-veg'}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                        <StarFilled className="text-amber-400" />
                        <span>4.{(index % 5) + 5}</span>
                        <span>·</span>
                        <ClockCircleOutlined />
                        <span>25 min</span>
                      </div>

                      <Button
                        block
                        onClick={() => handleDish(item)}
                        className="!mt-auto !h-9 !rounded-lg !border-0 !bg-orange-500 !text-xs !font-bold !text-white hover:!bg-orange-600"
                      >
                        <ShoppingCartOutlined /> Add to Cart
                      </Button>

                      <Link
                        href={`/product/${item.id}`}
                        onClick={() => viewItem(item.id)}
                        className="mt-2 text-center text-xs font-semibold text-orange-600 hover:text-orange-700"
                      >
                        View Details →
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* RECENTLY VIEWED */}
          <section className="mb-8 rounded-2xl bg-gray-100 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold sm:text-xl">
                  <ClockCircleOutlined className="mr-2" />
                  Recently Viewed
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Pick up where you left off
                </p>
              </div>
              <span className="text-xs text-gray-500">Last 6 items</span>
            </div>

            {recentlyViewed.length === 0 ? (
              <p className="rounded-xl bg-white p-4 text-sm text-gray-500">
                Food you view will appear here. Explore dishes to get started!
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {recentlyViewed.map((item) => (
                  <Link
                    href={`/product/${item.id}`}
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl bg-white p-3 transition hover:shadow-md"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.food_image}
                        alt={item.food_name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-800">
                        {item.food_name}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-orange-500">
                        ₹{item.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-4">

          {/* FILTERS */}
          <Card
            className="!rounded-2xl !border-gray-100 !shadow-sm"
            styles={{ body: { padding: 20 } }}
          >
            <SideTitle icon={<FilterOutlined />} title="Filters" />

            <p className="mb-3 text-sm font-bold">Price Range</p>
            <Slider
              range
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              styles={{ track: { backgroundColor: '#f97316' } }}
            />
            <div className="mb-6 flex justify-between text-xs text-gray-500">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}+</span>
            </div>

            <p className="mb-3 text-sm font-bold">Food Type</p>
            <div className="mb-6 flex flex-col gap-3">
              <Checkbox
                checked={foodType === 'veg'}
                onChange={(e) => setFoodType(e.target.checked ? 'veg' : 'all')}
              >
                <span className="text-sm">🟢 Veg Only</span>
              </Checkbox>
              <Checkbox
                checked={foodType === 'non_veg'}
                onChange={(e) => setFoodType(e.target.checked ? 'non_veg' : 'all')}
              >
                <span className="text-sm">🔴 Non-Veg Only</span>
              </Checkbox>
            </div>

            <p className="mb-3 text-sm font-bold">Rating</p>
            <div className="mb-6 flex flex-col gap-3">
              {[4, 3, 2].map((rating) => (
                <Checkbox
                  key={rating}
                  checked={minRating === rating}
                  onChange={(e) => setMinRating(e.target.checked ? rating : 0)}
                >
                  <span className="text-sm">
                    {rating} <StarFilled className="text-amber-400" /> & above
                  </span>
                </Checkbox>
              ))}
            </div>

            <p className="mb-2 text-sm font-bold">Sort By</p>
            <Select
              className="!w-full"
              value={sortBy}
              onChange={setSortBy}
              options={[
                { label: 'Recommended', value: 'recommended' },
                { label: 'Price: Low to High', value: 'price-low' },
                { label: 'Price: High to Low', value: 'price-high' },
                { label: 'Name: A to Z', value: 'name' },
              ]}
            />

            <Button
              block
              type="primary"
              onClick={applyFilters}
              className="!mt-5 !h-10 !rounded-lg !border-0 !bg-orange-500 !font-bold"
            >
              Apply Filters
            </Button>
            <button
              onClick={resetFilters}
              className="mt-3 w-full text-sm text-gray-500 hover:text-orange-500"
            >
              Reset Filters
            </button>
          </Card>

          {/* COUPON */}
          <Card
            className="!rounded-2xl !border-gray-100 !shadow-sm"
            styles={{ body: { padding: 18 } }}
          >
            <SideTitle icon={<IeOutlined />} title="Coupon Code" />
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                onPressEnter={applyCoupon}
                className="!rounded-lg"
              />
              <Button
                type="primary"
                onClick={applyCoupon}
                className="!rounded-lg !border-0 !bg-orange-500"
              >
                Apply
              </Button>
            </div>
            <p className="mt-3 rounded-lg bg-green-50 p-3 text-xs text-green-700">
              {discount && subtotal >= 499
                ? `✓ SAVE20 applied! You save ₹${Math.round(subtotal * discount / 100)}`
                : '🎁 Use SAVE20 for 20% off on orders above ₹499.'}
            </p>
            {discount > 0 && subtotal < 499 && (
              <p className="mt-2 text-xs text-orange-600">
                Add items worth ₹{499 - subtotal} more to unlock your discount.
              </p>
            )}
          </Card>

          {/* WISHLIST */}
          <Card
            className="!rounded-2xl !border-gray-100 !shadow-sm"
            styles={{ body: { padding: 18 } }}
          >
            <div className="mb-4 flex items-center justify-between">
              <SideTitle icon={<HeartFilled />} title="Your Wishlist" />
              <span className="text-xs font-semibold text-orange-500">
                {favorites.length} saved
              </span>
            </div>

            {favoritesList.length === 0 ? (
              <div className="py-5 text-center">
                <HeartOutlined className="text-3xl text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">
                  Tap the heart on a dish to save it here.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {favoritesList.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.food_image}
                        alt={item.food_name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {item.food_name}
                      </p>
                      <p className="mt-1 text-sm font-bold">₹{item.price}</p>
                      <button
                        onClick={() => handleDish(item)}
                        className="mt-1 text-xs font-semibold text-orange-500"
                      >
                        Add to cart
                      </button>
                    </div>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      aria-label="Remove from wishlist"
                      className="p-1 text-red-500"
                    >
                      <HeartFilled />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* CART SUMMARY */}
          <Card
            className="!rounded-2xl !border-gray-100 !shadow-sm"
            styles={{ body: { padding: 18 } }}
          >
            <SideTitle icon={<ShoppingCartOutlined />} title="Your Cart" />
            <div className="flex justify-between text-sm">
              <span>{add.length} items</span>
              <span className="font-bold">₹{subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Delivery and taxes are calculated at checkout.
            </p>
            <Link href="/checkout">
              <Button
                block
                className="!mt-4 !h-10 !rounded-lg !border-0 !bg-orange-500 !font-bold !text-white"
              >
                Go to Checkout →
              </Button>
            </Link>
          </Card>
        </aside>
      </main>

      {/* DELIVERY / PAYMENT FOOTER */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4 lg:px-8">
          {[
            {
              icon: <CarOutlined />,
              title: 'Fast Delivery',
              desc: 'Fresh food at your door',
            },
            {
              icon: <CreditCardOutlined />,
              title: 'Easy Payments',
              desc: 'Convenient checkout',
            },
            {
              icon: <CustomerServiceOutlined />,
              title: 'Customer Support',
              desc: "We're here to help",
            },
            {
              icon: <SafetyCertificateOutlined />,
              title: 'Fresh & Hygienic',
              desc: 'Quality you can trust',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 sm:justify-center"
            >
              <span className="text-3xl text-gray-700">{item.icon}</span>
              <div>
                <p className="text-sm font-bold">{item.title}</p>
                <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 px-4 py-4 text-center text-xs text-gray-300">
          © {new Date().getFullYear()} Foodie. Made with ❤️ for food lovers.
        </div>
      </footer>
    </div>
  );
}
