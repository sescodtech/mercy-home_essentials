import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    await connectDB;
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('cat');
    const search = searchParams.get('q');

    let query: any = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).populate('category').sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
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
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
