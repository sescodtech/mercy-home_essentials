import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import { Product } from '@/models/Product';



export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB;
    const user = await User.findById(session.user.id).populate('wishlist');
    return NextResponse.json(user?.wishlist || [], { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB;
    const { productId } = await req.json();

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $addToSet: { wishlist: productId } },
      { new: true }
    );

    return NextResponse.json(user.wishlist, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB;
    const { productId } = await req.json();

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $pull: { wishlist: productId } },
      { new: true }
    );

    return NextResponse.json(user.wishlist, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
