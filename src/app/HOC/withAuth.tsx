import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const { user, loading, redirectIfUnauthenticated } = useAuth();

    useEffect(() => {
      redirectIfUnauthenticated('/signin');
    }, [user, loading, redirectIfUnauthenticated]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}