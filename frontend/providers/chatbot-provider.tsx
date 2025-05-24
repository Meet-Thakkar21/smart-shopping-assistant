"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

interface ChatbotContextType {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  sendMessage: (message: string) => void;
  toggleChatbot: () => void;
  clearMessages: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your ShopSmart AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Hi there! I'm your ShopSmart AI assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const currentMessages = [...messages, userMessage];

      const formattedMessages = currentMessages.map((msg) => ({
        sender: msg.isBot ? 'assistant' : 'user',
        content: msg.content,
      }));

      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: formattedMessages }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again later.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        isTyping,
        sendMessage,
        toggleChatbot,
        clearMessages,
      }}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
