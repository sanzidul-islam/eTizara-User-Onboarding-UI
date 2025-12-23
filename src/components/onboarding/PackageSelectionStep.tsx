import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
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

export const PackageSelectionStep = ({
  packages,
  selectedPackage,
  onSelect,
  onNext,
  onBack,
}: PackageSelectionStepProps) => {
  return (
    <StepWrapper
      title="Choose your plan"
      subtitle="Select the package that best fits your business needs"
    >
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => onSelect(pkg.id)}
            className={cn(
              "relative bg-card rounded-xl p-6 cursor-pointer transition-all duration-300",
              selectedPackage === pkg.id
                ? "ring-2 ring-primary shadow-lg shadow-glow"
                : "shadow-md hover:shadow-lg",
              pkg.recommended && "ring-2 ring-accent"
            )}
          >
            {pkg.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Recommended
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">${pkg.price}</span>
                <span className="text-muted-foreground">/{pkg.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={selectedPackage === pkg.id ? "default" : "outline"}
              className="w-full"
            >
              {selectedPackage === pkg.id ? "Selected" : "Select Plan"}
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
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
