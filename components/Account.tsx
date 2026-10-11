
'use client';

import { useContext, useState } from 'react';
import {
  Avatar, Button, Card, Col, Empty, Form, Input, List, Menu,
  Modal, Row, Select, Space, Switch, Tag, Typography, message,
  Divider, Image, Badge
} from 'antd';
import {
  UserOutlined, ShoppingOutlined, EnvironmentOutlined,
  HeartOutlined, SettingOutlined, EditOutlined, PlusOutlined,
  DeleteOutlined, HeartFilled, MailOutlined, PhoneOutlined
} from '@ant-design/icons';
import { FoodContext } from '@/context/FoodContext';
import { food_items } from '@/components/Foodlist';

const { Title, Text } = Typography;

type Address = {
  id: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  type: string;
};

export default function Account() {
  const context = useContext(FoodContext) as any;

  const cart = context?.add ?? [];
  const orderPlaced = context?.orderPlaced ?? false;

  const [section, setSection] = useState('profile');
  const [mobileMenu, setMobileMenu] = useState('profile');

  const [profile, setProfile] = useState({
    name: 'Your Name',
    email: 'your@email.com',
    phone: '',
  });

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileForm] = Form.useForm();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressOpen, setAddressOpen] = useState(false);
  const [addressForm] = Form.useForm();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    offers: false,
  });

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const menuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'My Profile' },
    { key: 'orders', icon: <ShoppingOutlined />, label: 'My Orders' },
    { key: 'addresses', icon: <EnvironmentOutlined />, label: 'Addresses' },
    { key: 'favorites', icon: <HeartOutlined />, label: 'Favorites' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
  ];

  const changeSection = (key: string) => {
    setSection(key);
    setMobileMenu(key);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const saveProfile = (values: typeof profile) => {
    setProfile(values);
    setProfileOpen(false);
    message.success('Profile updated successfully');
  };

  const addAddress = (values: Omit<Address, 'id'>) => {
    setAddresses(prev => [...prev, { ...values, id: Date.now() }]);
    setAddressOpen(false);
    addressForm.resetFields();
    message.success('Address added successfully');
  };

  const orderId = 'ORD-' + new Date().getTime().toString().slice(-6);

  const renderProfile = () => (
    <div className="space-y-5">
      <Card className="!rounded-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar size={80} icon={<UserOutlined />} className="!bg-orange-500" />
          <div className="flex-1 text-center sm:text-left">
            <Title level={4} className="!mb-1">{profile.name}</Title>
            <Text type="secondary">{profile.email}</Text>
            <div className="mt-3">
              <Button icon={<EditOutlined />} onClick={() => {
                profileForm.setFieldsValue(profile);
                setProfileOpen(true);
              }}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Personal Information" className="!rounded-2xl">
        <Row gutter={[20, 18]}>
          <Col xs={24} md={12}>
            <Text type="secondary">Full Name</Text>
            <div className="mt-1 font-medium">{profile.name}</div>
          </Col>
          <Col xs={24} md={12}>
            <Text type="secondary">Email Address</Text>
            <div className="mt-1 font-medium break-all">{profile.email}</div>
          </Col>
          <Col xs={24} md={12}>
            <Text type="secondary">Phone Number</Text>
            <div className="mt-1 font-medium">{profile.phone || 'Not added'}</div>
          </Col>
        </Row>
      </Card>

      <Card title="Recent Orders" className="!rounded-2xl">
        {cart.length === 0 ? (
          <Empty description="No recent orders available" />
        ) : (
          <div className="space-y-4">
            {cart.map((item: any) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:items-center border-b pb-4">
                <Image
                  src={item.food_image}
                  alt={item.food_name}
                  width={76}
                  height={76}
                  className="!rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <Text strong>{item.food_name}</Text>
                  <div className="text-gray-500 text-sm">
                    Qty: {item.food_quantity ?? 1} · ₹{item.price}
                  </div>
                  <Text type="secondary" className="text-xs">
                    Order ID: {orderId}
                  </Text>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <Tag color={orderPlaced ? 'green' : 'orange'}>
                    {orderPlaced ? 'Delivered' : 'Pending'}
                  </Tag>
                  <Button type="link" onClick={() => setSelectedOrder(item)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderOrders = () => (
    <Card title="My Orders" className="!rounded-2xl">
      {cart.length === 0 ? (
        <Empty description="You haven't ordered anything yet" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cart}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Button key="details" type="link" onClick={() => setSelectedOrder(item)}>
                  View Details
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Image src={item.food_image} alt={item.food_name} width={64} height={64} className="!rounded-lg object-cover" />}
                title={item.food_name}
                description={
                  <>
                    <div>Qty: {item.food_quantity ?? 1} · ₹{item.price}</div>
                    <div className="mt-1">
                      <Tag color={orderPlaced ? 'green' : 'orange'}>
                        {orderPlaced ? 'Delivered' : 'Pending'}
                      </Tag>
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );

  const renderAddresses = () => (
    <Card
      title="My Addresses"
      className="!rounded-2xl"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddressOpen(true)}>
          Add Address
        </Button>
      }
    >
      {addresses.length === 0 ? (
        <Empty description="No saved addresses">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddressOpen(true)}>
            Add Your First Address
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {addresses.map(address => (
            <Col xs={24} md={12} key={address.id}>
              <Card className="!rounded-xl" size="small">
                <div className="flex justify-between gap-2">
                  <Text strong><EnvironmentOutlined /> {address.type}</Text>
                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setAddresses(prev => prev.filter(item => item.id !== address.id));
                      message.success('Address deleted');
                    }}
                  />
                </div>
                <Divider className="!my-3" />
                <Text strong>{address.name}</Text>
                <div className="mt-1">{address.phone}</div>
                <div className="mt-2 text-gray-500 break-words">
                  {address.address}, {address.city} - {address.pincode}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Card>
  );

  const favoriteItems = food_items.filter((item: any) => favorites.includes(item.id));

  const renderFavorites = () => (
    <Card title="My Favorites" className="!rounded-2xl">
      {favoriteItems.length === 0 ? (
        <Empty description="No favorites yet. Add your favorite dishes below." />
      ) : (
        <Row gutter={[16, 16]} className="mb-5">
          {favoriteItems.map((item: any) => (
            <Col xs={24} sm={12} lg={8} key={item.id}>
              <Card
                size="small"
                cover={
                  <Image
                    src={item.food_image}
                    alt={item.food_name}
                    height={150}
                    className="object-cover"
                  />
                }
                actions={[
                  <Button
                    key="remove"
                    type="text"
                    danger
                    icon={<HeartFilled />}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    Remove
                  </Button>
                ]}
              >
                <Card.Meta
                  title={item.food_name}
                  description={`₹${item.price}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Divider />
      <Title level={5}>Explore Dishes</Title>
      <Row gutter={[12, 12]}>
        {food_items
          .filter((item: any) => !favorites.includes(item.id))
          .map((item: any) => (
            <Col xs={24} sm={12} key={item.id}>
              <div className="flex items-center gap-3 border rounded-xl p-3">
                <Image
                  src={item.food_image}
                  alt={item.food_name}
                  width={60}
                  height={60}
                  className="!rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <Text strong>{item.food_name}</Text>
                  <div>₹{item.price}</div>
                </div>
                <Button
                  icon={<HeartOutlined />}
                  onClick={() => toggleFavorite(item.id)}
                >
                  Save
                </Button>
              </div>
            </Col>
          ))}
      </Row>
    </Card>
  );

  const renderSettings = () => (
    <Card title="Account Settings" className="!rounded-2xl">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Text strong>Email Notifications</Text>
            <div className="text-gray-500 text-sm">Receive account-related emails</div>
          </div>
          <Switch
            checked={settings.emailNotifications}
            onChange={checked => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
          />
        </div>
        <Divider className="!my-0" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <Text strong>Order Updates</Text>
            <div className="text-gray-500 text-sm">Get updates about your orders</div>
          </div>
          <Switch
            checked={settings.orderUpdates}
            onChange={checked => setSettings(prev => ({ ...prev, orderUpdates: checked }))}
          />
        </div>
        <Divider className="!my-0" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <Text strong>Offers and Promotions</Text>
            <div className="text-gray-500 text-sm">Receive offers and special deals</div>
          </div>
          <Switch
            checked={settings.offers}
            onChange={checked => setSettings(prev => ({ ...prev, offers: checked }))}
          />
        </div>
        <Button type="primary" onClick={() => message.success('Settings saved')}>
          Save Settings
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Title level={2} className="!mb-1">My Account</Title>
          <Text type="secondary">Manage your profile, orders and preferences</Text>
        </div>

        <Row gutter={[20, 20]}>
          <Col xs={24} lg={6}>
            <Card className="!rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Avatar size={48} icon={<UserOutlined />} className="!bg-orange-500" />
                <div className="min-w-0">
                  <Text strong className="block truncate">{profile.name}</Text>
                  <Text type="secondary" className="text-xs break-all">{profile.email}</Text>
                </div>
              </div>

              <div className="lg:hidden mb-3">
                <Select
                  value={mobileMenu}
                  onChange={changeSection}
                  className="w-full"
                  options={menuItems.map(item => ({
                    value: item.key,
                    label: item.label,
                  }))}
                />
              </div>

              <div className="hidden lg:block">
                <Menu
                  mode="inline"
                  selectedKeys={[section]}
                  items={menuItems}
                  onClick={({ key }) => changeSection(key)}
                  className="!border-e-0"
                />
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={18}>
            {section === 'profile' && renderProfile()}
            {section === 'orders' && renderOrders()}
            {section === 'addresses' && renderAddresses()}
            {section === 'favorites' && renderFavorites()}
            {section === 'settings' && renderSettings()}
          </Col>
        </Row>
      </div>

      <Modal
        title="Edit Profile"
        open={profileOpen}
        onCancel={() => setProfileOpen(false)}
        onOk={() => profileForm.submit()}
        okText="Save Changes"
        destroyOnHidden
      >
        <Form
          form={profileForm}
          layout="vertical"
          initialValues={profile}
          onFinish={saveProfile}
        >
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Enter your name' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number">
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add New Address"
        open={addressOpen}
        onCancel={() => setAddressOpen(false)}
        onOk={() => addressForm.submit()}
        okText="Save Address"
        destroyOnHidden
      >
        <Form form={addressForm} layout="vertical" onFinish={addAddress}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="address" label="Full Address" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="House no., street, area" />
          </Form.Item>
          <Row gutter={12}>
            <Col xs={24} sm={12}>
              <Form.Item name="city" label="City" rules={[{ required: true }]}>
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="pincode" label="PIN Code" rules={[{ required: true }]}>
                <Input placeholder="PIN code" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="type" label="Address Type" initialValue="Home" rules={[{ required: true }]}>
            <Select options={[
              { value: 'Home', label: 'Home' },
              { value: 'Work', label: 'Work' },
              { value: 'Other', label: 'Other' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Order Details"
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={<Button type="primary" onClick={() => setSelectedOrder(null)}>Close</Button>}
      >
        {selectedOrder && (
          <div className="space-y-3">
            <Image
              src={selectedOrder.food_image}
              alt={selectedOrder.food_name}
              width="100%"
              height={180}
              className="!rounded-xl object-cover"
            />
            <Title level={5}>{selectedOrder.food_name}</Title>
            <Text>Quantity: {selectedOrder.food_quantity ?? 1}</Text>
            <div>Price: ₹{selectedOrder.price}</div>
            <div>Order ID: {orderId}</div>
            <div>Status: <Tag color={orderPlaced ? 'green' : 'orange'}>{orderPlaced ? 'Delivered' : 'Pending'}</Tag></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
