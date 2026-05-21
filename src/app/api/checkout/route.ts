import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { auth } from '@/lib/auth';
import { paystack, flutterwave } from '@/services/payment';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB;
    const { items, paymentMethod, shippingAddress } = await req.json();

    // 1. Calculate total and verify stock
    let totalAmount = 0;
    const orderProducts: any[] = [];

    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product || product.stock < item.quantity) {
        return NextResponse.json({ error: `Product ${product?.name || 'unknown'} is out of stock` }, { status: 400 });
      }
      const price = product.salePrice || product.price;
      totalAmount += price * item.quantity;
      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: price,
      });
    }

    // 2. Create pending order
    const order = await Order.create({
      userId: session.user.id,
      items: orderProducts,
      totalAmount,
      shippingAddress,
      paymentStatus: 'PENDING',
      reference: `MHE-${Date.now()}`,
    });

    // 3. Initialize payment
    let paymentData;
    const reference = order.reference;

    if (paymentMethod === 'paystack') {
      paymentData = await paystack.initializeTransaction(session.user.email, totalAmount, reference);
    } else if (paymentMethod === 'flutterwave') {
      paymentData = await flutterwave.initializeTransaction(session.user.email, totalAmount, reference);
    } else {
      return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
    }

    return NextResponse.json({
      checkoutUrl: paymentData.checkout_url || paymentData.link,
      orderId: order._id,
      reference,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
