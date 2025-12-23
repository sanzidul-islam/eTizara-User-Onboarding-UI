export interface BusinessInfo {
  contactEmail: string;
  logo: File | null;
  logoPreview: string;
  businessType: string;
  vatNumber: string;
  deliveryFee: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  recommended?: boolean;
}

export interface Theme {
  id: string;
  name: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface ModeType {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  modeTypeId: string;
  price: number;
  quantity: number;
  color?: string;
  image?: File | null;
  imagePreview?: string;
}

export type OnboardingStep = 
  | 'business-info'
  | 'package-selection'
  | 'theme-selection'
  | 'create-product-decision'
  | 'create-category'
  | 'create-mode'
  | 'create-product'
  | 'success';
