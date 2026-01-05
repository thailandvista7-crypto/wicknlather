import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Create order
      const orderItems = JSON.parse(session.metadata?.orderItems || '[]');
      const shippingAddress = JSON.parse(session.metadata?.shippingAddress || '{}');

      const order = await Order.create({
        user: session.metadata?.userId,
        orderItems,
        shippingAddress,
        paymentMethod: 'stripe',
        paymentResult: {
          id: session.payment_intent as string,
          status: session.payment_status,
          email_address: session.customer_email || undefined,
        },
        itemsPrice: parseFloat(session.metadata?.itemsPrice || '0'),
        shippingPrice: parseFloat(session.metadata?.shippingPrice || '0'),
        taxPrice: parseFloat(session.metadata?.taxPrice || '0'),
        totalPrice: parseFloat(session.metadata?.totalPrice || '0'),
        isPaid: session.payment_status === 'paid',
        paidAt: session.payment_status === 'paid' ? new Date() : undefined,
      });

      // Update product stock
      for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
