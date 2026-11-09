import test from 'node:test';
import assert from 'node:assert/strict';

const baseUrl = 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const text = await response.text();
  return { status: response.status, body: text ? JSON.parse(text) : null };
}

test('health endpoint responds', async () => {
  const result = await request('/api/health');
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
});

test('products endpoint returns catalogue', async () => {
  const result = await request('/api/products');
  assert.equal(result.status, 200);
  assert.ok(Array.isArray(result.body));
  assert.ok(result.body.length > 0);
});

test('order creation validates requirements and inventory', async () => {
  const result = await request('/api/orders', {
    method: 'POST',
    body: JSON.stringify({
      customer: { fullName: 'Jane Doe', phone: '0712345678', email: 'jane@example.com' },
      cart: [{ productId: 'prod-20l', quantity: 1 }],
      delivery: { county: 'Nairobi', town: 'Westlands', address: 'House 5', notes: 'Call before arrival' },
      paymentMethod: 'cash',
    }),
  });

  assert.equal(result.status, 201);
  assert.equal(result.body.ok, true);
  assert.ok(result.body.orderReference);
});

test('invalid order request fails', async () => {
  const result = await request('/api/orders', {
    method: 'POST',
    body: JSON.stringify({}),
  });

  assert.equal(result.status, 400);
  assert.ok(result.body.error);
});
