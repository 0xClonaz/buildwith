export type Plan = 'free' | 'premium' | 'premium_plus' | 'unlimited';

export interface User {
  id: string;
  email: string;
  plan: Plan;
  credits: number;
  wordLimit: number;
  displayName?: string;
  photoURL?: string;
  stripeCustomerId?: string;
  createdAt: Date;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  wordLimit: number;
  credits: number;
  isLifetime?: boolean;
  features: string[];
  stripePriceId?: string;
}

export interface CreditPack {
  id: string;
  credits: number;
  price: number;
  stripePriceId?: string;
}