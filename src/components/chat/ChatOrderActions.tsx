import { Instagram, Phone } from 'lucide-react';
import { track } from '@vercel/analytics';
import { contact } from '../../data/contact';

const pill =
  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-2xs font-semibold transition-colors duration-200';

/** Dugmad za poručivanje ispod bot poruke koja sadrži [ORDER] marker. */
export const ChatOrderActions = () => (
  <div className="mt-3 flex flex-wrap gap-2">
    <a
      href={contact.phones.mihajlo.href}
      onClick={() => track('chat_order_click', { channel: 'phone' })}
      className={`${pill} bg-honey-deep text-white hover:bg-honey`}
    >
      <Phone className="h-3.5 w-3.5" strokeWidth={2} />
      Pozovi
    </a>
    <a
      href={contact.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('chat_order_click', { channel: 'instagram' })}
      className={`${pill} bg-raise text-honey-deep ring-1 ring-honey/40 hover:bg-honey-tint`}
    >
      <Instagram className="h-3.5 w-3.5" strokeWidth={2} />
      Instagram
    </a>
  </div>
);
