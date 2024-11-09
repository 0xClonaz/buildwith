export interface User {
  id: string;
  plan: 'free' | 'premium' | 'premium_plus' | 'unlimited';
  credits: number;
  wordLimit: number;
}