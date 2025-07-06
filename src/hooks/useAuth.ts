import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if user was previously authenticated (session storage)
    return sessionStorage.getItem('tracebound-auth') === 'true';
  });

  const authenticate = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('tracebound-auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tracebound-auth');
  };

  return {
    isAuthenticated,
    authenticate,
    logout
  };
}