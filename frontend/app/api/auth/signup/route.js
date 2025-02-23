import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { name, email, password } = await request.json();
    console.log("Received signup request:", { name, email });

    const client = await clientPromise;
    const db = client.db('your-database-name'); // Replace with your database name

    // Check if the user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
        console.log("User already exists:", email);
        return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    await db.collection('users').insertOne(newUser);
    console.log("User saved to database:", newUser);

    return new Response(JSON.stringify({ message: 'Signup successful', user: newUser }), { status: 201 });
} 