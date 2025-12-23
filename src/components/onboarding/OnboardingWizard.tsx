import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';
import { BusinessInfoStep } from './BusinessInfoStep';
import { PackageSelectionStep } from './PackageSelectionStep';
import { ThemeSelectionStep } from './ThemeSelectionStep';
import { ProductDecisionStep } from './ProductDecisionStep';
import { ProductFormStep } from './ProductFormStep';
import { SuccessStep } from './SuccessStep';
import {
  BusinessInfo,
  Package,
  Theme,
  Category,
  ModeType,
  Product,
  OnboardingStep,
} from '@/types/onboarding';

import themeModern from '@/assets/theme-modern.jpg';
import themeElegant from '@/assets/theme-elegant.jpg';
import themeVibrant from '@/assets/theme-vibrant.jpg';
import themeBoutique from '@/assets/theme-boutique.jpg';
import themeRetro from '@/assets/theme-retro.jpg';
import themeNatural from '@/assets/theme-natural.jpg';

const STEPS = [
  { id: 'business-info', label: 'Business Info' },
  { id: 'package-selection', label: 'Choose Plan' },
  { id: 'theme-selection', label: 'Select Theme' },
  { id: 'create-product-decision', label: 'Add Products' },
  { id: 'success', label: 'Complete' },
];

const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    period: 'month',
    features: [
      'Up to 50 products',
      'Basic analytics',
      'Email support',
      '2% transaction fee',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 49,
    period: 'month',
    recommended: true,
    features: [
      'Up to 500 products',
      'Advanced analytics',
      'Priority support',
      '1% transaction fee',
      'Custom domain',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    period: 'month',
    features: [
      'Unlimited products',
      'Full analytics suite',
      '24/7 dedicated support',
      '0.5% transaction fee',
      'Custom domain',
      'API access',
    ],
  },
];

const THEMES: Theme[] = [
  {
    id: 'modern',
    name: 'Modern Clean',
    preview: themeModern,
    colors: { primary: '#14b8a6', secondary: '#f1f5f9', accent: '#f59e0b' },
  },
  {
    id: 'elegant',
    name: 'Dark Elegant',
    preview: themeElegant,
    colors: { primary: '#1f2937', secondary: '#f3f4f6', accent: '#d4af37' },
  },
  {
    id: 'vibrant',
    name: 'Vibrant Pop',
    preview: themeVibrant,
    colors: { primary: '#ec4899', secondary: '#fef3c7', accent: '#8b5cf6' },
  },
  {
    id: 'boutique',
    name: 'Minimal Boutique',
    preview: themeBoutique,
    colors: { primary: '#374151', secondary: '#ffffff', accent: '#d4a574' },
  },
  {
    id: 'retro',
    name: 'Retro Warm',
    preview: themeRetro,
    colors: { primary: '#ea580c', secondary: '#fef3e2', accent: '#78350f' },
  },
  {
    id: 'natural',
    name: 'Natural Fresh',
    preview: themeNatural,
    colors: { primary: '#16a34a', secondary: '#f0fdf4', accent: '#65a30d' },
  },
];

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard = ({ onComplete }: OnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('business-info');
  const [stepIndex, setStepIndex] = useState(0);

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    contactEmail: '',
    logo: null,
    logoPreview: '',
    businessType: '',
    vatNumber: '',
    deliveryFee: '',
  });

  const [selectedPackage, setSelectedPackage] = useState('growth');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [modeTypes, setModeTypes] = useState<ModeType[]>([]);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);

  const goToStep = (step: OnboardingStep, index: number) => {
    setCurrentStep(step);
    setStepIndex(index);
  };

  const handleThemePreview = (theme: Theme) => {
    window.open(`#preview-${theme.id}`, '_blank');
  };

  const handleProductCreated = (product: Product) => {
    setCreatedProduct(product);
    goToStep('success', 4);
  };

  const handleAddAnotherProduct = () => {
    setCreatedProduct(null);
    goToStep('create-product', 3);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'business-info':
        return (
          <BusinessInfoStep
            data={businessInfo}
            onUpdate={setBusinessInfo}
            onNext={() => goToStep('package-selection', 1)}
          />
        );

      case 'package-selection':
        return (
          <PackageSelectionStep
            packages={PACKAGES}
            selectedPackage={selectedPackage}
            onSelect={setSelectedPackage}
            onNext={() => goToStep('theme-selection', 2)}
            onBack={() => goToStep('business-info', 0)}
          />
        );

      case 'theme-selection':
        return (
          <ThemeSelectionStep
            themes={THEMES}
            selectedTheme={selectedTheme}
            onSelect={setSelectedTheme}
            onPreview={handleThemePreview}
            onNext={() => goToStep('create-product-decision', 3)}
            onBack={() => goToStep('package-selection', 1)}
          />
        );

      case 'create-product-decision':
        return (
          <ProductDecisionStep
            onCreateProduct={() => goToStep('create-product', 3)}
            onSkip={onComplete}
            onBack={() => goToStep('theme-selection', 2)}
          />
        );

      case 'create-category':
      case 'create-mode':
      case 'create-product':
        return (
          <ProductFormStep
            categories={categories}
            modeTypes={modeTypes}
            onAddCategory={(cat) => setCategories([...categories, cat])}
            onAddModeType={(mode) => setModeTypes([...modeTypes, mode])}
            onSubmit={handleProductCreated}
            onBack={() => goToStep('create-product-decision', 3)}
          />
        );

      case 'success':
        return createdProduct ? (
          <SuccessStep
            product={createdProduct}
            categories={categories}
            modeTypes={modeTypes}
            onAddAnother={handleAddAnotherProduct}
            onGoToDashboard={onComplete}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg" />
            <span className="text-xl font-bold text-foreground">StoreCraft</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Setup your store
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border py-6">
        <ProgressBar steps={STEPS} currentStep={stepIndex} />
      </div>

      {/* Main Content */}
      <main className="py-8 px-4 md:px-6">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>
    </div>
  );
};
