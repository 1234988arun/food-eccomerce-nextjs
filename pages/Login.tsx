
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Button,
  Input,
  Form,
  Divider,
  message,
} from 'antd';
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowRightOutlined,
  GoogleOutlined,
  LeftOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

const slides = [
  {
    image: '/loginslide2.avif',
    title: 'Good food, good mood.',
    subtitle: 'Discover delicious meals made for your cravings.',
  },
  {
    image: '/loginslider1.png',
    title: 'Your cravings, delivered.',
    subtitle: 'Explore your favorites and enjoy every bite.',
  },
  {
    image: '/loginslide3.jpg',
    title: 'Every bite tells a story.',
    subtitle: 'Fresh flavors and unforgettable food experiences.',
  },
];

export default function LoginPage() {
  const [mode, setMode] = useState<'password' | 'email' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const nextSlide = () => setSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const sendOtp = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      message.error('Please enter a valid email address');
      return;
    }

    // Connect your send-OTP API here.
    message.info('Connect your OTP API to send the verification code.');
  };

  const verifyOtp = async (values: { otp: string }) => {
    // Connect your verify-OTP API here.
    message.info(`Connect your OTP verification API for ${email}.`);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] p-3 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="grid w-full max-w-6xl min-h-[650px] overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT: AUTH FORM */}
        <section className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14">
          <Link
            href="/"
            className="mb-10 inline-flex w-fit items-center gap-2 text-xl font-extrabold tracking-tight text-[#f07832]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e5]">
              🍽
            </span>
            Foodie.
          </Link>

          {mode !== 'password' && (
            <button
              onClick={() => setMode(mode === 'otp' ? 'email' : 'password')}
              className="mb-5 flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-[#f07832]"
            >
              <LeftOutlined /> Back
            </button>
          )}

          {mode === 'password' && (
            <>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#f07832]">
                Welcome back
              </p>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Login to your account
              </h1>
              <p className="mb-8 text-sm leading-6 text-gray-500">
                Enter your details to continue your food journey.
              </p>

              <Form
                layout="vertical"
                requiredMark={false}
                onFinish={(values) => {
                  // Connect your email/password login API here.
                  message.info('Connect your login API to authenticate.');
                }}
              >
                <Form.Item
                  label={<span className="font-medium text-gray-700">Email address</span>}
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="you@example.com"
                    className="!h-12 !rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-medium text-gray-700">Password</span>}
                  name="password"
                  rules={[{ required: true, message: 'Please enter your password' }]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="text-gray-400" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    placeholder="Enter your password"
                    className="!h-12 !rounded-xl"
                  />
                </Form.Item>

                <div className="mb-6 -mt-1 flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-[#ed762e] hover:!text-[#d65e18]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  size="large"
                  className="!h-12 !rounded-xl !bg-[#f07832] !font-semibold shadow-md shadow-orange-100"
                >
                  Login <ArrowRightOutlined />
                </Button>
              </Form>

              <Divider plain className="!my-6 !text-xs !text-gray-400">
                OR CONTINUE WITH
              </Divider>

              <Button
                block
                size="large"
                icon={<GoogleOutlined />}
                className="!h-12 !rounded-xl !font-medium"
                onClick={() => message.info('Connect Google authentication here.')}
              >
                Continue with Google
              </Button>

              <Button
                block
                size="large"
                icon={<MailOutlined />}
                className="!mt-3 !h-12 !rounded-xl !font-medium"
                onClick={() => setMode('email')}
              >
                Login with email OTP
              </Button>

              <p className="mt-7 text-center text-sm text-gray-500">
                New to Foodie?{' '}
                <Link
                  href="/signup"
                  className="font-semibold text-[#ed762e] hover:!text-[#d65e18]"
                >
                  Sign up
                </Link>
              </p>
            </>
          )}

          {mode === 'email' && (
            <>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#f07832]">
                <MailOutlined />
              </div>
              <h1 className="mb-3 text-3xl font-bold text-gray-900">
                Login with email
              </h1>
              <p className="mb-8 text-sm leading-6 text-gray-500">
                We’ll send a one-time verification code to your email address.
              </p>

              <Form
                layout="vertical"
                onFinish={(values) => {
                  setEmail(values.email);
                  setMode('otp');
                  void sendOtp();
                }}
              >
                <Form.Item
                  label="Email address"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="you@example.com"
                    className="!h-12 !rounded-xl"
                  />
                </Form.Item>

                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  size="large"
                  className="!h-12 !rounded-xl !bg-[#f07832]"
                >
                  Send verification code <ArrowRightOutlined />
                </Button>
              </Form>

              <p className="mt-6 text-center text-sm text-gray-500">
                New to Foodie?{' '}
                <Link href="/signup" className="font-semibold text-[#ed762e]">
                  Sign up
                </Link>
              </p>
            </>
          )}

          {mode === 'otp' && (
            <>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#f07832]">
                <SafetyCertificateOutlined />
              </div>
              <h1 className="mb-3 text-3xl font-bold text-gray-900">
                Verify your email
              </h1>
              <p className="mb-8 text-sm leading-6 text-gray-500">
                Enter the verification code sent to{' '}
                <span className="font-semibold text-gray-800">{email}</span>.
              </p>

              <Form layout="vertical" onFinish={verifyOtp}>
                <Form.Item
                  label="Verification code"
                  name="otp"
                  rules={[
                    { required: true, message: 'Enter your verification code' },
                    { len: 6, message: 'Code must be 6 digits' },
                    { pattern: /^\d{6}$/, message: 'Enter a valid 6-digit code' },
                  ]}
                >
                  <Input
                    size="large"
                    maxLength={6}
                    inputMode="numeric"
                    placeholder="Enter 6-digit OTP"
                    className="!h-14 !rounded-xl text-center !text-xl !tracking-[0.5em]"
                  />
                </Form.Item>

                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  size="large"
                  className="!h-12 !rounded-xl !bg-[#f07832]"
                >
                  Verify & Login <ArrowRightOutlined />
                </Button>
              </Form>

              <button
                onClick={() => {
                  setMode('email');
                  setEmail('');
                }}
                className="mt-5 w-full text-center text-sm font-medium text-[#ed762e]"
              >
                Use a different email
              </button>
            </>
          )}

          <p className="mt-10 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Foodie. All rights reserved.
          </p>
        </section>

        {/* RIGHT: IMAGE SLIDER */}
        <section className="relative hidden min-h-full overflow-hidden bg-[#25211f] lg:block">
          <Image
            key={slides[slide].image}
            src={slides[slide].image}
            alt="Delicious food"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="!object-cover transition-opacity duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

          <div className="absolute left-8 top-8 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            ✦ Made for food lovers
          </div>

          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 xl:p-12">
            <div className="mb-5 flex gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.image}
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => setSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    slide === index ? 'w-10 bg-[#ff8b45]' : 'w-5 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <h2 className="mb-3 max-w-md text-3xl font-bold leading-tight text-white xl:text-4xl">
              {slides[slide].title}
            </h2>
            <p className="max-w-sm text-sm leading-7 text-white/75">
              {slides[slide].subtitle}
            </p>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  shape="circle"
                  icon={<LeftOutlined />}
                  onClick={prevSlide}
                  aria-label="Previous slide"
                />
                <Button
                  shape="circle"
                  icon={<RightOutlined />}
                  onClick={nextSlide}
                  aria-label="Next slide"
                />
              </div>
              <span className="text-sm font-medium text-white/70">
                0{slide + 1} / 0{slides.length}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
