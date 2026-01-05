import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import User, { IUser } from '@/models/User';
import dbConnect from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(req: NextRequest): Promise<IUser | null> {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || cookies().get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }

    await dbConnect();
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch (error) {
    return null;
  }
}

export function requireAuth(handler: (req: NextRequest, user: IUser) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const user = await getCurrentUser(req);

    if (!user || !user.isActive) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    return handler(req, user);
  };
}

export function requireAdmin(handler: (req: NextRequest, user: IUser) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const user = await getCurrentUser(req);

    if (!user || !user.isActive) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 });
    }

    return handler(req, user);
  };
}
