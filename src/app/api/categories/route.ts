import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Category } from '@/models/Category';

export async function GET() {
  try {
    await connectDB;
    const categories = await Category.find().sort({ name: 1 });
    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB;
    const body = await req.json();
    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
