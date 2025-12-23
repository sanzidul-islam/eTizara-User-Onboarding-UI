import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Mail, Building2, Receipt, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepWrapper } from './StepWrapper';
import { BusinessInfo } from '@/types/onboarding';

interface BusinessInfoStepProps {
  data: BusinessInfo;
  onUpdate: (data: BusinessInfo) => void;
  onNext: () => void;
}

const businessTypes = [
  { value: 'retail', label: 'Retail Store' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'services', label: 'Services' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'fashion', label: 'Fashion & Apparel' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'other', label: 'Other' },
];

export const BusinessInfoStep = ({ data, onUpdate, onNext }: BusinessInfoStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({
          ...data,
          logo: file,
          logoPreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.contactEmail) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }
    
    if (!data.businessType) {
      newErrors.businessType = 'Please select a business type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <StepWrapper
      title="Tell us about your business"
      subtitle="We'll use this information to set up your store"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl shadow-lg p-6 md:p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Logo Upload */}
          <div className="md:col-span-2">
            <Label className="text-sm font-medium text-foreground mb-2 block">
              Business Logo
            </Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border bg-secondary/50 flex items-center justify-center overflow-hidden">
                {data.logoPreview ? (
                  <img
                    src={data.logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span className="cursor-pointer">Upload Logo</span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
              Contact Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@business.com"
                value={data.contactEmail}
                onChange={(e) => onUpdate({ ...data, contactEmail: e.target.value })}
                className="pl-10"
              />
            </div>
            {errors.contactEmail && (
              <p className="text-xs text-destructive mt-1">{errors.contactEmail}</p>
            )}
          </div>

          {/* Business Type */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              Business Type *
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <Select
                value={data.businessType}
                onValueChange={(value) => onUpdate({ ...data, businessType: value })}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.businessType && (
              <p className="text-xs text-destructive mt-1">{errors.businessType}</p>
            )}
          </div>

          {/* VAT Number */}
          <div>
            <Label htmlFor="vat" className="text-sm font-medium text-foreground mb-2 block">
              VAT Number
            </Label>
            <div className="relative">
              <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="vat"
                type="text"
                placeholder="VAT123456789"
                value={data.vatNumber}
                onChange={(e) => onUpdate({ ...data, vatNumber: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          {/* Delivery Fee */}
          <div>
            <Label htmlFor="delivery" className="text-sm font-medium text-foreground mb-2 block">
              Default Delivery Fee
            </Label>
            <div className="relative">
              <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="delivery"
                type="number"
                placeholder="0.00"
                value={data.deliveryFee}
                onChange={(e) => onUpdate({ ...data, deliveryFee: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" onClick={handleSubmit}>
            Continue
          </Button>
        </div>
      </motion.div>
    </StepWrapper>
  );
};
