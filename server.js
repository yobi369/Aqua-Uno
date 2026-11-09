import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');

mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(path.join(dataDir, 'aqua-uno.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    size TEXT,
    category TEXT,
    description TEXT,
    price INTEGER NOT NULL,
    original_price INTEGER,
    stock INTEGER NOT NULL DEFAULT 0,
    reorder_level INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    featured INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    best_for TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS addresses (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    label TEXT,
    address TEXT NOT NULL,
    county TEXT,
    town TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS cart_sessions (
    id TEXT PRIMARY KEY,
    customer_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id TEXT PRIMARY KEY,
    cart_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    unit_price INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart_sessions(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    order_reference TEXT UNIQUE NOT NULL,
    customer_id TEXT,
    customer_name TEXT,
    customer_phone TEXT,
    email TEXT,
    county TEXT,
    town TEXT,
    address TEXT,
    delivery_notes TEXT,
    subtotal INTEGER NOT NULL,
    delivery_fee INTEGER NOT NULL DEFAULT 0,
    total INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    payment_status TEXT NOT NULL DEFAULT 'PENDING',
    payment_method TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price INTEGER NOT NULL,
    total INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    provider TEXT,
    provider_reference TEXT,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    callback_payload TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS inventory_movements (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    delta INTEGER NOT NULL,
    reason TEXT,
    reference TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    entity_type TEXT,
    entity_id TEXT,
    action TEXT,
    details TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const ensureSeedData = () => {
  const productCount = db.prepare('SELECT COUNT(*) AS count FROM products').get()?.count ?? 0;
  if (productCount > 0) return;

  const productRows = [
    {
      id: 'prod-20l',
      name: '20 Litre Dispenser Bottle',
      sku: 'AQ-20L',
      size: '20 Litres',
      category: 'dispenser',
      description: 'Flagship Aqua Uno refill bottle for homes and offices.',
      price: 1300,
      original_price: 1500,
      stock: 120,
      reorder_level: 30,
      active: 1,
      featured: 1,
      image: '/assets/aqua_uno_real_20l.jpg',
      best_for: 'Homes and offices'
    },
    {
      id: 'prod-10l',
      name: '10 Litre Family Container',
      sku: 'AQ-10L',
      size: '10 Litres',
      category: 'dispenser',
      description: 'Compact family-sized water bottle for busy households.',
      price: 400,
      stock: 85,
      reorder_level: 20,
      active: 1,
      featured: 1,
      image: '/assets/aqua_uno_real_10l.jpg',
      best_for: 'Small families'
    },
    {
      id: 'prod-5l',
      name: '5 Litre Family Bottle',
      sku: 'AQ-5L',
      size: '5 Litres',
      category: 'bottles',
      description: 'Convenient bottle for daily home hydration.',
      price: 440,
      stock: 95,
      reorder_level: 25,
      active: 1,
      featured: 0,
      image: '/assets/aqua_uno_real_5l.jpg',
      best_for: 'Family kitchens'
    },
    {
      id: 'prod-1-5l-pack',
      name: '1.5 Litre Bottle (Pack of 12)',
      sku: 'AQ-1.5L-12',
      size: '12 × 1.5 Litres',
      category: 'packs',
      description: 'High-volume hydration pack for travel and activity.',
      price: 400,
      stock: 70,
      reorder_level: 20,
      active: 1,
      featured: 0,
      image: '/assets/aqua_uno_real_1_5l.jpg',
      best_for: 'Travel and exercise'
    },
    {
      id: 'prod-1l-pack',
      name: '1 Litre Bottle (Pack of 12)',
      sku: 'AQ-1L-12',
      size: '12 × 1.0 Litre',
      category: 'packs',
      description: 'Personal hydration pack with easy carry format.',
      price: 380,
      stock: 80,
      reorder_level: 20,
      active: 1,
      featured: 0,
      image: '/assets/aqua_uno_real_1l.jpg',
      best_for: 'Work and school'
    },
    {
      id: 'prod-500ml-pack',
      name: '500 ml Pack (24 Bottles)',
      sku: 'AQ-500ML-24',
      size: '24 × 500ml',
      category: 'packs',
      description: 'Compact grab-and-go pack for events and offices.',
      price: 380,
      stock: 60,
      reorder_level: 18,
      active: 1,
      featured: 1,
      image: '/assets/aqua_uno_real_500ml.jpg',
      best_for: 'Events and offices'
    }
  ];

  const insert = db.prepare(`
    INSERT INTO products (
      id, name, sku, size, category, description, price, original_price, stock, reorder_level, active, featured, image, best_for
    ) VALUES (
      @id, @name, @sku, @size, @category, @description, @price, @original_price, @stock, @reorder_level, @active, @featured, @image, @best_for
    )
  `);

  for (const row of productRows) {
    insert.run(row);
  }
};

const parseJsonBody = express.json({ limit: '1mb' });
app.use(parseJsonBody);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'aqua-uno-commerce', timestamp: new Date().toISOString() });
});

app.get('/api/products', (req, res) => {
  ensureSeedData();
  const rows = db.prepare('SELECT * FROM products WHERE active = 1 ORDER BY name ASC').all();
  res.json(rows.map((row) => ({
    ...row,
    active: Boolean(row.active),
    featured: Boolean(row.featured),
  })));
});

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json({ ...row, active: Boolean(row.active), featured: Boolean(row.featured) });
});

