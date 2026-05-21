import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Order } from '@/models/Order';



export async function GET(req: NextRequest) {
  try {
    await connectDB;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query: any = {};
    if (session.user.role !== 'admin') {
      query.userId = session.user.id;
    }

    const orders = await Order.find(query).populate('products.productId').sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB;
    const body = await req.json();

    const order = await Order.create({
      ...body,
      userId: session.user.id
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
