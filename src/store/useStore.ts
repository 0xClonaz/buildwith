import { create } from 'zustand';
import type { User } from '../types';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

interface Store {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  fetchUserData: (uid: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  
  fetchUserData: async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        set({ user: { ...docSnap.data() as User, id: uid } });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to fetch user data');
    }
  },

  updateUserProfile: async (data) => {
    const { user } = get();
    if (!user) return;

    try {
      const docRef = doc(db, 'users', user.id);
      await setDoc(docRef, { ...user, ...data }, { merge: true });
      set({ user: { ...user, ...data } });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  }
}));