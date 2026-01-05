'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { FiTrendingUp, FiDollarSign, FiPackage, FiUsers, FiShoppingCart, FiAlertCircle } from 'react-icons/fi';

interface DashboardStats {
  products: number;
  orders: number;
  users: number;
  refunds: number;
  totalRevenue: number;
  monthlyRevenue: number;
  recentOrders: any[];
  lowStockProducts: any[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    orders: 0,
    users: 0,
    refunds: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    recentOrders: [],
    lowStockProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          if (data.user.role !== 'admin') {
            router.push('/dashboard');
            return;
          } else {
            setUser(data.user);
            fetchDashboardData(token);
          }
        } else {
          router.push('/login');
        }
      })
      .catch((error) => {
        console.error('Auth error:', error);
        router.push('/login');
      });
  }, [router]);

  const fetchDashboardData = async (token: string) => {
    try {
      const [productsRes, ordersRes, usersRes, refundsRes] = await Promise.all([
        fetch('/api/admin/products', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/orders', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/refunds', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const [products, orders, users, refunds] = await Promise.all([
        productsRes.json(),
        ordersRes.json(),
        usersRes.json(),
        refundsRes.json(),
      ]);

      // Calculate revenue
      const allOrders = orders.orders || [];
      const totalRevenue = allOrders
        .filter((o: any) => o.isPaid)
        .reduce((sum: number, o: any) => sum + o.totalPrice, 0);

      const currentMonth = new Date().getMonth();
      const monthlyRevenue = allOrders
        .filter((o: any) => {
          const orderDate = new Date(o.createdAt);
          return o.isPaid && orderDate.getMonth() === currentMonth;
        })
        .reduce((sum: number, o: any) => sum + o.totalPrice, 0);

      // Get recent orders
      const recentOrders = allOrders.slice(0, 5);

      // Get low stock products
      const lowStockProducts = (products.products || []).filter((p: any) => p.stock < 10).slice(0, 5);

      setStats({
        products: products.total || 0,
        orders: orders.total || 0,
        users: users.total || 0,
        refunds: refunds.refunds?.length || 0,
        totalRevenue,
        monthlyRevenue,
        recentOrders,
        lowStockProducts,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary-dark">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-green">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-primary-green">{formatPrice(stats.totalRevenue)}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <FiDollarSign className="w-12 h-12 text-primary-green opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-amber">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                <p className="text-3xl font-bold text-primary-amber">{formatPrice(stats.monthlyRevenue)}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <FiTrendingUp className="w-12 h-12 text-primary-amber opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600">{stats.orders}</p>
                <p className="text-xs text-gray-500 mt-1">All orders</p>
              </div>
              <FiShoppingCart className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-purple-600">{stats.users}</p>
                <p className="text-xs text-gray-500 mt-1">Registered users</p>
              </div>
              <FiUsers className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif font-bold text-primary-dark">Recent Orders</h2>
              <Link
                href="/admin/orders"
                className="text-primary-green hover:underline text-sm font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {stats.recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent orders</p>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                      <p className="text-sm text-gray-600">
                        {order.user?.name || 'Guest'} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-green">{formatPrice(order.totalPrice)}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          order.orderStatus === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.orderStatus === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif font-bold text-primary-dark">Low Stock</h2>
              <FiAlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <div className="space-y-3">
              {stats.lowStockProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">All products well stocked</p>
              ) : (
                stats.lowStockProducts.map((product: any) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600">Only {product.stock} left</p>
                    </div>
                    <Link
                      href={`/admin/products/${product._id}`}
                      className="text-primary-green hover:underline text-xs font-semibold"
                    >
                      Edit →
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition group"
          >
            <FiPackage className="w-8 h-8 text-primary-green mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-serif font-bold text-primary-dark mb-2">Products</h3>
            <p className="text-gray-600 text-sm">{stats.products} total products</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition group"
          >
            <FiShoppingCart className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-serif font-bold text-primary-dark mb-2">Orders</h3>
            <p className="text-gray-600 text-sm">{stats.orders} total orders</p>
          </Link>

          <Link
            href="/admin/refunds"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition group"
          >
            <FiAlertCircle className="w-8 h-8 text-orange-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-serif font-bold text-primary-dark mb-2">Refunds</h3>
            <p className="text-gray-600 text-sm">{stats.refunds} pending requests</p>
          </Link>

          <Link
            href="/admin/users"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition group"
          >
            <FiUsers className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-serif font-bold text-primary-dark mb-2">Users</h3>
            <p className="text-gray-600 text-sm">{stats.users} registered users</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
