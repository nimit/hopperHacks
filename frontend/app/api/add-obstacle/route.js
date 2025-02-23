import clientPromise from '../../../lib/mongodb'; // Reference the existing MongoDB connection

export async function POST(request) {
    const { type, description, latitude, longitude, photo } = await request.json();

    // Validate required fields
    if (!type || !description || !latitude || !longitude) {
        return new Response(JSON.stringify({ message: 'Type, description, latitude, and longitude are required.' }), { status: 400 });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db('your-database-name'); // Replace with your database name

    // Create the obstacle object
    const newObstacle = {
        type,
        description,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude], // MongoDB expects [longitude, latitude]
        },
        photo: photo || null, // Optional field
        createdAt: new Date(),
    };

    // Insert the new obstacle into the database
    await db.collection('obstacles').insertOne(newObstacle);
    console.log("New obstacle added:", newObstacle);

    return new Response(JSON.stringify({ message: 'Obstacle added successfully', obstacle: newObstacle }), { status: 201 });
}

export async function GET() {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db('your-database-name'); // Replace with your database name

    // Fetch all obstacles from the database
    const obstacles = await db.collection('obstacles').find({}).toArray();

    return new Response(JSON.stringify(obstacles), { status: 200 });
}
