import clientPromise from '../../../lib/mongodb';// Reference the existing MongoDB connection

export async function POST(request) {
    const { imageUrl, medicines } = await request.json();

    // Validate required fields
    // if (!imageUrl || !medicines) {
    //     return new Response(JSON.stringify({ message: 'Image URL and medicines are required.' }), { status: 400 });
    // }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db('your-database-name'); // Replace with your database name

    // Create the prescription object
    const newPrescription = {
        photo: imageUrl,
        medicines,
        createdAt: new Date(),
    };

    // Insert the new prescription into the database
    await db.collection('prescriptions').insertOne(newPrescription);
    console.log("New prescription added:", newPrescription);

    return new Response(JSON.stringify({ message: 'Prescription added successfully', prescription: newPrescription }), { status: 201 });
}


