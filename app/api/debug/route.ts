import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  // Check if environment variables are set
  const hasEmail = !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const hasKey = !!process.env.GOOGLE_PRIVATE_KEY;

  // Check the format of the private key
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
  const keyLength = privateKey.length;
  const keyStartsWith = privateKey.substring(0, 50) || 'not set';
  const keyEndsWith = privateKey.substring(privateKey.length - 50) || 'not set';
  const keyContainsNewlines = privateKey.includes('\\n');
  const keyContainsActualNewlines = privateKey.includes('\n');
  const hasQuotes = privateKey.startsWith('"') && privateKey.endsWith('"');

  // Process the key the same way we do in googleSheets.ts
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  privateKey = privateKey.replace(/\\n/g, '\n');

  // Try to create auth to see if it works
  let authError = null;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Try to get auth client
    await auth.getClient();
  } catch (error) {
    authError = error instanceof Error ? error.message : 'Unknown error';
  }

  return NextResponse.json({
    status: 'debug',
    env: {
      hasServiceAccountEmail: hasEmail,
      hasPrivateKey: hasKey,
      privateKeyLength: keyLength,
      privateKeyStart: keyStartsWith,
      privateKeyEnd: keyEndsWith,
      containsEscapedNewlines: keyContainsNewlines,
      containsActualNewlines: keyContainsActualNewlines,
      hasQuotes: hasQuotes,
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'Not set',
      authTest: authError ? `Failed: ${authError}` : 'Success',
      processedKeyStart: privateKey.substring(0, 50),
      processedKeyHasNewlines: privateKey.includes('\n')
    }
  });
}