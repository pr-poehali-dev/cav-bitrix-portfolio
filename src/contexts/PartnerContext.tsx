import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PartnerContextType {
  isPartner: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  getDiscountedPrice: (originalPrice: number, isHosting?: boolean) => number;
  discountPercent: number;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

const PARTNER_PASSWORD = 'partner2024';
const DISCOUNT_PERCENT = 40;

export function PartnerProvider({ children }: { children: ReactNode }) {
  const [isPartner, setIsPartner] = useState<boolean>(() => {
    return localStorage.getItem('isPartner') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isPartner', isPartner.toString());
  }, [isPartner]);

  const login = (password: string): boolean => {
    if (password === PARTNER_PASSWORD) {
      setIsPartner(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsPartner(false);
    localStorage.removeItem('isPartner');
  };

  const getDiscountedPrice = (originalPrice: number, isHosting = false): number => {
    if (isHosting || !isPartner) {
      return originalPrice;
    }
    return Math.round(originalPrice * (1 - DISCOUNT_PERCENT / 100));
  };

  return (
    <PartnerContext.Provider 
      value={{ 
        isPartner, 
        login, 
        logout, 
        getDiscountedPrice,
        discountPercent: DISCOUNT_PERCENT 
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartner() {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
}
