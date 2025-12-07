// types/index.tsx

type UserStatus = "online" | "offline" | "away";
export interface User {
  _id: string;
  name: string;
  email: string;
  userID: string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;        // URL ou chemin vers l’avatar de l’utilisateur
  status?: UserStatus;        // par exemple : "online", "offline", "busy"
  role?: string;          // par exemple : "admin", "student", "teacher"
  department?: string;    // par exemple : "Informatics", "Mathematics"
}



export interface Attachment {
  fileName: string;
  fileURL: string;
}

export interface Message {
  _id: string;
  sender: User | string;
  receiver: User;
  content: string;
  isRead: boolean;
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Discussion {
  _id: string;
  participants: User[];
  messages: Message[];
  updatedAt: string;
  isGroup: boolean;
  groupName?: string;
  type: 'channel' | 'direct' | 'group';
  name?: string;
  isStarred: boolean;
  unreadCount: number;
  createdAt: string;
}

export interface Notification {
  _id: string;
  userId: User;
  from?: User;
  content: string;
  type: "message" | "invitation" | "system" | "other";
  discussionId?: Discussion;
  url?: string;
  metadata?: any;
  isRead: boolean;
  createdAt: string;
}
