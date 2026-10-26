import orderData from './orders.json';

export interface ConsumerSupportOrder {
  orderId: string;
  product: string;
  status: string;
  warrantyStatus: 'in_warranty' | 'expired';
  supportPath: string;
  replacement?: {
    reference: string;
    status: 'shipped' | 'delivered';
    expectedContents: string[];
    shippedContents: string[];
  };
}

const orders = orderData.orders as ConsumerSupportOrder[];

export function lookupOrder(orderId: string): ConsumerSupportOrder | null {
  const normalizedId = orderId.trim().toUpperCase();
  return orders.find((order) => order.orderId === normalizedId) ?? null;
}

export function formatOrdersForPrompt(): string {
  return orders
    .map(
      (order) =>
        `${order.orderId}: ${order.product}; status=${order.status}; warranty=${order.warrantyStatus}; support=${order.supportPath}; replacement=${JSON.stringify(order.replacement ?? null)}`,
    )
    .join('\n');
}

export const CONSUMER_SUPPORT_ORDER_FIXTURE_VERSION = orderData.version;
