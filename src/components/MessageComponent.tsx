import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from './FloatingChatbot';

interface MessageComponentProps {
  message: Message;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs ${
          message.isUser 
            ? 'bg-gradient-to-br from-green-400 to-blue-500' 
            : 'bg-gradient-to-br from-purple-500 to-blue-600'
        }`}>
          {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message bubble */}
        <div className="flex flex-col">
          <div className={`rounded-2xl px-4 py-2 shadow-sm ${
            message.isUser
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
              : 'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
          <span className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
