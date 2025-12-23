import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Flame, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeType } from '@/types/onboarding';
import { cn } from '@/lib/utils';

interface CreateModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (mode: ModeType) => void;
}

const presetModes = [
  { name: 'Hot Sale', color: '#ef4444', icon: 'flame' },
  { name: 'New Arrival', color: '#22c55e', icon: 'sparkles' },
  { name: 'Featured', color: '#f59e0b', icon: 'star' },
  { name: 'Flash Deal', color: '#8b5cf6', icon: 'zap' },
];

const iconComponents: Record<string, React.ReactNode> = {
  flame: <Flame className="w-4 h-4" />,
  sparkles: <Sparkles className="w-4 h-4" />,
  star: <Star className="w-4 h-4" />,
  zap: <Zap className="w-4 h-4" />,
};

export const CreateModeModal = ({
  isOpen,
  onClose,
  onSave,
}: CreateModeModalProps) => {
  const [name, setName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handlePresetSelect = (index: number) => {
    setSelectedPreset(index);
    setName(presetModes[index].name);
    setError('');
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError('Mode name is required');
      return;
    }

    const preset = selectedPreset !== null ? presetModes[selectedPreset] : null;

    onSave({
      id: Date.now().toString(),
      name: name.trim(),
      color: preset?.color || '#6366f1',
      icon: preset?.icon || 'sparkles',
    });

    setName('');
    setSelectedPreset(null);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card rounded-xl shadow-xl z-50 p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Create Mode Type
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Preset Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                Quick Select
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {presetModes.map((preset, index) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetSelect(index)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border transition-all duration-200",
                      selectedPreset === index
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: preset.color }}
                    >
                      {iconComponents[preset.icon]}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Name */}
            <div>
              <Label htmlFor="mode-name" className="text-sm font-medium mb-2 block">
                Mode Name *
              </Label>
              <Input
                id="mode-name"
                placeholder="Enter mode name..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
              />
              {error && <p className="text-xs text-destructive mt-1">{error}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1">
                Create Mode
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
