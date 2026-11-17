import { motion, useReducedMotion } from 'framer-motion';
import { BOT_NAME } from './chatConfig';

export const TypingIndicator = () => {
  const reduce = useReducedMotion();
  return (
    <div className="flex justify-start" aria-label={`${BOT_NAME} piše…`} role="status">
      <div className="flex items-center gap-1.5 rounded-[var(--radius-inner)] rounded-bl-md bg-sunken px-4 py-3.5">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="block h-2 w-2 rounded-full bg-honey"
            animate={reduce ? { opacity: [0.4, 1, 0.4] } : { y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
};
