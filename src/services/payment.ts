import axios from 'axios';

export const paystack = {
  async initializeTransaction(email: string, amount: number, reference: string) {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100, // Paystack expects amount in kobo
        reference,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data;
  },

  async verifyTransaction(reference: string) {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    return response.data.data;
  },
};

export const flutterwave = {
  async initializeTransaction(email: string, amount: number, reference: string) {
    const response = await axios.post(
      'https://api.flutterwave.com/v3/payment',
      {
        tx_ref: reference,
        amount: amount.toString(),
        currency: 'NGN',
        payment_options: 'card',
        customer: {
          email: email,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data;
  },

  async verifyTransaction(transactionId: string) {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/verify/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );
    return response.data.data;
  },
};
