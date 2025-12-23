import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepWrapper } from './StepWrapper';
import { Package } from '@/types/onboarding';
import { cn } from '@/lib/utils';

interface PackageSelectionStepProps {
  packages: Package[];
  selectedPackage: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

// Define all possible features across packages
const allFeatures = [
  'Up to 50 products',
  'Up to 200 products',
  'Unlimited products',
  'Basic analytics',
  'Advanced analytics',
  'Custom analytics & reports',
  'Email support',
  'Priority support',
  '24/7 dedicated support',
  'Custom domain',
  'API access',
  'White-label solution',
  'Multi-store management',
];

// Map features to packages
const packageFeatures: Record<string, string[]> = {
  starter: [
    'Up to 50 products',
    'Basic analytics',
    'Email support',
  ],
  professional: [
    'Up to 200 products',
    'Advanced analytics',
    'Priority support',
    'Custom domain',
    'API access',
  ],
  enterprise: [
    'Unlimited products',
    'Custom analytics & reports',
    '24/7 dedicated support',
    'Custom domain',
    'API access',
    'White-label solution',
    'Multi-store management',
  ],
};

export const PackageSelectionStep = ({
  packages,
  selectedPackage,
  onSelect,
  onNext,
  onBack,
}: PackageSelectionStepProps) => {
  const hasFeature = (packageId: string, feature: string) => {
    const features = packageFeatures[packageId] || [];
    return features.includes(feature);
  };

  return (
    <StepWrapper
      title="Choose your plan"
      subtitle="Compare packages and select the one that best fits your business needs"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto mb-8"
      >
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr>
              <th className="text-left p-4 bg-muted/50 rounded-tl-xl border-b border-border">
                <span className="text-sm font-medium text-muted-foreground">Features</span>
              </th>
              {packages.map((pkg, index) => (
                <th
                  key={pkg.id}
                  className={cn(
                    "p-4 text-center border-b border-border relative cursor-pointer transition-all duration-300",
                    index === packages.length - 1 && "rounded-tr-xl",
                    selectedPackage === pkg.id
                      ? "bg-primary/10"
                      : "bg-muted/50 hover:bg-muted"
                  )}
                  onClick={() => onSelect(pkg.id)}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                        <Sparkles className="w-3 h-3" />
                        Recommended
                      </span>
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                    <div>
                      <span className="text-2xl font-bold text-foreground">${pkg.price}</span>
                      <span className="text-muted-foreground text-sm">/{pkg.period}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {allFeatures.map((feature, rowIndex) => (
              <tr key={feature}>
                <td
                  className={cn(
                    "p-4 text-sm text-foreground border-b border-border",
                    rowIndex === allFeatures.length - 1 && "rounded-bl-xl"
                  )}
                >
                  {feature}
                </td>
                {packages.map((pkg, colIndex) => {
                  const included = hasFeature(pkg.id, feature);
                  return (
                    <td
                      key={`${pkg.id}-${feature}`}
                      className={cn(
                        "p-4 text-center border-b border-border cursor-pointer transition-all duration-300",
                        rowIndex === allFeatures.length - 1 && colIndex === packages.length - 1 && "rounded-br-xl",
                        selectedPackage === pkg.id
                          ? "bg-primary/5"
                          : "hover:bg-muted/30"
                      )}
                      onClick={() => onSelect(pkg.id)}
                    >
                      {included ? (
                        <Check className="w-5 h-5 text-primary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Selection Row */}
            <tr>
              <td className="p-4"></td>
              {packages.map((pkg) => (
                <td key={`select-${pkg.id}`} className="p-4 text-center">
                  <Button
                    variant={selectedPackage === pkg.id ? "default" : "outline"}
                    className="w-full max-w-[160px]"
                    onClick={() => onSelect(pkg.id)}
                  >
                    {selectedPackage === pkg.id ? "Selected" : "Select Plan"}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onNext} disabled={!selectedPackage}>
          Continue
        </Button>
      </motion.div>
    </StepWrapper>
  );
};
