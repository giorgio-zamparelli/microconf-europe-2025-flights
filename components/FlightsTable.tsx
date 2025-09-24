'use client';

import React from 'react';
import { Flight } from '@/types/flight';
import { format, parseISO, differenceInMinutes } from 'date-fns';

interface FlightsTableProps {
  flights: Flight[];
  currentUserFlight?: Flight;
}

const FlightsTable: React.FC<FlightsTableProps> = ({ flights, currentUserFlight }) => {
  const getMatchingFlights = () => {
    if (!currentUserFlight) return [];

    return flights.filter((flight) => {
      if (flight.phoneNumber === currentUserFlight.phoneNumber) return false;

      const sameAirport = flight.departureAirport === currentUserFlight.departureAirport;

      const sameDay = flight.arrivalDate === currentUserFlight.arrivalDate;

      let within30Minutes = false;
      if (sameDay && flight.arrivalTime && currentUserFlight.arrivalTime) {
        const flightDateTime = new Date(`${flight.arrivalDate}T${flight.arrivalTime}`);
        const currentDateTime = new Date(`${currentUserFlight.arrivalDate}T${currentUserFlight.arrivalTime}`);
        const minutesDiff = Math.abs(differenceInMinutes(flightDateTime, currentDateTime));
        within30Minutes = minutesDiff <= 30;
      }

      return sameAirport || (sameDay && within30Minutes);
    });
  };

  const matchingFlights = currentUserFlight ? getMatchingFlights() : [];
  const otherFlights = currentUserFlight
    ? flights.filter((f) => !matchingFlights.includes(f) && f.phoneNumber !== currentUserFlight.phoneNumber)
    : flights;

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      return format(date, 'h:mm a');
    } catch {
      return timeString;
    }
  };

  const isMatchingFlight = (flight: Flight) => matchingFlights.includes(flight);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Flight Details</h2>

      {matchingFlights.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-green-600">
            Potential Travel Companions (same airport or arrival within 30 minutes)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    WhatsApp Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure Airport
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matchingFlights.map((flight, index) => (
                  <tr key={flight.id || index} className="hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a
                        href={`https://wa.me/${flight.phoneNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 hover:underline font-medium"
                      >
                        {flight.phoneNumber.startsWith('+') ? flight.phoneNumber : `+${flight.phoneNumber}`}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {flight.departureAirport}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(flight.arrivalDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(flight.arrivalTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {otherFlights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {matchingFlights.length > 0 ? 'Other Attendees' : 'All Attendees'}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    WhatsApp Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure Airport
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {otherFlights.map((flight, index) => (
                  <tr key={flight.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a
                        href={`https://wa.me/${flight.phoneNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 hover:underline font-medium"
                      >
                        {flight.phoneNumber.startsWith('+') ? flight.phoneNumber : `+${flight.phoneNumber}`}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {flight.departureAirport}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(flight.arrivalDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(flight.arrivalTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {flights.length === 0 && (
        <p className="text-gray-500 text-center py-8">No flights registered yet.</p>
      )}
    </div>
  );
};

export default FlightsTable;