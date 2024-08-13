import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/router';

const jwtDecode = require('jwt-decode');

const withAuth = (WrappedComponent: ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        try {
          jwtDecode(token);
        } catch (error) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
