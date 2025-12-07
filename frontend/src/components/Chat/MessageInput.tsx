'use client';

import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center gap-2"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Écrire un message..."
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors flex items-center justify-center"
        aria-label="Envoyer"
      >
        <SendHorizonal className="w-5 h-5" />
      </button>
    </form>
  );
}
