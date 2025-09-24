import { NextResponse } from 'next/server';

export async function GET() {
  // Check if environment variables are set
  const hasEmail = !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const hasKey = !!process.env.GOOGLE_PRIVATE_KEY;

  // Check the format of the private key
  const keyLength = process.env.GOOGLE_PRIVATE_KEY?.length || 0;
  const keyStartsWith = process.env.GOOGLE_PRIVATE_KEY?.substring(0, 30) || 'not set';
  const keyContainsNewlines = process.env.GOOGLE_PRIVATE_KEY?.includes('\\n') || false;
  const keyContainsActualNewlines = process.env.GOOGLE_PRIVATE_KEY?.includes('\n') || false;

  return NextResponse.json({
    status: 'debug',
    env: {
      hasServiceAccountEmail: hasEmail,
      hasPrivateKey: hasKey,
      privateKeyLength: keyLength,
      privateKeyStart: keyStartsWith,
      containsEscapedNewlines: keyContainsNewlines,
      containsActualNewlines: keyContainsActualNewlines,
      email: hasEmail ? 'Set' : 'Not set',
    }
  });
}