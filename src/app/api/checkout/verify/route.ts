import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { paystack, flutterwave } from '@/services/payment';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');
    const method = searchParams.get('method');

    if (!reference || !method) {
      return NextResponse.json({ error: 'Missing reference or method' }, { status: 400 });
    }

    await connectDB;

    let verified = false;
    if (method === 'paystack') {
      const data = await paystack.verifyTransaction(reference);
      if (data.status === 'success') verified = true;
    } else if (method === 'flutterwave') {
      const data = await flutterwave.verifyTransaction(reference);
      if (data.status === 'successful') verified = true;
    }

    if (!verified) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Update order status and reduce stock
    const order = await Order.findOne({ reference }); // Need to add reference to Order model
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    order.paymentStatus = 'PAID';
    await order.save();

    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    return NextResponse.json({ message: 'Payment verified and order completed', orderId: order._id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
