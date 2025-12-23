import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StepWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const StepWrapper = ({ children, title, subtitle }: StepWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-foreground"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
    </motion.div>
  );
};
