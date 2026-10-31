import { cn } from '@/lib/utils';
type Props = { checked: boolean; onCheckedChange: (checked: boolean) => void; disabled?: boolean; className?: string; };
export function Switch({ checked, onCheckedChange, disabled = false, className }: Props) {
  return (
    <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => onCheckedChange(!checked)}
      className={cn('relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-50', checked ? 'bg-emerald-500' : 'bg-slate-700', className)}>
      <span className={cn('pointer-events-none block h-5 w-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-5' : 'translate-x-0')} />
    </button>
  );
}
