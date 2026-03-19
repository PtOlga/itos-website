import { NextResponse } from 'next/server';

const disabledResponse = () =>
  NextResponse.json({ message: 'Authentication is disabled' }, { status: 404 });

export { disabledResponse as GET, disabledResponse as POST };