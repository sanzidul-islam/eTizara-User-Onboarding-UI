import { motion } from 'framer-motion';
import { Package, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepWrapper } from './StepWrapper';

interface ProductDecisionStepProps {
  onCreateProduct: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export const ProductDecisionStep = ({
  onCreateProduct,
  onSkip,
  onBack,
}: ProductDecisionStepProps) => {
  return (
    <StepWrapper
      title="Ready to add your first product?"
      subtitle="You can add products now or do it later from your dashboard"
    >
      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onCreateProduct}
          className="bg-card rounded-xl p-8 cursor-pointer shadow-md hover:shadow-lg hover:ring-2 hover:ring-primary transition-all duration-300 text-center group"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Yes, let's add a product
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first product listing and start selling right away
          </p>
          <Button className="w-full group-hover:shadow-glow">
            Add Product
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onSkip}
          className="bg-card rounded-xl p-8 cursor-pointer shadow-md hover:shadow-lg hover:ring-2 hover:ring-border transition-all duration-300 text-center group"
        >
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <LayoutDashboard className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Skip for now
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Go to your dashboard and explore. You can add products anytime
          </p>
          <Button variant="outline" className="w-full">
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-start"
      >
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </motion.div>
    </StepWrapper>
  );
};
