export const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    isLifetime: false,
    features: [
      '40 words per prompt',
      '5 credits included',
      'Basic website builder',
      'Preview mode'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    isLifetime: false,
    features: [
      '120 words per prompt',
      '100 credits included',
      'Advanced website builder',
      'Real-time preview',
      'Priority support'
    ]
  },
  {
    id: 'premium_plus',
    name: 'Premium+',
    price: 24.99,
    isLifetime: false,
    features: [
      '300 words per prompt',
      '100 credits included',
      'Premium website builder',
      'Real-time preview',
      'Priority support',
      'Custom domains'
    ]
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 500,
    isLifetime: true,
    features: [
      '10,000 words per prompt',
      'Unlimited credits',
      'Enterprise website builder',
      'Real-time preview',
      'Priority support',
      'Custom domains',
      'White-label solution'
    ]
  }
];

export const CREDIT_PACKS = [
  {
    id: 'small',
    credits: 1000,
    price: 9.99
  },
  {
    id: 'medium',
    credits: 2500,
    price: 14.99
  },
  {
    id: 'large',
    credits: 10000,
    price: 24.99
  }
];