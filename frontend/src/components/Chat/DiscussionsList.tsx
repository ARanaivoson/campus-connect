import React from 'react';
import { Discussion, User } from '@/types';

interface Props {
  discussions: Discussion[];
  currentUser: User;
  currentDiscussionId: string | null;
  onSelectDiscussion: (discussion: Discussion) => void;
}

const DiscussionsList: React.FC<Props> = ({
  discussions,
  currentUser,
  currentDiscussionId,
  onSelectDiscussion,
}) => {
  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
      {discussions.map((d) => {
        const otherUser = d.participants.find((p) => p._id !== currentUser._id);
        const lastMessage = d.messages?.length ? d.messages[d.messages.length - 1] : null;

        const senderName = lastMessage
          ? (typeof lastMessage.sender === 'string'
              ? lastMessage.sender
              : lastMessage.sender.name)
          : null;

        const isActive = currentDiscussionId === d._id;

        return (
          <li
            key={d._id}
            onClick={() => onSelectDiscussion(d)}
            className={`discussion-item group p-4 cursor-pointer transition-colors duration-200 rounded-lg mx-2 my-1 ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-900/30 font-semibold border border-blue-300 dark:border-blue-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <div className="text-gray-900 dark:text-white font-medium truncate">
              {d.isGroup ? d.groupName : otherUser?.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {lastMessage
                ? `${senderName}: ${lastMessage.content}`
                : 'Pas de messages'}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DiscussionsList;
