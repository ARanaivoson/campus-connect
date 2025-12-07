import React from 'react';
import Avatar from '../../components/ui/Avatar';
import { ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
  userName: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away';
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  userName,
  avatar,
  status = 'offline',
  onBack,
}) => {
  return (
    <div className="chat-header sticky top-0 z-20 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-md px-4 py-3">
      <div className="flex items-center gap-3 w-full">
        {onBack && (
          <button
            onClick={onBack}
            className="back-button p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition lg:hidden"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}

        <Avatar
          src={avatar}
          alt={`${userName}'s avatar`}
          size="md"
          status={status}
        />

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{userName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{status}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
