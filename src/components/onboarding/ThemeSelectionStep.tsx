import { motion } from 'framer-motion';
import { Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepWrapper } from './StepWrapper';
import { Theme } from '@/types/onboarding';
import { cn } from '@/lib/utils';

interface ThemeSelectionStepProps {
  themes: Theme[];
  selectedTheme: string;
  onSelect: (id: string) => void;
  onPreview: (theme: Theme) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ThemeSelectionStep = ({
  themes,
  selectedTheme,
  onSelect,
  onPreview,
  onNext,
  onBack,
}: ThemeSelectionStepProps) => {
  return (
    <StepWrapper
      title="Select your theme"
      subtitle="Choose a design that represents your brand"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className={cn(
              "relative group bg-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
              selectedTheme === theme.id
                ? "ring-2 ring-primary shadow-lg"
                : "shadow-md hover:shadow-lg"
            )}
            onClick={() => onSelect(theme.id)}
          >
            {/* Theme Preview */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={theme.preview}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(theme);
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
              </div>

              {/* Selected indicator */}
              {selectedTheme === theme.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>

            {/* Theme Info */}
            <div className="p-4">
              <h3 className="font-medium text-foreground">{theme.name}</h3>
              <div className="flex gap-1.5 mt-2">
                <div
                  className="w-5 h-5 rounded-full border border-border"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                  className="w-5 h-5 rounded-full border border-border"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div
                  className="w-5 h-5 rounded-full border border-border"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
            </div>
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
        <Button size="lg" onClick={onNext} disabled={!selectedTheme}>
          Continue
        </Button>
      </motion.div>
    </StepWrapper>
  );
};
