import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { track } from '@vercel/analytics';
import { ChatLauncher } from './ChatLauncher';
import { ChatPanel } from './ChatPanel';
import { ChatError, streamChat, type ChatMessage } from './chatApi';
import { loadMessages, saveMessages } from './chatStorage';

const GREETING = 'Zdravo! Ja sam Pčelica 🐝 Pitajte me o našim vrstama meda, cenama ili kako da naručite.';

interface ChatWidgetProps {
  /** Sakriva ceo widget (npr. dok je otvoren modal proizvoda ili vesti). Stanje razgovora ostaje. */
  hidden?: boolean;
}

/**
 * Plutajući chatbot "Pčelica". Fiksni overlay u donjem desnom uglu — ne utiče na
 * raspored ni skrolovanje stranice. Pozdravna poruka je samo prikaz i ne šalje se serveru.
 */
export const ChatWidget = ({ hidden = false }: ChatWidgetProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState('');
  /** Čeka se odgovor (od slanja do kraja streama). */
  const [busy, setBusy] = useState(false);
  /** Tekst bot odgovora koji upravo stiže (null = ništa ne stiže). */
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => saveMessages(messages), [messages]);

  const request = useCallback(async (history: ChatMessage[]) => {
    setBusy(true);
    setError(null);
    setStreamingText(null);
    try {
      const reply = await streamChat(history, setStreamingText);
      setMessages([...history, { role: 'model', text: reply }]);
    } catch (err) {
      setError(err instanceof ChatError ? err.message : 'Došlo je do greške. Pokušajte ponovo.');
    } finally {
      setStreamingText(null);
      setBusy(false);
    }
  }, []);

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;
      const history: ChatMessage[] = [...messages, { role: 'user', text: trimmed }];
      setMessages(history);
      setInput('');
      track('chat_message_sent');
      void request(history);
    },
    [messages, busy, request],
  );

  const retry = useCallback(() => {
    if (messages.length && messages[messages.length - 1].role === 'user') void request(messages);
  }, [messages, request]);

  const reset = useCallback(() => {
    if (busy) return;
    setMessages([]);
    setError(null);
    setInput('');
    inputRef.current?.focus();
  }, [busy]);

  const toggle = useCallback(() => {
    setOpen(o => {
      if (!o) track('chat_opened');
      return !o;
    });
  }, []);

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
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-[55] flex flex-col items-end gap-3 sm:right-5">
      <AnimatePresence>
        {open && (
          <ChatPanel
            ref={inputRef}
            greeting={GREETING}
            messages={messages}
            busy={busy}
            streamingText={streamingText}
            error={error}
            input={input}
            onInputChange={setInput}
            onSend={send}
            onRetry={retry}
            onReset={reset}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <ChatLauncher open={open} onToggle={toggle} />
    </div>
  );
};
