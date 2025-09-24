'use client';

import { useState, useEffect, useCallback } from 'react';
import FlightForm from '@/components/FlightForm';
import FlightsTable from '@/components/FlightsTable';
import { Flight } from '@/types/flight';

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSubmittedFlight, setLastSubmittedFlight] = useState<Flight | undefined>();

  const fetchFlights = useCallback(async () => {
    try {
      const response = await fetch('/api/flights');
      if (response.ok) {
        const data = await response.json();
        setFlights(data);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, [fetchFlights]);

  const handleSubmit = async (flight: Flight) => {
    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flight),
      });

      if (response.ok) {
        setLastSubmittedFlight(flight);
        await fetchFlights();
      } else {
        throw new Error('Failed to submit flight');
      }
    } catch (error) {
      console.error('Error submitting flight:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            MicroConf Europe 2025 Flights
          </h1>
          <p className="text-lg text-gray-600">
            Share your flight details and find fellow attendees to travel with!
          </p>
        </header>

        <div className="grid gap-8 md:gap-12">
          <div>
            <FlightForm onSubmit={handleSubmit} />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading flights...</p>
            </div>
          ) : (
            <FlightsTable flights={flights} currentUserFlight={lastSubmittedFlight} />
          )}
        </div>

        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>See you at MicroConf Europe 2025!</p>
        </footer>
      </div>
    </div>
  );
}
