export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Refund from '@/models/Refund';
import Order from '@/models/Order';
import { requireAdmin } from '@/lib/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

async function updateRefund(req: NextRequest, user: any, refundId: string) {
  try {
    await dbConnect();

    const { status, adminNotes, refundTransactionId } = await req.json();

    const refund = await Refund.findById(refundId).populate('order');

    if (!refund) {
      return NextResponse.json(
        { success: false, message: 'Refund not found' },
        { status: 404 }
      );
    }

    const order = refund.order as any;

    // If approving refund, process payment refund
    if (status === 'approved' && refund.status === 'pending') {
      try {
        if (order.paymentMethod === 'stripe' && order.paymentResult?.id) {
          // Process Stripe refund
          const refundPayment = await stripe.refunds.create({
            payment_intent: order.paymentResult.id,
            amount: Math.round(refund.amount * 100),
          });

          refund.refundTransactionId = refundPayment.id;
          refund.status = 'processed';
        } else if (order.paymentMethod === 'paypal') {
          // PayPal refund would be handled via PayPal API
          // For now, mark as processed
          refund.status = 'processed';
          if (refundTransactionId) {
            refund.refundTransactionId = refundTransactionId;
          }
        }
      } catch (error: any) {
        return NextResponse.json(
          { success: false, message: `Refund processing failed: ${error.message}` },
          { status: 500 }
        );
      }
    } else {
      refund.status = status;
    }

    if (adminNotes) {
      refund.adminNotes = adminNotes;
    }

    await refund.save();

    return NextResponse.json({
      success: true,
      refund,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAdmin(async (req, user) => {
    return await updateRefund(req, user, params.id);
  })(req);
}
