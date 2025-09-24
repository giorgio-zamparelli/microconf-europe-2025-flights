export interface Flight {
  id?: string;
  phoneNumber: string;
  departureAirport: string;
  arrivalDate: string;
  arrivalTime: string;
  // Return flight information
  returnDate?: string;
  returnTime?: string;
  destinationAirport?: string;
  timestamp?: string;
}