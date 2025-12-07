'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { Message, User, Discussion } from '@/types';

interface ChatRoomProps {
  discussion: Discussion;
  currentUser: User;
  selectedUser: User;
}

function SkeletonMessage() {
  return (
    <div className="animate-pulse flex space-x-4 p-2">
      <div className="rounded-full bg-neutral-300 h-10 w-10"></div>
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-neutral-300 rounded w-3/4"></div>
        <div className="space-x-2">
          <div className="h-4 bg-neutral-300 rounded w-1/4 inline-block"></div>
          <div className="h-4 bg-neutral-300 rounded w-1/3 inline-block"></div>
        </div>
      </div>
    </div>
  );
}

export default function ChatRoom({ currentUser, selectedUser, discussion }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${selectedUser._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        setMessages(data);
        setLoading(false);
        scrollToBottom();
      } catch (error) {
        console.error('Erreur lors du chargement des messages', error);
        setLoading(false);
      }
    };

    if (selectedUser) fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser) return;

    const typingTimeout = setTimeout(() => setIsTyping(true), 2000);
    const stopTypingTimeout = setTimeout(() => setIsTyping(false), 5000);

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(stopTypingTimeout);
    };
  }, [messages, selectedUser]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const newMessage = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      content,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newMessage),
      });

      const saved = await res.json();
      setMessages((prev) => [...prev, saved]);
      scrollToBottom();
    } catch (err) {
      console.error("Erreur d'envoi", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-primary-50">
      <ChatHeader
        userName={selectedUser.name || 'Utilisateur'}
        avatar="images/avatar.jpg"
        status={selectedUser.status || 'offline'}
        onBack={() => {}}
      />

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading ? (
          <>
            <SkeletonMessage />
            <SkeletonMessage />
            <SkeletonMessage />
          </>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isCurrentUser = msg.sender === currentUser._id;

                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`mb-2 flex ${isCurrentUser ? 'justify-end' : 'justify-start'} message-appear`}
                  >
                    <div
                      className={`card max-w-[70%] text-sm ${
                        isCurrentUser
                          ? 'bg-primary-600 text-white rounded-br-none'
                          : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isTyping && (
              <div className="mb-2 flex justify-start">
                <div className="card max-w-[70%] flex items-center space-x-2">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="italic text-xs text-neutral-500">En train d'écrire...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t border-neutral-200 bg-white px-4 py-3">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
