'use client';

import React, { useState } from 'react';
import { Flight } from '@/types/flight';

interface FlightFormProps {
  onSubmit: (flight: Flight) => Promise<void>;
}

const FlightForm: React.FC<FlightFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Flight>({
    phoneNumber: '',
    departureAirport: '',
    arrivalDate: '',
    arrivalTime: '',
    returnDate: '',
    returnTime: '',
    destinationAirport: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'departureAirport' || name === 'destinationAirport') {
      processedValue = value.toUpperCase().slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({
        phoneNumber: '',
        departureAirport: '',
        arrivalDate: '',
        arrivalTime: '',
        returnDate: '',
        returnTime: '',
        destinationAirport: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Your Flight Details</h2>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
          WhatsApp Number (with international prefix)
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          placeholder="+1234567890"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-gray-900"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-700 mb-2">
          Departure Airport (3-letter code)
        </label>
        <input
          type="text"
          id="departureAirport"
          name="departureAirport"
          value={formData.departureAirport}
          onChange={handleChange}
          required
          maxLength={3}
          placeholder="JFK"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition uppercase placeholder-gray-400 text-gray-900"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-2">
          Arrival Date
        </label>
        <input
          type="date"
          id="arrivalDate"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-gray-900"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 mb-2">
          Arrival Time
        </label>
        <input
          type="time"
          id="arrivalTime"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-gray-900"
        />
      </div>

      {/* Return Flight Information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Return Flight (Optional)</h3>

        <div className="mb-4">
          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
            Departure Date
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-gray-900"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="returnTime" className="block text-sm font-medium text-gray-700 mb-2">
            Flight Departure Time
          </label>
          <input
            type="time"
            id="returnTime"
            name="returnTime"
            value={formData.returnTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-gray-900"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="destinationAirport" className="block text-sm font-medium text-gray-700 mb-2">
            Destination Airport (3-letter code)
          </label>
          <input
            type="text"
            id="destinationAirport"
            name="destinationAirport"
            value={formData.destinationAirport}
            onChange={handleChange}
            maxLength={3}
            placeholder="LAX"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition uppercase placeholder-gray-400 text-gray-900"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Flight Details'}
      </button>
    </form>
  );
};

export default FlightForm;