app.post('/api/orders', (req, res) => {
  const { customer, cart, delivery, paymentMethod } = req.body || {};
  if (!customer || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Customer and cart are required' });
  }

  const orderId = cryptoRandomId();
  const orderReference = `AQ-${Date.now().toString().slice(-8)}`;

  let subtotal = 0;
  const orderItems = [];

  for (const item of cart) {
    const product = db.prepare('SELECT * FROM products WHERE id = ? AND active = 1').get(item.productId);
    if (!product) {
      return res.status(400).json({ error: `Product not found: ${item.productId}` });
    }
    if ((product.stock ?? 0) < (item.quantity ?? 0)) {
      return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
    }

    const unitPrice = Number(product.price);
    const lineTotal = unitPrice * Number(item.quantity);
    subtotal += lineTotal;
    orderItems.push({
      id: cryptoRandomId(),
      productId: product.id,
      productName: product.name,
      quantity: Number(item.quantity),
      unitPrice,
      lineTotal,
    });
  }

  const deliveryFee = subtotal >= 500 ? 0 : 100;
  const total = subtotal + deliveryFee;

  try {
    db.exec('BEGIN IMMEDIATE');

    db.prepare(`
      INSERT INTO orders (
        id, order_reference, customer_id, customer_name, customer_phone, email, county, town, address, delivery_notes,
        subtotal, delivery_fee, total, status, payment_status, payment_method
      ) VALUES (
        @id, @order_reference, @customer_id, @customer_name, @customer_phone, @email, @county, @town, @address, @delivery_notes,
        @subtotal, @delivery_fee, @total, @status, @payment_status, @payment_method
      )
    `).run({
      id: orderId,
      order_reference: orderReference,
      customer_id: customer.id || null,
      customer_name: customer.fullName || customer.name || 'Guest',
      customer_phone: customer.phone || '',
      email: customer.email || '',
      county: delivery?.county || '',
      town: delivery?.town || '',
      address: delivery?.address || '',
      delivery_notes: delivery?.notes || '',
      subtotal,
      delivery_fee: deliveryFee,
      total,
      status: 'PENDING',
      payment_status: 'PENDING',
      payment_method: paymentMethod || 'cash',
    });

    const itemInsert = db.prepare(`
      INSERT INTO order_items (id, order_id, product_id, product_name, quantity, unit_price, total)
      VALUES (@id, @order_id, @product_id, @product_name, @quantity, @unit_price, @total)
    `);

    for (const item of orderItems) {
      itemInsert.run({
        id: cryptoRandomId(),
        order_id: orderId,
        product_id: item.productId,
        product_name: item.productName,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total: item.lineTotal,
      });

      const updateResult = db.prepare(`
        UPDATE products
        SET stock = stock - ?
        WHERE id = ? AND stock >= ?
      `).run(item.quantity, item.productId, item.quantity);

      if (updateResult.changes === 0) {
        throw new Error(`Insufficient stock for ${item.productName}`);
      }

      db.prepare(`
        INSERT INTO inventory_movements (id, product_id, delta, reason, reference)
        VALUES (?, ?, ?, 'order-created', ?)
      `).run(cryptoRandomId(), item.productId, -item.quantity, orderReference);
    }

    db.prepare(`
      INSERT INTO payments (id, order_id, payment_method, amount, status, provider)
      VALUES (?, ?, ?, ?, 'PENDING', ?)
    `).run(cryptoRandomId(), orderId, paymentMethod || 'cash', total, paymentMethod || 'cash');

    db.prepare(`
      INSERT INTO audit_logs (id, entity_type, entity_id, action, details)
      VALUES (?, 'order', ?, 'created', ?)
    `).run(cryptoRandomId(), orderId, JSON.stringify({ orderReference, customer: customer.fullName || customer.name || 'Guest' }));

    db.exec('COMMIT');

    res.status(201).json({
      ok: true,
      orderId,
      orderReference,
      total,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      paymentMethod: paymentMethod || 'cash',
    });
  } catch (error) {
    db.exec('ROLLBACK');
    res.status(400).json({ error: 'Unable to create order', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.get('/api/orders/:reference', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE order_reference = ?').get(req.params.reference);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
  res.json({ ...order, items });
});

app.get('/api/analytics/overview', (req, res) => {
  const totalRevenue = db.prepare('SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE status IN ("PENDING","CONFIRMED","PROCESSING","DISPATCHED","DELIVERED","COMPLETED")').get()?.total ?? 0;
  const totalOrders = db.prepare('SELECT COUNT(*) AS total FROM orders').get()?.total ?? 0;
  const lowStock = db.prepare('SELECT * FROM products WHERE stock <= reorder_level AND active = 1 ORDER BY stock ASC LIMIT 10').all();
  res.json({ totalRevenue, totalOrders, lowStock });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'API route not found' });
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = app.listen(port, () => {
  ensureSeedData();
  console.log(`Aqua Uno commerce server running on http://localhost:${port}`);
});

function cryptoRandomId() {
  return `id-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
