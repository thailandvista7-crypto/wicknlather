export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { requireAuth } from '@/lib/auth';
import { calculateTax, calculateShipping } from '@/lib/utils';

async function handler(req: NextRequest, user: any) {
  try {
    await dbConnect();

    const { orderItems, shippingAddress } = await req.json();

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No order items' },
        { status: 400 }
      );
    }

    // Calculate prices
    let itemsPrice = 0;
    for (const item of orderItems) {
      itemsPrice += item.price * item.quantity;
    }

    const shippingPrice = calculateShipping(itemsPrice);
    const taxPrice = calculateTax(itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // Create order in database (will be updated when payment is confirmed)
    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentMethod: 'paypal',
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    // Return order data for PayPal
    return NextResponse.json({
      success: true,
      orderId: order._id.toString(),
      orderData: {
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export const POST = requireAuth(handler as any);
