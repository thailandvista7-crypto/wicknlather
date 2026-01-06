export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { requireAuth } from '@/lib/auth';
import { calculateTax, calculateShipping } from '@/lib/utils';

async function createOrder(req: NextRequest, user: any) {
  try {
    await dbConnect();

    const { orderItems, shippingAddress, paymentMethod } = await req.json();

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No order items' },
        { status: 400 }
      );
    }

    // Calculate prices
    let itemsPrice = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { success: false, message: `Insufficient stock for ${item.name}` },
          { status: 400 }
        );
      }
      itemsPrice += product.price * item.quantity;
    }

    const shippingPrice = calculateShipping(itemsPrice);
    const taxPrice = calculateTax(itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // Create order
    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

async function getOrders(req: NextRequest, user: any) {
  try {
    await dbConnect();

    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate('orderItems.product', 'name images');

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export const POST = requireAuth(createOrder);
export const GET = requireAuth(getOrders);
