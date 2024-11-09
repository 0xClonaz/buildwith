import { Zap } from 'lucide-react';
import { CREDIT_PACKS } from '../config/plans';
import { createCheckoutSession } from '../lib/stripe';
import { useStore } from '../store/useStore';
import { toast } from 'react-hot-toast';

export function Credits() {
  const user = useStore((state) => state.user);

  const handlePurchase = async (pack: typeof CREDIT_PACKS[0]) => {
    try {
      if (!user) {
        toast.error('Please sign in first');
        return;
      }

      await createCheckoutSession(
        pack.stripePriceId!,
        user.stripeCustomerId
      );
    } catch (error: any) {
      toast.error('Failed to start checkout');
    }
  };

  return (
    <div className="bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-400">Credits</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Power up your development
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className="rounded-2xl p-8 bg-gray-900 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex items-center gap-x-4">
                <Zap className="h-8 w-8 text-purple-400" />
                <h3 className="text-lg font-semibold leading-8 text-white">
                  {pack.credits.toLocaleString()} Credits
                </h3>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  ${pack.price}
                </span>
              </p>
              <button
                onClick={() => handlePurchase(pack)}
                className="mt-8 w-full rounded-md bg-purple-600 px-3.5 py-2 text-center text-sm font-semibold text-white hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors disabled:opacity-50"
                disabled={!user}
              >
                {user ? 'Buy now' : 'Sign in to purchase'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}