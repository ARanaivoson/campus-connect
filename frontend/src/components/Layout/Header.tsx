'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Settings, LogOut, Menu, X } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { User } from '@/types';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  currentUser: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarOpen, currentUser, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);




  // Initialisation du thème à la charge de la page
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle thème clair/sombre et stocker la préférence
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const avatarSrc = currentUser.avatar ?? '/default-avatar.png';
  const notificationCount = 3;

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-neutral-200 dark:border-gray-700 py-3 px-4 sm:px-6 flex items-center justify-between shadow-subtle">
      {/* Bouton sidebar */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Recherche (simple placeholder ici) */}
      <div className="flex-1 mx-4 max-w-md">
        <input
          type="search"
          placeholder="Rechercher..."
          className="w-full rounded-md border border-neutral-300 dark:border-gray-600 bg-neutral-100 dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Toggle thème clair/sombre */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Passer au thème clair' : 'Passer au thème sombre'}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-9h1M4.34 12h1m14.14 5.66l.7.7M6.46 6.46l.7.7m12.02 12.02l.7-.7M6.46 17.54l.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Notifications"
          >
            <Bell size={24} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error-500 rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-modal border border-neutral-200 dark:border-gray-700 z-30 animate-fade-in">
              <div className="p-3 border-b border-neutral-200 dark:border-gray-700 font-semibold text-neutral-800 dark:text-gray-100">
                Notifications
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {/* Exemple de notification */}
                <li className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-gray-700 cursor-pointer">
                  Nouvelle demande d'ami
                </li>
                <li className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-gray-700 cursor-pointer">
                  Message reçu de Alice
                </li>
                <li className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-gray-700 cursor-pointer">
                  Mise à jour du système disponible
                </li>
              </ul>
              <div className="p-2 text-center text-sm text-blue-600 hover:underline cursor-pointer">
                Voir toutes les notifications
              </div>
            </div>
          )}
        </div>

        {/* Menu utilisateur */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="User menu"
          >
            <Avatar status={currentUser.status} src={avatarSrc} alt={currentUser.name} size="sm" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-modal border border-neutral-200 dark:border-gray-700 z-30 animate-fade-in">
              <div className="p-3 border-b border-neutral-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Avatar status={currentUser.status} src={avatarSrc} alt={currentUser.name} size="sm" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-800 dark:text-gray-100">{currentUser.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-gray-400">{currentUser.email}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge
                    variant="primary"
                    size="sm"
                    title={
                      currentUser.role === 'admin'
                        ? 'Administrator'
                        : currentUser.role === 'faculty'
                        ? 'Faculty'
                        : 'Student'
                    }
                  >
                    {currentUser.role === 'admin'
                      ? 'Administrator'
                      : currentUser.role === 'faculty'
                      ? 'Faculty'
                      : 'Student'}
                  </Badge>
                  {currentUser.department && (
                    <span className="text-xs text-neutral-500 dark:text-gray-400">{currentUser.department}</span>
                  )}
                </div>
              </div>

              <div className="py-1">
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-gray-700"
                  onClick={() => alert('Settings clicked!')}
                >
                  <Settings size={16} className="mr-2" />
                  Paramètres
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-gray-700"
                  onClick={onLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
