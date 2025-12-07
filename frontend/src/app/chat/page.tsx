'use client';

import ChatHeader from '@/components/Chat/ChatHeader';
import ChatRoom from '@/components/Chat/ChatRoom';
import DiscussionsList from '@/components/Chat/DiscussionsList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Discussion, User } from '@/types';

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [currentDiscussion, setCurrentDiscussion] = useState<Discussion | null>(null);
  const router = useRouter();

  // Vérifie l'utilisateur connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(() => router.push('/login'));
  }, [router]);

  // Charge les discussions
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setDiscussions);
  }, []);

  const handleSelectDiscussion = (discussion: Discussion) => {
    setCurrentDiscussion(discussion);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto shadow">
        {user && (
          <ChatHeader
            userName={user.name}
            avatar={user.avatar || '../public/image/avatar.jpg'}
            status={user.status || 'offline'}
            onBack={toggleSidebar}
          />
        )}

        {user && (
          <DiscussionsList
            discussions={discussions}
            currentUser={user}
            currentDiscussionId={currentDiscussion?._id || null}
            onSelectDiscussion={handleSelectDiscussion}
          />
        )}
      </aside>

      {/* Zone principale de chat */}
      <main className="flex-1 flex flex-col">
        {currentDiscussion && user ? (
          <ChatRoom
            discussion={currentDiscussion}
            currentUser={user}
            selectedUser={user}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Sélectionnez une discussion pour commencer à chatter.
          </div>
        )}
      </main>

    </div>
    
  );
}
