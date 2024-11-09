import { useEffect } from 'react';
import { Auth } from './components/Auth';
import { Editor } from './components/Editor';
import { Pricing } from './components/Pricing';
import { Credits } from './components/Credits';
import { Profile } from './components/Profile';
import { useStore } from './store/useStore';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';

export function App() {
  const { user, setUser, fetchUserData, setLoading } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUserData(firebaseUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-right" />
      {user ? (
        <Editor />
      ) : (
        <div>
          <header className="bg-gray-800 border-b border-gray-700">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                AI Web Builder
              </h1>
            </div>
          </header>
          <main>
            <Auth />
            <Pricing />
            <Credits />
          </main>
        </div>
      )}
    </div>
  );
}