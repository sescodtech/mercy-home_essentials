import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB;
    const { slug } = await params;
    const product = await Product.findOne({ slug }).populate('category');

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB;
    const { slug } = await params;
    const body = await req.json();
    const product = await Product.findOneAndUpdate({ slug }, body, { new: true });

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB;
    const { slug } = await params;
    await Product.findOneAndDelete({ slug });

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
