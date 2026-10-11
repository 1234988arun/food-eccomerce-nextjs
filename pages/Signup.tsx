
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Space} from 'antd';
import { Button, Form, Input, Divider, Checkbox, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  GiftOutlined,
  HeartFilled,
  StarFilled,
} from '@ant-design/icons';

export default function SignupPage() {
  const handleSignup = async (values: any) => {
    // Connect your signup API here.
    message.info('Connect your signup API to create an account.');
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4] p-3 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:min-h-[700px] lg:grid-cols-2">

        {/* LEFT: SIGNUP FORM */}
        <section className="flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-10 lg:px-14">
          <Link
            href="/"
            className="mb-8 inline-flex w-fit items-center gap-2 text-xl font-extrabold text-[#f07832]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
              🍽
            </span>
            Foodie.
          </Link>

          <div className="mb-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f07832]">
              Join the Foodie family
            </p>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Create your account
            </h1>
            <p className="text-sm leading-6 text-gray-500">
              Your next favorite meal is just a few clicks away.
            </p>
          </div>

          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={handleSignup}
          >
            <Form.Item
              label={<span className="font-medium text-gray-700">Full name</span>}
              name="name"
              rules={[
                { required: true, message: 'Please enter your full name' },
                { min: 2, message: 'Name must contain at least 2 characters' },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your full name"
                className="!h-12 !rounded-xl"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium text-gray-700">Email address</span>}
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Enter a valid email address' },
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
  label={<span className="font-medium text-gray-700">Mobile number</span>}
  name="mobile"
  rules={[
    { required: true, message: 'Please enter your mobile number' },
    { pattern: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian mobile number' },
  ]}
>
  <Space.Compact className="!flex">
    <Input
      size="large"
      value="+91"
      readOnly
      className="!h-12 !w-16 !bg-gray-100"
    />
    <Input
      size="large"
      prefix={<PhoneOutlined className="text-gray-400" />}
      maxLength={10}
      inputMode="numeric"
      placeholder="9876543210"
      className="!h-12 !rounded-r-xl"
    />
  </Space.Compact>
</Form.Item>
            <Form.Item
              label={<span className="font-medium text-gray-700">Password</span>}
              name="password"
              rules={[
                { required: true, message: 'Please create a password' },
                { min: 8, message: 'Password must be at least 8 characters' },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                placeholder="Create a strong password"
                className="!h-12 !rounded-xl"
              />
            </Form.Item>

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Please accept the terms to continue')),
                },
              ]}
            >
              <Checkbox>
                <span className="text-sm text-gray-500">
                  I agree to the{' '}
                  <Link href="/terms" className="font-semibold text-[#ed762e]">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-semibold text-[#ed762e]">
                    Privacy Policy
                  </Link>
                </span>
              </Checkbox>
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              block
              size="large"
              className="!h-12 !rounded-xl !bg-[#f07832] !font-semibold shadow-md shadow-orange-100"
            >
              Create Account <ArrowRightOutlined />
            </Button>
          </Form>

          <Divider plain className="!my-5 !text-xs !text-gray-400">
            OR SIGN UP WITH
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

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-[#ed762e] hover:!text-[#d65e18]"
            >
              Login
            </Link>
          </p>
        </section>

        {/* RIGHT: UNIQUE FOOD EXPERIENCE PANEL */}
        <section className="relative hidden min-h-full overflow-hidden bg-[#211e1b] lg:block">
          <Image
            src="/signupslider.jpg"
            alt="Freshly prepared delicious food"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/90" />

          {/* Decorative badge */}
          <div className="absolute right-8 top-8 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-xl">
            <GiftOutlined className="text-xl text-orange-300" />
            <div>
              <div className="text-sm font-bold">A little treat awaits</div>
              <div className="text-xs text-white/70">Your foodie journey starts here</div>
            </div>
          </div>

          {/* Floating food cards */}
          <div className="absolute left-8 top-[32%] max-w-[235px] rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-xl backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-400/20 text-orange-300">
                <HeartFilled />
              </span>
              <div>
                <div className="text-sm font-bold">Made for your cravings</div>
                <div className="text-xs text-white/65">Find your new favorite</div>
              </div>
            </div>
            <div className="text-xs leading-5 text-white/75">
              Explore delicious meals and make every order feel special.
            </div>
          </div>

          <div className="absolute bottom-[31%] right-8 rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-400/20 text-xl text-orange-300">
                <StarFilled />
              </div>
              <div>
                <div className="font-bold">Good food. Great mood.</div>
                <div className="mt-1 text-xs text-white/70">Something tasty is waiting.</div>
              </div>
            </div>
          </div>

          {/* Bottom copy */}
          <div className="absolute inset-x-0 bottom-0 p-8 xl:p-12">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              <span className="h-px w-8 bg-orange-300" />
              More than just a meal
            </div>
            <h2 className="max-w-md text-3xl font-extrabold leading-tight text-white xl:text-4xl">
              Good things happen around good food.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
              Discover new flavors, revisit the dishes you love, and make every meal a moment to enjoy.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-xs font-medium text-white/80">
              <span className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2">
                <CheckCircleFilled className="text-orange-300" /> Easy ordering
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2">
                <CheckCircleFilled className="text-orange-300" /> Favorite meals
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
