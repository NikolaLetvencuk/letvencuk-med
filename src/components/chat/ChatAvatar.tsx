import { BeeIcon } from '../icons/BeeIcon';
import { cn } from '../../utils/cn';

/**
 * Slika chatbota (zaglavlje panela i dugme za otvaranje).
 * Privremeno ikonica pčele — kad stigne logo, ovde se zameni sa <img src="images/..." alt="" />
 * i promena važi svuda.
 */
export const ChatAvatar = ({ className }: { className?: string }) => (
  <BeeIcon className={cn('h-5 w-5', className)} />
);
