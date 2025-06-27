import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-16 h-16 rounded-full shadow-lg transition-all duration-300 ease-in-out
        flex items-center justify-center text-white font-semibold text-lg
        hover:scale-110 hover:shadow-xl active:scale-95
        bg-gradient-to-br from-blue-500 to-purple-600
        ${isOpen ? 'rotate-0' : 'hover:rotate-12'}
      `}
    >
      {isOpen ? (
        <X className="w-6 h-6 transition-transform duration-200" />
      ) : (
        <MessageCircle className="w-6 h-6 transition-transform duration-200" />
      )}
    </button>
  );
};

export default ChatBubble;
