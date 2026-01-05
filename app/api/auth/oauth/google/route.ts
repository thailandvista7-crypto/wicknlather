export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { id, email, name, picture } = await req.json();

    if (!id || !email || !name) {
      return NextResponse.json(
        { success: false, message: 'Missing required OAuth data' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // Update provider info if needed
      if (!user.provider || user.provider === 'local') {
        user.provider = 'google';
        user.providerId = id;
        if (picture) user.avatar = picture;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        provider: 'google',
        providerId: id,
        avatar: picture,
        isActive: true,
      });
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Account is disabled' },
        { status: 403 }
      );
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
