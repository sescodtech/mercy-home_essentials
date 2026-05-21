import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: 'User created successfully',
      userId: newUser._id
    }, { status: 201 });

  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
