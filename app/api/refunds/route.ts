export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Refund from '@/models/Refund';
import Order from '@/models/Order';
import { requireAuth, requireAdmin } from '@/lib/auth';

async function createRefund(req: NextRequest, user: any) {
  try {
    await dbConnect();

    const { orderId, reason } = await req.json();

    if (!orderId || !reason) {
      return NextResponse.json(
        { success: false, message: 'Please provide order ID and reason' },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.user.toString() !== user._id.toString()) {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 403 }
      );
    }

    // Check if refund already exists
    const existingRefund = await Refund.findOne({ order: orderId });
    if (existingRefund) {
      return NextResponse.json(
        { success: false, message: 'Refund request already exists' },
        { status: 400 }
      );
    }

    const refund = await Refund.create({
      order: orderId,
      user: user._id,
      reason,
      amount: order.totalPrice,
    });

    return NextResponse.json(
      {
        success: true,
        refund,
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

async function getRefunds(req: NextRequest, user: any) {
  try {
    await dbConnect();

    if (user.role === 'admin') {
      const refunds = await Refund.find({})
        .populate('order')
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

      return NextResponse.json({
        success: true,
        refunds,
      });
    } else {
      const refunds = await Refund.find({ user: user._id })
        .populate('order')
        .sort({ createdAt: -1 });

      return NextResponse.json({
        success: true,
        refunds,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export const POST = requireAuth(createRefund as any);
export const GET = requireAuth(getRefunds as any);
