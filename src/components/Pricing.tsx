import { Check } from 'lucide-react';
import { PRICING_TIERS } from '../config/plans';
import { createCheckoutSession } from '../lib/stripe';
import { useStore } from '../store/useStore';
import { toast } from 'react-hot-toast';

export function Pricing() {
  const user = useStore((state) => state.user);

  const handleSubscribe = async (tier: typeof PRICING_TIERS[0]) => {
    try {
      if (!user) {
        toast.error('Please sign in first');
        return;
      }

      await createCheckoutSession(
        tier.stripePriceId!,
        user.stripeCustomerId
      );
    } catch (error: any) {
      toast.error('Failed to start checkout');
    }
  };

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-400">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose your plan
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="rounded-3xl p-8 bg-gray-800 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
            >
              <h3 className="text-lg font-semibold leading-8 text-white">
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight text-white">
                  ${tier.price}
                </span>
                {!tier.isLifetime && (
                  <span className="text-sm font-semibold leading-6 text-gray-400">/month</span>
                )}
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(tier)}
                className="mt-8 w-full rounded-md bg-purple-600 px-3.5 py-2 text-center text-sm font-semibold text-white hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors disabled:opacity-50"
                disabled={!user}
              >
                {user ? 'Get started' : 'Sign in to subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}