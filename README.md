# MicroConf Europe 2025 Flights

A web application that allows MicroConf Europe 2025 attendees to share their flight details and find fellow travelers.

## Features

- Submit flight information (phone number, departure airport, arrival date/time)
- View all registered flights
- Automatically highlight potential travel companions (same airport or arriving within 30 minutes)
- All data is stored in Google Sheets for easy management
- Real-time updates every 30 seconds

## Setup Instructions

### 1. Google Sheets API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the service account details
   - Click "Create and Continue"
   - Skip the optional steps and click "Done"
5. Generate a key for the Service Account:
   - Click on the service account you just created
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Download the JSON file (keep this secure!)
6. Share the Google Sheet:
   - Open the Google Sheet: https://docs.google.com/spreadsheets/d/1xajg09DWzWROk1R3nvJSso4ktbwrIJIrkwaAI2MRCZY/edit
   - Click "Share"
   - Add the service account email (found in your JSON file as "client_email")
   - Give it "Editor" permissions

### 2. Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd microconf-europe-2025-flights
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Open the downloaded service account JSON file
   - Copy the `client_email` value to `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Copy the entire `private_key` value (including quotes) to `GOOGLE_PRIVATE_KEY`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

1. Push your code to GitHub
2. Import the project to Vercel
3. Add the environment variables in Vercel:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY`
   - Deploy the project

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Google Sheets API
- React Hook Form
- date-fns

## Project Structure

```
├── app/
│   ├── api/
│   │   └── flights/     # API routes for flight operations
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page component
├── components/
│   ├── FlightForm.tsx   # Flight submission form
│   └── FlightsTable.tsx # Flights display table
├── lib/
│   └── googleSheets.ts  # Google Sheets API integration
└── types/
    └── flight.ts        # TypeScript type definitions
```
# Trigger redeployment
