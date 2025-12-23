import { useState } from 'react';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { Dashboard } from '@/components/dashboard/Dashboard';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard />;
  }

  return <OnboardingWizard onComplete={() => setShowDashboard(true)} />;
};

export default Index;
