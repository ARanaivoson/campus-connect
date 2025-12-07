'use client';

import { Message, User } from '@/types';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
}

export default function MessageList({ messages, currentUser }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
      {messages.map((msg) => {
        const isCurrentUser = msg.sender === currentUser._id;

        return (
          <div
            key={msg._id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md break-words text-sm sm:text-base
                ${isCurrentUser
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                }`}
            >
              <div>{msg.content}</div>
              <div
                className={`mt-1 text-[10px] sm:text-xs text-right opacity-70 ${
                  isCurrentUser
                    ? 'text-blue-200'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {/* Remplace cette ligne si tu veux afficher l’heure */}
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
