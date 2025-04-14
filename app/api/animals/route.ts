import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/components/database';
import Animal from '@/models/Animal';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('Fetching animals from DB...'); // Debug log
    
    const animals = await Animal.find({});
    console.log('Found animals:', animals.length); // Debug log
    
    return NextResponse.json(animals);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}