import { Fragment, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { ChatRole } from './chatApi';

// Srpski mobilni/fiksni brojevi u formatu "060 0726 253", "060/726-2530", "+381 60 ..." itd.
const PHONE_RE = /(\+381[\s/-]?\d{2}|0\d{2})[\s/-]?\d{3,4}[\s/-]?\d{3,4}/g;

const toTelHref = (raw: string) => {
  const digits = raw.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('+') ? digits : `+381${digits.slice(1)}`}`;
};

/** Tekst kao React čvorovi: telefoni postaju tel: linkovi. Bez dangerouslySetInnerHTML. */
const linkifyPhones = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(PHONE_RE)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      <a key={start} href={toTelHref(match[0])} className="font-semibold text-honey-deep underline underline-offset-2">
        {match[0]}
      </a>,
    );
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

// Model ponekad vrati **podebljano** uprkos uputstvu — samo uklanjamo zvezdice.
const stripMarkdown = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '$1');

interface ChatMessageProps {
  role: ChatRole;
  text: string;
  /** Poruka o grešci — prikazuje se kao bot poruka u crvenkastom tonu. */
  isError?: boolean;
  children?: ReactNode;
}

export const ChatMessage = ({ role, text, isError, children }: ChatMessageProps) => {
  const isUser = role === 'user';
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-wrap break-words px-4 py-2.5 text-xs leading-relaxed',
          isUser
            ? 'rounded-[var(--radius-inner)] rounded-br-md bg-honey-deep text-white'
            : 'rounded-[var(--radius-inner)] rounded-bl-md bg-sunken text-ink',
          isError && 'border border-red-200 bg-red-50 text-red-800',
        )}
      >
        {isUser
          ? text
          : stripMarkdown(text)
              .split('\n')
              .map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && '\n'}
                  {linkifyPhones(line)}
                </Fragment>
              ))}
        {children}
      </div>
    </div>
  );
};
