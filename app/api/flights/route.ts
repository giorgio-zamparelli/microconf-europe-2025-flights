import { NextRequest, NextResponse } from 'next/server';
import { readFlights, appendFlight, initializeSheet } from '@/lib/googleSheets';
import { Flight } from '@/types/flight';

export async function GET() {
  try {
    await initializeSheet();
    const flights = await readFlights();
    return NextResponse.json(flights);
  } catch (error) {
    console.error('Error reading flights:', error);
    return NextResponse.json(
      { error: 'Failed to read flights' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const flight: Flight = await request.json();

    if (!flight.phoneNumber || !flight.departureAirport || !flight.arrivalDate || !flight.arrivalTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await appendFlight(flight);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding flight:', error);
    return NextResponse.json(
      { error: 'Failed to add flight' },
      { status: 500 }
    );
  }
}