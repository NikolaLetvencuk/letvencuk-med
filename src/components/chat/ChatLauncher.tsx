import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BeeIcon } from '../icons/BeeIcon';
import { cn } from '../../utils/cn';

interface ChatLauncherProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
}

/** Plutajuće okruglo dugme u donjem desnom uglu koje otvara/zatvara chat. */
export const ChatLauncher = ({ open, onToggle, className }: ChatLauncherProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={open ? 'Zatvori chat' : 'Otvori chat sa Pčelicom'}
    aria-expanded={open}
    aria-controls="pcelica-chat"
    className={cn(
      'flex h-14 w-14 items-center justify-center rounded-full bg-honey-deep text-white shadow-[var(--shadow-lift)]',
      'transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:bg-honey active:scale-95',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep',
      className,
    )}
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={open ? 'close' : 'open'}
        initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
        transition={{ duration: 0.18 }}
        className="flex"
      >
        {open ? <X className="h-6 w-6" strokeWidth={2} /> : <BeeIcon className="h-6 w-6" />}
      </motion.span>
    </AnimatePresence>
  </button>
);
