import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ChatWindow from '../components/ChatWindow.tsx';
import ChatBubble from '../components/Chatbubble.tsx';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response - Replace this with your AI API call
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "I understand your question. Let me help you with that!",
      "That's a great question! Here's what I think...",
      "I'd be happy to assist you with that. Let me provide some guidance.",
      "Based on what you've asked, here's my recommendation...",
      "Thanks for reaching out! I can definitely help you with this.",
      "I see what you're looking for. Here's some helpful information...",
    ];
    
    if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
      return "Hello! Nice to meet you. What can I help you with today?";
    }
    
    if (userInput.toLowerCase().includes('help')) {
      return "I'm here to help! You can ask me about anything - from general questions to specific assistance. What would you like to know?";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <ChatWindow
          messages={messages}
          inputText={inputText}
          setInputText={setInputText}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
          isTyping={isTyping}
          onClose={() => setIsOpen(false)}
        />
      )}
      
      <ChatBubble isOpen={isOpen} onClick={toggleChat} />
    </div>
  );
};

export default FloatingChatbot;
