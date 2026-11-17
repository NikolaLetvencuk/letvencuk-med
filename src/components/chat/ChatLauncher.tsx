import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ChatAvatar } from './ChatAvatar';
import { BOT_NAME } from './chatConfig';
import { cn } from '../../utils/cn';

interface ChatLauncherProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
}

/**
 * Plutajuće okruglo dugme u donjem desnom uglu koje otvara/zatvara chat.
 * Zatvoreno: Lolin logo na beloj podlozi. Otvoreno: X na med-podlozi.
 */
export const ChatLauncher = ({ open, onToggle, className }: ChatLauncherProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={open ? 'Zatvori chat' : `Otvori chat — ${BOT_NAME}`}
    aria-expanded={open}
    aria-controls="lola-chat"
    className={cn(
      'flex h-16 w-16 items-center justify-center rounded-full shadow-[var(--shadow-lift)]',
      'transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:scale-105 active:scale-95',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep',
      open ? 'bg-honey-deep text-white hover:bg-honey' : 'bg-raise ring-2 ring-honey/60',
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
        {open ? (
          <X className="h-6 w-6" strokeWidth={2} />
        ) : (
          <ChatAvatar className="h-16 w-16 bg-transparent ring-0" />
        )}
      </motion.span>
    </AnimatePresence>
  </button>
);
