import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  redirectIfUnauthenticated: (path: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  redirectIfUnauthenticated: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const redirectIfUnauthenticated = (path: string) => {
    if (!loading && !user) {
      router.push(path);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, redirectIfUnauthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);