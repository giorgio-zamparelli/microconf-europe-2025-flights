import { google } from 'googleapis';
import { Flight } from '@/types/flight';

const SPREADSHEET_ID = '1xajg09DWzWROk1R3nvJSso4ktbwrIJIrkwaAI2MRCZY';
const RANGE = 'Sheet1!A:E';

export const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
};

export const readFlights = async (): Promise<Flight[]> => {
  const sheets = await getGoogleSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = response.data.values || [];

  if (rows.length <= 1) return [];

  const flights: Flight[] = rows.slice(1).map((row, index) => ({
    id: `${index + 2}`,
    phoneNumber: row[0] || '',
    departureAirport: row[1] || '',
    arrivalDate: row[2] || '',
    arrivalTime: row[3] || '',
    timestamp: row[4] || new Date().toISOString(),
  }));

  return flights;
};

export const appendFlight = async (flight: Flight): Promise<void> => {
  const sheets = await getGoogleSheetsClient();

  const values = [[
    flight.phoneNumber,
    flight.departureAirport,
    flight.arrivalDate,
    flight.arrivalTime,
    new Date().toISOString(),
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });
};

export const initializeSheet = async (): Promise<void> => {
  const sheets = await getGoogleSheetsClient();

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1:E1',
    });

    if (!response.data.values || response.data.values.length === 0) {
      const headers = [['Phone Number', 'Departure Airport', 'Arrival Date', 'Arrival Time', 'Timestamp']];

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A1:E1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: headers,
        },
      });
    }
  } catch (error) {
    console.error('Error initializing sheet:', error);
  }
};