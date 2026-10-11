
'use client';

import Link from 'next/link';
import {
  CoffeeOutlined,
  TwitterOutlined,
  InstagramFilled,
  YoutubeFilled,
  FacebookFilled,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ArrowRightOutlined,
  HeartFilled,
  SafetyCertificateOutlined,
  CarOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Button, Input, message } from 'antd';

const Footer = () => {
  const handleSubscribe = () => {
    message.success('Thanks for subscribing!');
  };

  return (
    <footer className="mt-10 bg-[#111827] text-white">

      {/* NEWSLETTER BANNER */}
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:p-10">
          <div className="relative z-10 max-w-xl">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              Stay in the loop
            </span>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Hungry for exclusive deals?
            </h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base">
              Subscribe for delicious offers, new dishes and special discounts.
            </p>
          </div>

          <form
            className="relative z-10 mt-6 flex w-full gap-2 rounded-xl bg-white p-1.5 sm:max-w-md lg:mt-0"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const email = new FormData(form).get('email')?.toString();

              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                message.error('Please enter a valid email address');
                return;
              }

              handleSubscribe();
              form.reset();
            }}
          >
            <Input
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="!h-11 !border-0 !shadow-none"
            />
            <Button
              htmlType="submit"
              className="!h-11 !shrink-0 !border-0 !bg-gray-900 !px-4 !font-bold !text-white hover:!bg-gray-700"
            >
              Subscribe <ArrowRightOutlined />
            </Button>
          </form>

          <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border-[30px] border-white/10 sm:h-64 sm:w-64" />
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:px-10">

        {/* BRAND */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-2xl text-white shadow-lg shadow-orange-500/20">
              <CoffeeOutlined />
            </span>
            <span className="text-3xl font-extrabold tracking-tight">
              Food<span className="text-orange-500">ie</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
            Good food, great mood! Discover delicious dishes, explore your
            favourites and enjoy every bite delivered right to your doorstep.
          </p>

          <div className="mt-5 flex gap-3">
            {[
              { icon: <InstagramFilled />, label: 'Instagram', href: 'https://instagram.com' },
              { icon: <FacebookFilled />, label: 'Facebook', href: 'https://facebook.com' },
              { icon: <TwitterOutlined />, label: 'Twitter', href: 'https://twitter.com' },
              { icon: <YoutubeFilled />, label: 'YouTube', href: 'https://youtube.com' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-gray-300 transition hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            Quick Links
            <span className="mt-2 block h-1 w-10 rounded-full bg-orange-500" />
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {[
              { label: 'Home', href: '/' },
              { label: 'Explore Menu', href: '/product' },
              { label: 'My Orders', href: '/order' },
              { label: 'My Favourites', href: '/favourites' },
              { label: 'My Account', href: '/account' },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-orange-400"
                >
                  <ArrowRightOutlined className="text-xs text-orange-500" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            Customer Care
            <span className="mt-2 block h-1 w-10 rounded-full bg-orange-500" />
          </h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/about" className="transition hover:text-orange-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-orange-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-orange-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-orange-400">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/help" className="transition hover:text-orange-400">
                Help & Support
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            Get in Touch
            <span className="mt-2 block h-1 w-10 rounded-full bg-orange-500" />
          </h3>

          <div className="space-y-5 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <EnvironmentOutlined className="mt-1 text-lg text-orange-500" />
              <p className="leading-6">
                Dehradun, Uttarakhand
                <br />
                India
              </p>
            </div>

            <a
              href="mailto:support@example.com"
              className="flex items-center gap-3 transition hover:text-orange-400"
            >
              <MailOutlined className="text-lg text-orange-500" />
              support@example.com
            </a>

            <a
              href="tel:+910000000000"
              className="flex items-center gap-3 transition hover:text-orange-400"
            >
              <PhoneOutlined className="text-lg text-orange-500" />
              +91 XXXXX XXXXX
            </a>
          </div>
        </div>
      </div>

      {/* SERVICE HIGHLIGHTS */}
      <div className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-10">
          {[
            {
              icon: <CarOutlined />,
              title: 'Quick Delivery',
              desc: 'Your cravings, delivered',
            },
            {
              icon: <SafetyCertificateOutlined />,
              title: 'Quality Food',
              desc: 'Freshness in every bite',
            },
            {
              icon: <CustomerServiceOutlined />,
              title: 'Here to Help',
              desc: 'Support when you need it',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 sm:justify-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-2xl text-orange-500">
                {item.icon}
              </span>
              <div>
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="mt-1 text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-10">
        <p className="text-xs text-gray-400 sm:text-sm">
          © {new Date().getFullYear()} Foodie. All rights reserved.
        </p>

        <p className="flex items-center gap-1.5 text-xs text-gray-400 sm:text-sm">
          Made with <HeartFilled className="text-red-500" /> for food lovers
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <SafetyCertificateOutlined className="text-green-400" />
          Safe & Secure Shopping
        </div>
      </div>
    </footer>
  );
};

export default Footer;
