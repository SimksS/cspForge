'use client';

import { cn } from '@/lib/utils'; // ou use clsx
import { Sparkles } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  type?: 'info' | 'danger' | 'success' | 'highlight';
};

export default function Callout({ children, type = 'highlight' }: Props) {
  const baseClasses = 'rounded-md p-4 border-l-4 my-6';
  const styles = {
    highlight: 'bg-yellow-50 border-yellow-400 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-600 dark:text-yellow-100',
    info: 'bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-950 dark:border-blue-600 dark:text-blue-100',
    danger: 'bg-red-50 border-red-400 text-red-800 dark:bg-red-950 dark:border-red-600 dark:text-red-100',
    success: 'bg-green-50 border-green-400 text-green-800 dark:bg-green-950 dark:border-green-600 dark:text-green-100',
  };

  return (
    <div className={cn(baseClasses, styles[type])}>
      <div className="flex items-start gap-2">
        <Sparkles className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>{children}</div>
              
      </div>
    </div>
  );
}
