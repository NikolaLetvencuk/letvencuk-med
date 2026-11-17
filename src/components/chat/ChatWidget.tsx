import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChatLauncher } from './ChatLauncher';
import { ChatPanel } from './ChatPanel';
import { ChatError, sendChat, type ChatMessage } from './chatApi';

const GREETING = 'Zdravo! Ja sam Pčelica 🐝 Pitajte me o našim vrstama meda, cenama ili kako da naručite.';

interface ChatWidgetProps {
  /** Sakriva ceo widget (npr. dok je otvoren modal proizvoda ili vesti). */
  hidden?: boolean;
}

/**
 * Plutajući chatbot "Pčelica". Fiksni overlay u donjem desnom uglu — ne utiče na
 * raspored ni skrolovanje stranice. Pozdravna poruka je samo prikaz i ne šalje se serveru.
 */
export const ChatWidget = ({ hidden = false }: ChatWidgetProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const request = useCallback(async (history: ChatMessage[]) => {
    setLoading(true);
    setError(null);
    try {
      const reply = await sendChat(history);
      setMessages([...history, { role: 'model', text: reply }]);
    } catch (err) {
      setError(err instanceof ChatError ? err.message : 'Došlo je do greške. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  }, []);

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      const history: ChatMessage[] = [...messages, { role: 'user', text: trimmed }];
      setMessages(history);
      setInput('');
      void request(history);
    },
    [messages, loading, request],
  );

  const retry = useCallback(() => {
    if (messages.length && messages[messages.length - 1].role === 'user') void request(messages);
  }, [messages, request]);

  // Fokus na polje za unos kad se panel otvori.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc zatvara panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-[55] flex flex-col items-end gap-3 sm:right-5"
    >
      <AnimatePresence>
        {open && (
          <ChatPanel
            ref={inputRef}
            greeting={GREETING}
            messages={messages}
            loading={loading}
            error={error}
            input={input}
            onInputChange={setInput}
            onSend={send}
            onRetry={retry}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <ChatLauncher open={open} onToggle={() => setOpen(o => !o)} />
    </div>
  );
};
