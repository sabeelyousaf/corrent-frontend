import React, { useEffect, useRef } from 'react';
import { Send, Bot } from 'lucide-react';
import { Message } from '../components/FloatingChatbot.tsx';
import MessageComponent from '../components/MessageComponent.tsx';
import TypingIndicator from '../components/TypingIndicators.tsx';

interface ChatWindowProps {
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  inputText,
  setInputText,
  sendMessage,
  handleKeyPress,
  isTyping,
  onClose,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-scale-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl flex items-center">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">AI Assistant</h3>
          <p className="text-xs opacity-90">Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            style={{ minHeight: '36px', maxHeight: '100px' }}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
