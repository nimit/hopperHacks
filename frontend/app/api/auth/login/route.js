import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    console.log("Received login request:", { email });

    const client = await clientPromise;
    const db = client.db('HopperHack'); // Replace with your database name

    // Find the user by email
    const user = await db.collection('users').findOne({ email });
    if (!user) {
        console.log("User not found:", email);
        return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log("Invalid password for user:", email);
        return new NextResponse(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
    }

    console.log("Login successful for user:", user);
    return new NextResponse(JSON.stringify({ message: 'Login successful', user }), { status: 200 });
} 