import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('your_publishable_key');

export async function createCheckoutSession(priceId: string, customerId?: string) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, customerId }),
    });
    
    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    
    if (!stripe) throw new Error('Stripe failed to load');
    
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) throw error;
  } catch (error: any) {
    console.error('Error:', error);
    throw error;
  }
}