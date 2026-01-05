export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { requireAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

async function createProduct(req: NextRequest, user: any) {
  try {
    await dbConnect();

    const { name, description, category, price, images, stock, ingredients, scentNotes, featured } = await req.json();

    if (!name || !description || !category || !price || !images || stock === undefined) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    // Check if slug exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Product with this name already exists' },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      slug,
      description,
      category,
      price,
      images,
      stock,
      ingredients,
      scentNotes,
      featured: featured || false,
    });

    return NextResponse.json(
      {
        success: true,
        product,
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

async function getProducts(req: NextRequest, user: any) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const query: any = {};
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export const POST = requireAdmin(createProduct as any);
export const GET = requireAdmin(getProducts as any);
