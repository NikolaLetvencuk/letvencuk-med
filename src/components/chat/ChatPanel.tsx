import { forwardRef, useEffect, useRef, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RotateCcw, Send, X } from 'lucide-react';
import { BeeIcon } from '../icons/BeeIcon';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { MAX_INPUT_LENGTH, type ChatMessage as Message } from './chatApi';

export const SUGGESTIONS = ['Koji med preporučujete?', 'Kako da naručim?', 'Cene i pakovanja'];

interface ChatPanelProps {
  greeting: string;
  messages: Message[];
  loading: boolean;
  error: string | null;
  input: string;
  onInputChange: (value: string) => void;
  onSend: (text: string) => void;
  onRetry: () => void;
  onClose: () => void;
}

export const ChatPanel = forwardRef<HTMLTextAreaElement, ChatPanelProps>(
  ({ greeting, messages, loading, error, input, onInputChange, onSend, onRetry, onClose }, inputRef) => {
    const reduce = useReducedMotion();
    const listRef = useRef<HTMLDivElement>(null);

    // Automatski skrol na najnoviju poruku (samo unutar liste, nikad cela stranica).
    useEffect(() => {
      const el = listRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
    }, [messages, loading, error, reduce]);

    const canSend = input.trim().length > 0 && !loading;

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault();
        if (canSend) onSend(input);
      }
    };

    return (
      <motion.div
        id="pcelica-chat"
        role="dialog"
        aria-modal="false"
        aria-labelledby="pcelica-chat-title"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'bottom right' }}
        className="flex h-[min(560px,calc(100dvh-7.5rem))] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-raise shadow-[var(--shadow-deep)] sm:w-[380px]"
      >
        {/* Zaglavlje */}
        <div className="flex items-center gap-3 border-b border-line bg-honey-tint px-4 py-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-honey text-white">
            <BeeIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="pcelica-chat-title" className="font-display text-md font-semibold leading-tight text-ink">
              Pčelica
            </h2>
            <p className="text-2xs text-ink-mute">Pitajte nas o medu</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zatvori chat"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-raise hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* Poruke — jedini deo koji skroluje */}
        <div
          ref={listRef}
          aria-live="polite"
          aria-relevant="additions"
          className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
        >
          <ChatMessage role="model" text={greeting} />
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} text={m.text} />
          ))}
          {loading && <TypingIndicator />}
          {error && !loading && (
            <ChatMessage role="model" text={error} isError>
              <button
                type="button"
                onClick={onRetry}
                className="mt-2 flex items-center gap-1.5 rounded-full bg-raise px-3 py-1.5 text-2xs font-semibold text-red-800 ring-1 ring-red-200 transition-colors hover:bg-red-100"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
                Pokušaj ponovo
              </button>
            </ChatMessage>
          )}
          {messages.length === 0 && !loading && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSend(s)}
                  className="rounded-full border border-honey/40 bg-raise px-3 py-1.5 text-2xs font-medium text-honey-deep transition-colors duration-200 hover:border-honey hover:bg-honey-tint"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Unos */}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (canSend) onSend(input);
          }}
          className="flex items-end gap-2 border-t border-line bg-raise p-3"
        >
          <label htmlFor="pcelica-input" className="sr-only">
            Vaša poruka
          </label>
          <textarea
            ref={inputRef}
            id="pcelica-input"
            rows={1}
            value={input}
            maxLength={MAX_INPUT_LENGTH}
            onChange={e => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Napišite pitanje…"
            className="max-h-28 min-h-11 flex-1 resize-none rounded-[var(--radius-field)] border border-line bg-sunken/50 px-3 py-2.5 text-xs text-ink placeholder:text-ink-mute focus:border-honey focus:outline-none focus:ring-2 focus:ring-honey/30 [field-sizing:content]"
          />
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Pošalji poruku"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-honey-deep text-white transition-[background-color,opacity] duration-200 hover:bg-honey disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4.5 w-4.5" strokeWidth={2} />
          </button>
        </form>
      </motion.div>
    );
  },
);
ChatPanel.displayName = 'ChatPanel';
