import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Package, DollarSign, Hash, Palette, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepWrapper } from './StepWrapper';
import { CreateCategoryModal } from './CreateCategoryModal';
import { CreateModeModal } from './CreateModeModal';
import { Category, ModeType, Product } from '@/types/onboarding';

interface ProductFormStepProps {
  categories: Category[];
  modeTypes: ModeType[];
  onAddCategory: (category: Category) => void;
  onAddModeType: (mode: ModeType) => void;
  onSubmit: (product: Product) => void;
  onBack: () => void;
}

export const ProductFormStep = ({
  categories,
  modeTypes,
  onAddCategory,
  onAddModeType,
  onSubmit,
  onBack,
}: ProductFormStepProps) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    modeTypeId: '',
    price: '',
    quantity: '',
    color: '',
    image: null as File | null,
    imagePreview: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }
    if (!formData.modeTypeId) {
      newErrors.modeTypeId = 'Please select a mode type';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        id: Date.now().toString(),
        name: formData.name,
        categoryId: formData.categoryId,
        modeTypeId: formData.modeTypeId,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        color: formData.color || undefined,
        image: formData.image,
        imagePreview: formData.imagePreview,
      });
    }
  };

  return (
    <>
      <StepWrapper
        title="Add your first product"
        subtitle="Fill in the details to create your product listing"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-lg p-6 md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Product Image */}
            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-2 block">
                Product Image
              </Label>
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 rounded-lg border-2 border-dashed border-border bg-secondary/50 flex items-center justify-center overflow-hidden">
                  {formData.imagePreview ? (
                    <img
                      src={formData.imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="product-image"
                  />
                  <label htmlFor="product-image">
                    <Button variant="outline" size="sm" asChild>
                      <span className="cursor-pointer">Upload Image</span>
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Product Name */}
            <div className="md:col-span-2">
              <Label htmlFor="product-name" className="text-sm font-medium mb-2 block">
                Product Name *
              </Label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="product-name"
                  placeholder="e.g., Wireless Bluetooth Headphones"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Category *
              </Label>
              <div className="flex gap-2">
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowCategoryModal(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {errors.categoryId && (
                <p className="text-xs text-destructive mt-1">{errors.categoryId}</p>
              )}
            </div>

            {/* Mode Type */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Mode Type *
              </Label>
              <div className="flex gap-2">
                <Select
                  value={formData.modeTypeId}
                  onValueChange={(value) => setFormData({ ...formData, modeTypeId: value })}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {modeTypes.map((mode) => (
                      <SelectItem key={mode.id} value={mode.id}>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: mode.color }}
                          />
                          {mode.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowModeModal(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {errors.modeTypeId && (
                <p className="text-xs text-destructive mt-1">{errors.modeTypeId}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="text-sm font-medium mb-2 block">
                Price *
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity" className="text-sm font-medium mb-2 block">
                Quantity *
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="pl-10"
                />
              </div>
              {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
            </div>

            {/* Color (Optional) */}
            <div>
              <Label htmlFor="color" className="text-sm font-medium mb-2 block">
                Color (Optional)
              </Label>
              <div className="relative">
                <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="color"
                  placeholder="e.g., Black, Red, Blue"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={onBack}>
              Back
            </Button>
            <Button size="lg" onClick={handleSubmit}>
              Create Product
            </Button>
          </div>
        </motion.div>
      </StepWrapper>

      <CreateCategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSave={onAddCategory}
      />

      <CreateModeModal
        isOpen={showModeModal}
        onClose={() => setShowModeModal(false)}
        onSave={onAddModeType}
      />
    </>
  );
};
