import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline'; size?: 'sm' | 'default' };
export function Button({ className, variant = 'default', size = 'default', type = 'button', ...props }: Props) {
  return <button type={type} className={cn('inline-flex items-center justify-center rounded-md border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500', size === 'sm' ? 'h-9 px-3 text-sm' : 'h-10 px-4', variant === 'outline' ? 'border-slate-700 bg-transparent' : 'border-cyan-500 bg-cyan-600', className)} {...props} />;
}
