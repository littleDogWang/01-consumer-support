import { NextResponse } from 'next/server';
import { lookupOrder } from '@/lib/consumer-support/orders';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { order_id?: unknown };
    if (typeof body.order_id !== 'string' || !body.order_id.trim()) {
      return NextResponse.json(
        { error: 'order_id is required' },
        { status: 400 },
      );
    }

    const order = lookupOrder(body.order_id);
    if (!order) {
      return NextResponse.json(
        { error: 'order_not_found', order_id: body.order_id.trim() },
        { status: 404 },
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'invalid request' },
      { status: 400 },
    );
  }
}
