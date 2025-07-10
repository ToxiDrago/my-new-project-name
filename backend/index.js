const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/pizza-app';
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:4444'],
    credentials: true,
  }),
);

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cart: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, cart } = req.body;
    if (!name || !phone || !address || !cart) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
    const order = new Order({ name, phone, address, cart });
    await order.save();
    res.status(201).json({ message: 'Спасибо за заказ! Мы скоро с вами свяжемся.' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании заказа' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении заказов' });
  }
});

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
