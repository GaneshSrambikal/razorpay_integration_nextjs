const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();
const app = express();
app.use(cors());
// Allow specific origin(s) Only When production has such issue
// app.use(cors({
//   origin: 'https://razorpay-integration-nextjs-server.vercel.app/'
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/orders', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send('Bad Request');
    }

    const options = req.body;

    const rp1 = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const orders = await rp1.orders.create(options);

    if (!orders) {
      return res.status(400).send('Bad Request');
    }
    return res.json(orders);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.post('/validate', async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = sha.digest('hex');

  if (digest !== razorpay_signature) {
    return res
      .status(400)
      .json({ msg: 'Transaction not Legit!', isValid: false });
  }

  return res.json({
    msg: 'Transaction is legit',
    orderId: razorpay_order_id,
    isValid: true,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});
