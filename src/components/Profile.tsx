import { useState } from 'react';
import { useStore } from '../store/useStore';
import { auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { Loader2, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createCheckoutSession } from '../lib/stripe';

export function Profile() {
  const { user, updateUserProfile } = useStore();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
      }
      await updateUserProfile({ displayName });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      if (!user?.stripeCustomerId) {
        toast.error('No active subscription found');
        return;
      }

      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: user.stripeCustomerId,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast.error('Failed to open customer portal');
    }
  };

  if (!user) return null;

  return (
    <div className="bg-gray-900 py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Account Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed"
                  />
                </div>
                
                <form onSubmit={handleSubmit}>
                  <label className="block text-sm font-medium text-gray-300">
                    Display Name
                  </label>
                  <div className="mt-1 flex gap-4">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="flex-1 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your display name"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Subscription</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan</p>
                    <p className="text-sm text-gray-400">
                      {user.credits} credits remaining
                    </p>
                  </div>
                  <button 
                    onClick={handleManageSubscription}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => auth.signOut()}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}