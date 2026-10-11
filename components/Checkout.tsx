'use client';

import React, { useContext, useState } from 'react';
import { FoodContext } from '@/context/FoodContext';
import {
  Button,
  Form,
  Input,
  Select,
  Radio,
  message,
  Modal,
  Empty,
} from 'antd';
import {
  EnvironmentOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const { add, setOrderPlaced } = useContext(FoodContext)!;
  const [form] = Form.useForm();
  const [payment, setPayment] = useState('cod');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deliveryFees = 40;

  const subtotal = add.reduce(
    (total, item) => total + item.price * item.food_quantity,
    0
  );

  const taxes = subtotal * 0.04;
  const total = subtotal + deliveryFees + taxes;

  const handleOrder = async (values: any) => {
    if (add.length === 0) {
      message.warning('Please add food items to your cart first!');
      return;
    }

    setLoading(true);

    // console.log({
    //   address: values,
    //   items: add,
    //   paymentMethod: payment,
    //   subtotal,
    //   deliveryFees,
    //   taxes,
    //   total,
    // });

    setLoading(false);

    setOrderPlaced(true);
    Modal.success({
      title: 'Order Placed Successfully!',
      content: 'Thank you! Your order has been placed successfully.',
      okText: 'Go to Order Page',
      onOk: () => router.push('/order'),
    });
  };

  return (
    <div className="mt-10 min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* EMPTY CART */}
        {add.length === 0 ? (
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <Empty
              description={
                <span className="text-base text-slate-600">
                  You need to add food items to your cart first!
                </span>
              }
            />

            <Button
              type="primary"
              size="large"
              className="!mt-4 !bg-green-500 hover:!bg-green-600"
              onClick={() => router.push('/')}
            >
              Go to Homepage
            </Button>
          </div>
        ) : (
          <>
            <h1 className="mb-2 text-2xl font-bold text-slate-800 sm:text-3xl">
              Checkout
            </h1>

            <p className="mb-7 text-slate-500">
              Complete your details to place your order.
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleOrder}
              requiredMark="optional"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">

                {/* LEFT SIDE */}
                <div className="min-w-0 space-y-6">

                  {/* DELIVERY ADDRESS */}
                  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <EnvironmentOutlined className="text-2xl text-green-600" />

                      <div>
                        <h2 className="text-xl font-semibold">
                          Delivery Address
                        </h2>
                        <p className="text-sm text-slate-500">
                          Enter your delivery details
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
                      <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: 'Enter your full name',
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter full name"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Mobile Number"
                        name="mobile"
                        rules={[
                          {
                            required: true,
                            message: 'Enter mobile number',
                          },
                          {
                            pattern: /^[6-9]\d{9}$/,
                            message:
                              'Enter a valid 10-digit Indian mobile number',
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          maxLength={10}
                          inputMode="numeric"
                          placeholder="10-digit mobile number"
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="House / Street Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: 'Enter your address',
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="House no., street, area"
                      />
                    </Form.Item>

                    <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-3">
                      <Form.Item
                        label="City"
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: 'Enter city',
                          },
                        ]}
                      >
                        <Input size="large" placeholder="City" />
                      </Form.Item>

                      <Form.Item
                        label="State"
                        name="state"
                        rules={[
                          {
                            required: true,
                            message: 'Select state',
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          placeholder="Select state"
                          showSearch
                          options={[
                            {
                              label: 'Uttarakhand',
                              value: 'Uttarakhand',
                            },
                            {
                              label: 'Uttar Pradesh',
                              value: 'Uttar Pradesh',
                            },
                            { label: 'Delhi', value: 'Delhi' },
                            { label: 'Haryana', value: 'Haryana' },
                            {
                              label: 'Himachal Pradesh',
                              value: 'Himachal Pradesh',
                            },
                            { label: 'Punjab', value: 'Punjab' },
                            { label: 'Rajasthan', value: 'Rajasthan' },
                            {
                              label: 'Maharashtra',
                              value: 'Maharashtra',
                            },
                            { label: 'Other', value: 'Other' },
                          ]}
                        />
                      </Form.Item>

                      <Form.Item
                        label="PIN Code"
                        name="pinCode"
                        rules={[
                          {
                            required: true,
                            message: 'Enter PIN code',
                          },
                          {
                            pattern: /^[1-9]\d{5}$/,
                            message: 'Enter a valid 6-digit PIN code',
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          maxLength={6}
                          inputMode="numeric"
                          placeholder="6-digit PIN"
                        />
                      </Form.Item>
                    </div>
                  </section>

                  {/* ORDER ITEMS */}
                  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <ShoppingOutlined className="text-2xl text-green-600" />

                      <div>
                        <h2 className="text-xl font-semibold">
                          Order Items
                        </h2>
                        <p className="text-sm text-slate-500">
                          Review your food items
                        </p>
                      </div>
                    </div>

                    {add.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 border-b border-slate-100 py-4 last:border-0"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Image
                            src={item.food_image}
                            alt={item.food_name}
                            width={72}
                            height={72}
                            className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-[72px] sm:w-[72px]"
                          />

                          <div className="min-w-0">
                            <p className="break-words font-medium">
                              {item.food_name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              Qty: {item.food_quantity}
                            </p>
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-medium sm:text-base">
                          Rs {item.price * item.food_quantity} /-
                        </p>
                      </div>
                    ))}
                  </section>

                  {/* PAYMENT METHOD */}
                  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <CreditCardOutlined className="text-2xl text-green-600" />

                      <div>
                        <h2 className="text-xl font-semibold">
                          Payment Method
                        </h2>
                        <p className="text-sm text-slate-500">
                          Choose your preferred payment method
                        </p>
                      </div>
                    </div>

                    <Radio.Group
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                      className="!flex !w-full !flex-col !gap-3 sm:!flex-row"
                    >
                      <Radio.Button
                        value="cod"
                        className="!h-auto !flex-1 !rounded-lg !px-4 !py-3 !text-center"
                      >
                        Cash on Delivery
                      </Radio.Button>

                      <Radio.Button
                        value="upi"
                        className="!h-auto !flex-1 !rounded-lg !px-4 !py-3 !text-center"
                      >
                        UPI
                      </Radio.Button>

                      <Radio.Button
                        value="online"
                        className="!h-auto !flex-1 !rounded-lg !px-4 !py-3 !text-center"
                      >
                        Online Payment
                      </Radio.Button>
                    </Radio.Group>
                  </section>
                </div>

                {/* RIGHT SIDE: ORDER SUMMARY */}
                <aside className="min-w-0">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-6">
                    <h2 className="mb-5 border-b border-slate-200 pb-4 text-xl font-semibold">
                      Order Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-slate-600">Subtotal</p>
                        <p className="whitespace-nowrap font-medium">
                          Rs {subtotal.toFixed(2)} /-
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-slate-600">Delivery Fee</p>
                        <p className="whitespace-nowrap font-medium">
                          Rs {deliveryFees.toFixed(2)} /-
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-slate-600">Taxes (4%)</p>
                        <p className="whitespace-nowrap font-medium">
                          Rs {taxes.toFixed(2)} /-
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                        <p className="text-xl font-bold">Total</p>
                        <p className="whitespace-nowrap text-xl font-bold text-green-600">
                          Rs {total.toFixed(2)} /-
                        </p>
                      </div>

                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        size="large"
                        className="!mt-3 !h-12 !font-semibold"
                      >
                        Place Order
                      </Button>

                      <p className="text-center text-xs text-slate-500">
                        Please verify your delivery address before ordering.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;