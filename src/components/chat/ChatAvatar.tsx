import { cn } from '../../utils/cn';
import { BOT_NAME } from './chatConfig';

/**
 * Slika chatbota (zaglavlje panela i dugme za otvaranje): Lolin logo u krugu.
 * Izvor: public/new_images/lola_chatbot_logo.png → isečen i smanjen u public/images/chat/.
 * Veličinu kruga određuje `className` (npr. "h-11 w-11").
 */
export const ChatAvatar = ({ className, decorative = true }: { className?: string; decorative?: boolean }) => (
  <span
    className={cn(
      'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-raise ring-1 ring-honey/30',
      className,
    )}
  >
    <img
      src="images/chat/lola-96.webp"
      srcSet="images/chat/lola-96.webp 96w, images/chat/lola-192.webp 192w"
      sizes="56px"
      width={96}
      height={96}
      alt={decorative ? '' : BOT_NAME}
      draggable={false}
      className="h-[88%] w-[88%] object-contain"
    />
  </span>
);
