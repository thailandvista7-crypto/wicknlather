import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { requireAuth, requireAdmin } from '@/lib/auth';

async function getUserOrder(req: NextRequest, user: any, orderId: string) {
  try {
    await dbConnect();

    const order = await Order.findById(orderId).populate('orderItems.product', 'name images');

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if user owns the order or is admin
    if (order.user.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

async function updateOrderStatus(req: NextRequest, user: any, orderId: string) {
  try {
    await dbConnect();

    const { orderStatus, isDelivered, deliveredAt } = await req.json();

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (isDelivered !== undefined) {
      updateData.isDelivered = isDelivered;
      if (isDelivered) {
        updateData.deliveredAt = deliveredAt || new Date();
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    }).populate('orderItems.product', 'name images');

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAuth(async (req, user) => {
    return await getUserOrder(req, user, params.id);
  })(req);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAdmin(async (req, user) => {
    return await updateOrderStatus(req, user, params.id);
  })(req);
}
