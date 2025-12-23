import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, Category, ModeType } from '@/types/onboarding';

interface SuccessStepProps {
  product: Product;
  categories: Category[];
  modeTypes: ModeType[];
  onAddAnother: () => void;
  onGoToDashboard: () => void;
}

export const SuccessStep = ({
  product,
  categories,
  modeTypes,
  onAddAnother,
  onGoToDashboard,
}: SuccessStepProps) => {
  const category = categories.find((c) => c.id === product.categoryId);
  const modeType = modeTypes.find((m) => m.id === product.modeTypeId);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto text-center"
    >
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <CheckCircle2 className="w-12 h-12 text-success" />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-foreground mb-2"
      >
        Product Created Successfully!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground mb-8"
      >
        Your product is now live and ready for customers
      </motion.p>

      {/* Product Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Product Image */}
          <div className="w-full sm:w-32 h-32 bg-secondary rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {product.imagePreview ? (
              <img
                src={product.imagePreview}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-12 h-12 text-muted-foreground" />
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 text-left">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category?.name || 'Uncategorized'}
                </p>
              </div>
              {modeType && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1"
                  style={{ backgroundColor: modeType.color }}
                >
                  <Sparkles className="w-3 h-3" />
                  {modeType.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-lg font-semibold text-foreground">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Quantity</p>
                <p className="text-lg font-semibold text-foreground">
                  {product.quantity}
                </p>
              </div>
              {product.color && (
                <div>
                  <p className="text-xs text-muted-foreground">Color</p>
                  <p className="text-lg font-semibold text-foreground">
                    {product.color}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button variant="outline" size="lg" onClick={onAddAnother}>
          Add Another Product
        </Button>
        <Button size="lg" onClick={onGoToDashboard}>
          Go to Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
};
