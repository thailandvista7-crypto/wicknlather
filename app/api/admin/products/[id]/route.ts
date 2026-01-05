export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { requireAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

async function updateProduct(req: NextRequest, user: any, productId: string) {
  try {
    await dbConnect();

    const updateData = await req.json();

    if (updateData.name) {
      updateData.slug = slugify(updateData.name);
    }

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

async function deleteProduct(req: NextRequest, user: any, productId: string) {
  try {
    await dbConnect();

    const product = await Product.findByIdAndUpdate(
      productId,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deactivated',
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
    return await updateProduct(req, user, params.id);
  })(req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAdmin(async (req, user) => {
    return await deleteProduct(req, user, params.id);
  })(req);
}
