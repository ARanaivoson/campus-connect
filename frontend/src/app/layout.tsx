// app/layout.tsx
'use client';

import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import { User } from '@/types';
import '../styles/globals.css'; // Assure-toi que ce fichier existe

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user: User = {
    _id: 'abc123',
    userID: '123',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'student',
    status: 'online',
    avatar: '/avatars/jean.png',
    department: 'Informatique',
  };

  const handleLogout = () => {
    console.log('Déconnexion');
    // logiques de déconnexion ici
  };

  return (
    <html lang="fr">
      <body>
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          currentUser={user}
          onLogout={handleLogout}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
