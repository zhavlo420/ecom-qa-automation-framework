const { test, expect } = require('@playwright/test');

const API = 'https://dummyjson.com';

test.describe('Products API - DummyJSON public demo API', () => {
  test('API-001 GET products returns 200', async ({ request }) => {
    const response = await request.get(`${API}/products`);
    expect(response.status()).toBe(200);
  });

  test('API-002 products response contains product array', async ({ request }) => {
    const response = await request.get(`${API}/products`);
    const body = await response.json();
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API-003 product objects contain required fields', async ({ request }) => {
    const response = await request.get(`${API}/products`);
    const body = await response.json();
    expect(body.products[0]).toHaveProperty('id');
    expect(body.products[0]).toHaveProperty('title');
    expect(body.products[0]).toHaveProperty('price');
  });

  test('API-004 GET product by ID returns matching ID', async ({ request }) => {
    const response = await request.get(`${API}/products/1`);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
  });

  test('API-005 GET product search returns results', async ({ request }) => {
    const response = await request.get(`${API}/products/search?q=phone`);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API-006 limit query restricts result count', async ({ request }) => {
    const response = await request.get(`${API}/products?limit=5`);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.products).toHaveLength(5);
  });

  test('API-007 categories endpoint returns an array', async ({ request }) => {
    const response = await request.get(`${API}/products/category-list`);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('API-008 invalid product ID returns not found', async ({ request }) => {
    const response = await request.get(`${API}/products/99999999`);
    expect(response.status()).toBe(404);
  });

  test('API-009 add product endpoint accepts valid payload', async ({ request }) => {
    const response = await request.post(`${API}/products/add`, {
      data: { title: 'QA Demo Product', price: 25, description: 'Created by an API test' }
    });
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.title).toBe('QA Demo Product');
  });

  test('API-010 update product endpoint returns updated data', async ({ request }) => {
    const response = await request.put(`${API}/products/1`, {
      data: { title: 'Updated QA Product' }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.title).toBe('Updated QA Product');
  });
});
