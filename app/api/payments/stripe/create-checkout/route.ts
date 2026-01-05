import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { requireAuth } from '@/lib/auth';
import { calculateTax, calculateShipping } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

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

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: orderItems.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        userId: user._id.toString(),
        orderItems: JSON.stringify(orderItems),
        shippingAddress: JSON.stringify(shippingAddress),
        itemsPrice: itemsPrice.toString(),
        shippingPrice: shippingPrice.toString(),
        taxPrice: taxPrice.toString(),
        totalPrice: totalPrice.toString(),
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export const POST = requireAuth(handler as any);
